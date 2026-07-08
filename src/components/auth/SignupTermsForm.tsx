"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { SignupStepIndicator } from "@/components/auth/SignupStepIndicator";
import {
  SIGNUP_TERM_CONFIGS,
  SIGNUP_TERM_SLUG_BY_AGREEMENT_KEY,
  type SignupTermAgreementKey as SignupTermDetailKey,
} from "@/constants/signup-terms";
import { ApiError } from "@/lib/api/client";
import { agreeTerms, getTerms } from "@/lib/api/member";
import {
  getSignupTermAgreements,
  setAllSignupTermAgreements,
  setSignupTermAgreements,
  updateSignupTermAgreement,
  type SignupTermAgreementKey,
  type SignupTermAgreements,
} from "@/lib/signup-terms-session";
import { getSignupSession, updateSignupSession } from "@/lib/signup-session";
import type { TermsResponse } from "@/types/member";

const REQUIRED_KEYS: SignupTermAgreementKey[] = [
  "termsOfService",
  "privacy",
  "cardTerms",
];

const ALL_KEYS: SignupTermAgreementKey[] = [
  "termsOfService",
  "privacy",
  "cardTerms",
  "marketing",
  "emailAds",
  "smsAds",
];

type AgreementCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  id: string;
};

function AgreementCheckbox({
  checked,
  onChange,
  label,
  id,
}: AgreementCheckboxProps) {
  return (
    <div className="flex items-center gap-3 py-3">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-5 shrink-0 cursor-pointer appearance-none rounded border-2 border-[#00704A] bg-white checked:border-[#00704A] checked:bg-[#00704A] checked:bg-[length:12px_12px] checked:bg-center checked:bg-no-repeat checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2012%2012%27%20fill=%27none%27%3E%3Cpath%20d=%27M2%206l3%203%205-5%27%20stroke=%27white%27%20stroke-width=%271.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27/%3E%3C/svg%3E')]"
      />
      <span className="min-w-0 flex-1 text-sm leading-5 text-[#222]">
        {label}
      </span>
    </div>
  );
}

type AgreementRowProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  id: string;
  onDetailClick: () => void;
};

function AgreementRow({
  checked,
  onChange,
  label,
  id,
  onDetailClick,
}: AgreementRowProps) {
  return (
    <div className="flex items-center gap-3 py-3">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-5 shrink-0 cursor-pointer appearance-none rounded border-2 border-[#00704A] bg-white checked:border-[#00704A] checked:bg-[#00704A] checked:bg-[length:12px_12px] checked:bg-center checked:bg-no-repeat checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2012%2012%27%20fill=%27none%27%3E%3Cpath%20d=%27M2%206l3%203%205-5%27%20stroke=%27white%27%20stroke-width=%271.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27/%3E%3C/svg%3E')]"
      />
      <span className="min-w-0 flex-1 text-sm leading-5 text-[#222]">{label}</span>
      <button
        type="button"
        onClick={onDetailClick}
        aria-label={`${label} 상세 보기`}
        className="shrink-0 p-1 text-[#bbb] transition-colors hover:text-[#888]"
      >
        <ChevronRight className="size-4" aria-hidden />
      </button>
    </div>
  );
}

export function SignupTermsForm() {
  const router = useRouter();
  const [agreements, setAgreements] = useState<SignupTermAgreements>(
    getSignupTermAgreements,
  );
  const [termsList, setTermsList] = useState<TermsResponse[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setAgreements(getSignupTermAgreements());
  }, []);

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

  function updateAgreement(key: SignupTermAgreementKey, checked: boolean) {
    const next = updateSignupTermAgreement(key, checked);
    setAgreements(next);
  }

  function handleCheckAll(checked: boolean) {
    const next = setAllSignupTermAgreements(checked);
    setAgreements(next);
  }

  function handleDetailClick(agreementKey: SignupTermDetailKey) {
    setSignupTermAgreements(agreements);
    router.push(`/signup/terms/${SIGNUP_TERM_SLUG_BY_AGREEMENT_KEY[agreementKey]}`);
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

    const mandatoryKeys: SignupTermAgreementKey[] = [
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
          {SIGNUP_TERM_CONFIGS.map((item) => (
            <div key={item.agreementKey} className="border-b border-[#eee]">
              <AgreementRow
                id={`agree-${item.agreementKey}`}
                checked={agreements[item.agreementKey]}
                onChange={(checked) => updateAgreement(item.agreementKey, checked)}
                label={item.listLabel}
                onDetailClick={() => handleDetailClick(item.agreementKey)}
              />

              {item.agreementKey === "marketing" && (
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
