"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { SignupStepIndicator } from "@/components/auth/SignupStepIndicator";
import { ApiError } from "@/lib/api/client";
import { agreeTerms, getTerms } from "@/lib/api/member";
import { getSignupSession, updateSignupSession } from "@/lib/signup-session";
import type { TermsResponse } from "@/types/member";

type AgreementKey =
  | "termsOfService"
  | "privacy"
  | "cardTerms"
  | "marketing"
  | "emailAds"
  | "smsAds";

type Agreements = Record<AgreementKey, boolean>;

const REQUIRED_KEYS: AgreementKey[] = [
  "termsOfService",
  "privacy",
  "cardTerms",
];

const ALL_KEYS: AgreementKey[] = [
  "termsOfService",
  "privacy",
  "cardTerms",
  "marketing",
  "emailAds",
  "smsAds",
];

const TERM_ITEMS = [
  {
    key: "termsOfService" as const,
    label: "[필수] 이용약관 동의",
    required: true,
  },
  {
    key: "privacy" as const,
    label: "[필수] 개인정보 수집 및 이용 동의",
    required: true,
  },
  {
    key: "cardTerms" as const,
    label: "[필수] 스타벅스 카드 이용약관",
    required: true,
  },
  {
    key: "marketing" as const,
    label: "[선택] 마케팅 활용 수집 이용 동의",
    required: false,
  },
] as const;

const INITIAL_AGREEMENTS: Agreements = {
  termsOfService: false,
  privacy: false,
  cardTerms: false,
  marketing: false,
  emailAds: false,
  smsAds: false,
};

type AgreementCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  id: string;
  showArrow?: boolean;
};

function AgreementCheckbox({
  checked,
  onChange,
  label,
  id,
  showArrow = false,
}: AgreementCheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-3 py-3"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-5 shrink-0 appearance-none rounded border-2 border-[#00704A] bg-white checked:border-[#00704A] checked:bg-[#00704A] checked:bg-[length:12px_12px] checked:bg-center checked:bg-no-repeat checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2012%2012%27%20fill=%27none%27%3E%3Cpath%20d=%27M2%206l3%203%205-5%27%20stroke=%27white%27%20stroke-width=%271.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27/%3E%3C/svg%3E')]"
      />
      <span className="min-w-0 flex-1 text-sm leading-5 text-[#222]">
        {label}
      </span>
      {showArrow && (
        <ChevronRight className="size-4 shrink-0 text-[#bbb]" aria-hidden />
      )}
    </label>
  );
}

export function SignupTermsForm() {
  const router = useRouter();
  const [agreements, setAgreements] = useState<Agreements>(INITIAL_AGREEMENTS);
  const [termsList, setTermsList] = useState<TermsResponse[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getTerms()
      .then(setTermsList)
      .catch((error) => {
        setSubmitError(
          error instanceof ApiError
            ? error.message
            : "약관 정보를 불러오지 못했습니다.",
        );
      });
  }, []);

  const mandatoryTerms = useMemo(
    () => termsList.filter((term) => term.mandatory),
    [termsList],
  );

  const isAllChecked = useMemo(
    () => ALL_KEYS.every((key) => agreements[key]),
    [agreements],
  );

  const isRequiredChecked = useMemo(
    () => REQUIRED_KEYS.every((key) => agreements[key]),
    [agreements],
  );

  function updateAgreement(key: AgreementKey, checked: boolean) {
    setAgreements((prev) => {
      const next = { ...prev, [key]: checked };

      if (key === "marketing") {
        next.emailAds = checked;
        next.smsAds = checked;
      }

      if (key === "emailAds" || key === "smsAds") {
        next.marketing = next.emailAds && next.smsAds;
      }

      return next;
    });
  }

  function handleCheckAll(checked: boolean) {
    setAgreements({
      termsOfService: checked,
      privacy: checked,
      cardTerms: checked,
      marketing: checked,
      emailAds: checked,
      smsAds: checked,
    });
  }

  async function handleNext() {
    const session = getSignupSession();

    if (!session.verificationToken) {
      setSubmitError("본인인증을 먼저 완료해 주세요.");
      return;
    }

    if (termsList.length === 0) {
      setSubmitError("약관 정보를 불러오는 중입니다.");
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    const mandatoryKeys: AgreementKey[] = [
      "termsOfService",
      "privacy",
      "cardTerms",
    ];

    const agreementPayload = termsList.map((term) => {
      if (term.mandatory) {
        const index = mandatoryTerms.findIndex((item) => item.id === term.id);
        return {
          termsId: term.id,
          agreed: agreements[mandatoryKeys[index] ?? "termsOfService"],
        };
      }

      return {
        termsId: term.id,
        agreed: agreements.marketing,
      };
    });

    try {
      const result = await agreeTerms(
        session.verificationToken,
        agreementPayload,
      );

      updateSignupSession({
        verificationToken: result.verificationToken,
        emailAds: agreements.emailAds,
        smsAds: agreements.smsAds,
      });
      router.push("/signup/info");
    } catch (error) {
      setSubmitError(
        error instanceof ApiError
          ? error.message
          : "약관 동의 처리에 실패했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-[460px] flex-col bg-white px-4 py-16">
      <SignupStepIndicator currentStep={2} />

      <div className="mt-10 flex items-center gap-4">
        <Image
          src="/images/logo.png"
          alt="Starbucks"
          width={56}
          height={56}
          priority
          className="shrink-0"
        />
        <h1 className="text-[22px] font-bold leading-8 tracking-tight text-[#222]">
          고객님
          <br />
          반갑습니다!
        </h1>
      </div>

      <div className="mt-8 border-t border-[#eee]">
        <AgreementCheckbox
          id="agree-all"
          checked={isAllChecked}
          onChange={handleCheckAll}
          label="약관 전체동의"
        />

        <div className="border-t border-[#eee]">
          {TERM_ITEMS.map((item) => (
            <div key={item.key} className="border-b border-[#eee]">
              <AgreementCheckbox
                id={`agree-${item.key}`}
                checked={agreements[item.key]}
                onChange={(checked) => updateAgreement(item.key, checked)}
                label={item.label}
                showArrow
              />

              {item.key === "marketing" && (
                <div className="pb-4 pl-8">
                  <p className="text-sm text-[#888]">광고성 정보 수신 팝업</p>
                  <div className="mt-3 flex items-center gap-8">
                    <AgreementCheckbox
                      id="agree-email-ads"
                      checked={agreements.emailAds}
                      onChange={(checked) => updateAgreement("emailAds", checked)}
                      label="E-mail"
                    />
                    <AgreementCheckbox
                      id="agree-sms-ads"
                      checked={agreements.smsAds}
                      onChange={(checked) => updateAgreement("smsAds", checked)}
                      label="SMS"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleNext}
        disabled={!isRequiredChecked || isSubmitting || termsList.length === 0}
        className="mt-16 w-full rounded-full py-4 text-base font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:bg-[#ddd] enabled:bg-[#00704A] enabled:hover:opacity-90"
      >
        {isSubmitting ? "처리 중..." : "다음"}
      </button>

      {submitError && (
        <p className="mt-4 text-center text-sm text-red-500" role="alert">
          {submitError}
        </p>
      )}
    </div>
  );
}
