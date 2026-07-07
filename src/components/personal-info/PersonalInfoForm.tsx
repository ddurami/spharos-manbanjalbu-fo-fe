"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { PersonalInfoSaveSuccessModal } from "@/components/personal-info/PersonalInfoSaveSuccessModal";
import { ApiError } from "@/lib/api/client";
import { resetPassword } from "@/lib/api/member";
import {
  getPersonalInfo,
  updateMarketingConsent,
} from "@/lib/api/profile";
import {
  maskEmail,
  maskPhone,
  parseBirthDate,
} from "@/lib/personal-info/format";
import {
  clearPersonalInfoDraft,
  getPersonalInfoDraft,
  updatePersonalInfoDraft,
} from "@/lib/personal-info-session";
import type { MemberPersonalInfoResponse } from "@/types/profile";
import { useAuth } from "@/contexts/auth-context";

type MarketingState = {
  marketingUtilizationAgreed: boolean;
  emailAgreed: boolean;
  smsAgreed: boolean;
};

function InfoRow({
  label,
  value,
  action,
}: {
  label: string;
  value: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-sb-border py-5">
      <div className="min-w-0 flex-1">
        <p className="text-sm text-sb-text-muted">{label}</p>
        <div className="mt-2 text-base text-foreground">{value}</div>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

function MarketingCheckbox({
  id,
  checked,
  onChange,
  label,
  disabled = false,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-3 py-2 ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      }`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        className="size-5 shrink-0 appearance-none rounded border-2 border-[#00704A] bg-white checked:border-[#00704A] checked:bg-[#00704A] checked:bg-[length:12px_12px] checked:bg-center checked:bg-no-repeat checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2012%2012%27%20fill=%27none%27%3E%3Cpath%20d=%27M2%206l3%203%205-5%27%20stroke=%27white%27%20stroke-width=%271.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27/%3E%3C/svg%3E')]"
      />
      <span className="text-sm text-[#222]">{label}</span>
    </label>
  );
}

export function PersonalInfoForm() {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, logout } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const [profile, setProfile] = useState<MemberPersonalInfoResponse | null>(
    null,
  );
  const [marketing, setMarketing] = useState<MarketingState>({
    marketingUtilizationAgreed: false,
    emailAgreed: false,
    smsAgreed: false,
  });
  const [originalMarketing, setOriginalMarketing] =
    useState<MarketingState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSaveSuccessModal, setShowSaveSuccessModal] = useState(false);
  const [passwordDraft, setPasswordDraft] = useState(getPersonalInfoDraft());

  useEffect(() => {
    setPasswordDraft(getPersonalInfoDraft());
  }, [pathname]);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady && !isLoggedIn) {
      router.replace("/login");
    }
  }, [isReady, isLoggedIn, router]);

  useEffect(() => {
    if (!isReady || !isLoggedIn) {
      return;
    }

    let cancelled = false;

    async function loadProfile() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const data = await getPersonalInfo();
        if (cancelled) {
          return;
        }

        const draftState = getPersonalInfoDraft();
        const nextMarketing = {
          marketingUtilizationAgreed:
            draftState.marketingUtilizationAgreed ??
            data.marketingConsent.marketingUtilizationAgreed,
          emailAgreed:
            draftState.emailAgreed ?? data.marketingConsent.emailAgreed,
          smsAgreed: draftState.smsAgreed ?? data.marketingConsent.smsAgreed,
        };

        setProfile(data);
        setMarketing(nextMarketing);
        setOriginalMarketing({
          marketingUtilizationAgreed:
            data.marketingConsent.marketingUtilizationAgreed,
          emailAgreed: data.marketingConsent.emailAgreed,
          smsAgreed: data.marketingConsent.smsAgreed,
        });
      } catch (error) {
        if (!cancelled) {
          if (error instanceof ApiError && error.status === 401) {
            logout();
            router.replace("/login");
            return;
          }

          setErrorMessage(
            error instanceof ApiError
              ? error.message
              : "개인정보를 불러오지 못했습니다.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadProfile();

    return () => {
      cancelled = true;
    };
  }, [isReady, isLoggedIn, logout, router]);

  const birthDate = useMemo(
    () => (profile ? parseBirthDate(profile.birthDate) : null),
    [profile],
  );

  const hasMarketingChanges =
    originalMarketing != null &&
    (marketing.marketingUtilizationAgreed !==
      originalMarketing.marketingUtilizationAgreed ||
      marketing.emailAgreed !== originalMarketing.emailAgreed ||
      marketing.smsAgreed !== originalMarketing.smsAgreed);

  const hasPendingPassword = Boolean(passwordDraft.hasPasswordDraft);
  const hasPendingChanges = hasMarketingChanges || hasPendingPassword;

  function updateMarketing(next: Partial<MarketingState>) {
    setMarketing((prev) => {
      const updated = { ...prev, ...next };

      if (!updated.marketingUtilizationAgreed) {
        updated.emailAgreed = false;
        updated.smsAgreed = false;
      }

      updatePersonalInfoDraft({
        marketingUtilizationAgreed: updated.marketingUtilizationAgreed,
        emailAgreed: updated.emailAgreed,
        smsAgreed: updated.smsAgreed,
      });

      return updated;
    });
    setSubmitError(null);
  }

  async function handleSave() {
    if (!profile || !hasPendingChanges || isSubmitting) {
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      if (hasMarketingChanges) {
        if (
          marketing.marketingUtilizationAgreed &&
          !marketing.emailAgreed &&
          !marketing.smsAgreed
        ) {
          throw new ApiError(
            "마케팅 활용 수집·이용에 동의한 경우 E-mail 또는 SMS 중 하나 이상 선택해야 합니다.",
          );
        }

        await updateMarketingConsent({
          marketingUtilizationAgreed: marketing.marketingUtilizationAgreed,
          emailAgreed: marketing.emailAgreed,
          smsAgreed: marketing.smsAgreed,
        });
      }

      if (passwordDraft.pendingPassword && passwordDraft.passwordVerificationToken) {
        await resetPassword(
          passwordDraft.passwordVerificationToken,
          passwordDraft.pendingPassword,
        );
      }

      clearPersonalInfoDraft();
      setPasswordDraft({});
      setShowSaveSuccessModal(true);
    } catch (error) {
      setSubmitError(
        error instanceof ApiError
          ? error.message
          : "개인정보 수정에 실패했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleSaveSuccessConfirm() {
    setShowSaveSuccessModal(false);
    router.push("/mypage");
  }

  function handleWithdraw() {
    router.push("/mypage/personal-info/withdraw");
  }

  if (!isReady || !isLoggedIn) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-[640px] px-6 py-10">
        <p className="text-base text-sb-text-subtle">개인정보를 불러오는 중...</p>
      </div>
    );
  }

  if (errorMessage || !profile) {
    return (
      <div className="mx-auto w-full max-w-[640px] px-6 py-10">
        <p className="text-base text-destructive">
          {errorMessage ?? "개인정보를 불러오지 못했습니다."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto w-full max-w-[640px] px-6 py-10 lg:py-14">
      <h1 className="text-center text-2xl font-bold text-foreground">
        개인정보 관리
      </h1>

      <div className="mt-10">
        <InfoRow label="아이디" value={profile.loginId} />
        <InfoRow label="이름" value={profile.name} />
        <InfoRow
          label="생년월일"
          value={
            <div className="flex flex-wrap items-center gap-2 text-sm text-foreground">
              <span className="rounded border border-sb-border px-3 py-2">
                {birthDate?.year ? `${birthDate.year}년` : "****년"}
              </span>
              <span className="rounded border border-sb-border px-3 py-2">
                {birthDate?.month ? `${birthDate.month}월` : "월"}
              </span>
              <span className="rounded border border-sb-border px-3 py-2">
                {birthDate?.day ? `${birthDate.day}일` : "일"}
              </span>
              <span className="rounded border border-sb-border px-3 py-2">
                양력
              </span>
            </div>
          }
        />
        <InfoRow
          label="비밀번호"
          value={
            hasPendingPassword ? (
              <span className="text-[#00704A]">변경 예정</span>
            ) : (
              <span className="text-sb-text-muted">********</span>
            )
          }
          action={
            <Link
              href="/mypage/personal-info/password"
              className="inline-flex items-center gap-1 text-sm text-foreground transition-opacity hover:opacity-70"
            >
              비밀번호 변경
              <ChevronRight className="size-4" aria-hidden />
            </Link>
          }
        />
        <InfoRow
          label="휴대폰번호"
          value={maskPhone(profile.phone)}
          action={
            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm text-sb-text-muted"
            >
              SMS/MMS 수신 안내
              <ChevronDown className="size-4" aria-hidden />
            </button>
          }
        />
        <InfoRow
          label="이메일"
          value={maskEmail(profile.email)}
          action={
            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm text-sb-text-muted"
            >
              E-mail 수신 안내
              <ChevronDown className="size-4" aria-hidden />
            </button>
          }
        />
      </div>

      <div className="mt-8 border-t border-sb-border pt-6">
        <MarketingCheckbox
          id="marketing-utilization"
          checked={marketing.marketingUtilizationAgreed}
          onChange={(checked) =>
            updateMarketing({ marketingUtilizationAgreed: checked })
          }
          label="[선택] 마케팅 활용 수집 이용 동의"
        />

        <div className="mt-4 rounded-2xl border border-sb-border px-5 py-4">
          <p className="text-sm font-medium text-foreground">
            광고성 정보 수신 동의
          </p>
          <div className="mt-3 flex items-center gap-8">
            <MarketingCheckbox
              id="marketing-email"
              checked={marketing.emailAgreed}
              disabled={!marketing.marketingUtilizationAgreed}
              onChange={(checked) => updateMarketing({ emailAgreed: checked })}
              label="E-mail"
            />
            <MarketingCheckbox
              id="marketing-sms"
              checked={marketing.smsAgreed}
              disabled={!marketing.marketingUtilizationAgreed}
              onChange={(checked) => updateMarketing({ smsAgreed: checked })}
              label="SMS"
            />
          </div>
        </div>
      </div>

      {submitError && (
        <p className="mt-6 text-sm text-red-500" role="alert">
          {submitError}
        </p>
      )}

      <div className="mt-10 space-y-4">
        <button
          type="button"
          onClick={handleSave}
          disabled={!hasPendingChanges || isSubmitting}
          className="w-full rounded-full bg-[#00704A] py-4 text-base font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isSubmitting ? "저장 중..." : "개인정보 수정"}
        </button>

        <button
          type="button"
          onClick={handleWithdraw}
          className="w-full rounded-full border border-[#00704A] py-4 text-base font-medium text-[#00704A] transition-opacity hover:opacity-90"
        >
          회원탈퇴
        </button>
      </div>
      </div>

      <PersonalInfoSaveSuccessModal
        open={showSaveSuccessModal}
        onConfirm={handleSaveSuccessConfirm}
      />
    </>
  );
}
