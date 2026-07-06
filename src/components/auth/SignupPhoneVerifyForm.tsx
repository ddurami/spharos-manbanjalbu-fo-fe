"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignupStepIndicator } from "@/components/auth/SignupStepIndicator";
import { ApiError } from "@/lib/api/client";
import {
  confirmPhoneVerification,
  sendPhoneVerification,
} from "@/lib/api/member";
import { updateSignupSession } from "@/lib/signup-session";
import {
  formatVerificationTimer,
  useVerificationCountdown,
  VERIFICATION_TIMER_SECONDS,
} from "@/lib/use-verification-countdown";
import type { VerificationConfirmResponse } from "@/types/member";
import {
  formatPhoneNumber,
  getPhoneFormatError,
  isPhoneFormatValid,
  normalizePhone,
  validatePhone,
} from "@/lib/signup-validation";

const DEFAULT_RECEIVE_NUMBER = "1666-3538";

function formatReceivePhoneNumber(value: string) {
  const digits = value.replace(/\D/g, "");

  if (digits.length === 8) {
    return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  }

  return value;
}

type SignupPhoneVerifyFormProps = {
  onVerified?: (result: VerificationConfirmResponse) => Promise<void> | void;
};

export function SignupPhoneVerifyForm({
  onVerified,
}: SignupPhoneVerifyFormProps = {}) {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendCount, setSendCount] = useState(0);
  const [verificationCode, setVerificationCode] = useState("");
  const { remainingSeconds, isTimerActive } = useVerificationCountdown(
    isCodeSent ? sendCount : 0,
    VERIFICATION_TIMER_SECONDS,
  );
  const [sendGuideMessage, setSendGuideMessage] = useState<string | null>(null);
  const [receivePhoneNumber, setReceivePhoneNumber] = useState(
    DEFAULT_RECEIVE_NUMBER,
  );
  const [verifyMessage, setVerifyMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const phoneFormatError = getPhoneFormatError(phone);
  const canSendCode = isPhoneFormatValid(phone);
  const formattedReceiveNumber = formatReceivePhoneNumber(receivePhoneNumber);

  async function handleSendCode() {
    const error = validatePhone(phone);

    if (error) {
      setPhoneError(error);
      return;
    }

    setPhoneError(null);
    setVerifyMessage(null);
    setIsSending(true);

    try {
      const result = await sendPhoneVerification(normalizePhone(phone));
      const nextAuthCode = result.authCode ?? result.devCode ?? "";

      if (!nextAuthCode) {
        setPhoneError("인증코드를 받아오지 못했습니다. 잠시 후 다시 시도해 주세요.");
        return;
      }

      setVerificationCode(nextAuthCode);
      setReceivePhoneNumber(
        result.receivePhoneNumber
          ? formatReceivePhoneNumber(result.receivePhoneNumber)
          : DEFAULT_RECEIVE_NUMBER,
      );
      setSendGuideMessage(result.message?.trim() || null);
      setIsCodeSent(true);
      setSendCount((prev) => prev + 1);
    } catch (sendError) {
      setPhoneError(
        sendError instanceof ApiError
          ? sendError.message
          : "인증코드 발송에 실패했습니다.",
      );
    } finally {
      setIsSending(false);
    }
  }

  function handlePhoneChange(value: string) {
    const digits = normalizePhone(value).slice(0, 11);
    setPhone(digits);

    if (phoneError) {
      setPhoneError(null);
    }

    if (verifyMessage) {
      setVerifyMessage(null);
    }
  }

  async function handleNext() {
    if (!isCodeSent || !verificationCode) {
      setVerifyMessage({
        type: "error",
        text: "먼저 인증코드 발송을 완료해 주세요.",
      });
      return;
    }

    if (!isTimerActive) {
      setVerifyMessage({
        type: "error",
        text: "인증 시간이 만료되었습니다. 인증코드를 재발송해 주세요.",
      });
      return;
    }

    if (isVerifying) {
      return;
    }

    setVerifyMessage(null);
    setIsVerifying(true);

    try {
      const result = await confirmPhoneVerification(
        normalizePhone(phone),
        verificationCode,
      );

      if (onVerified) {
        await onVerified(result);
      } else {
        setVerifyMessage({
          type: "success",
          text: "인증되었습니다",
        });
        updateSignupSession({
          phone: result.verifiedValue,
          verifyMethod: "phone",
          verificationToken: result.verificationToken,
          verifiedValue: result.verifiedValue,
        });
        router.push("/signup/terms");
      }
    } catch (verifyError) {
      setVerifyMessage({
        type: "error",
        text:
          verifyError instanceof ApiError
            ? verifyError.message
            : "인증번호가 일치하지 않습니다.",
      });
    } finally {
      setIsVerifying(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-[460px] flex-col bg-white px-4 py-16">
      <SignupStepIndicator currentStep={1} />

      <h1 className="mt-10 text-[22px] font-bold leading-8 tracking-tight text-[#222]">
        본인확인을 위해
        <br />
        인증을 진행해 주세요.
      </h1>

      <div className="mt-10">
        <div className="flex items-end gap-3">
          <input
            id="signup-phone-verify"
            type="tel"
            value={isCodeSent ? formatPhoneNumber(phone) : phone}
            onChange={(event) => handlePhoneChange(event.target.value)}
            placeholder="휴대폰 번호"
            autoComplete="tel"
            readOnly={isCodeSent}
            inputMode="numeric"
            className={`min-w-0 flex-1 border-b bg-transparent py-3 text-base text-[#222] outline-none placeholder:text-[#bbb] ${
              phoneError || phoneFormatError
                ? "border-red-400 focus:border-red-400"
                : "border-[#ddd] focus:border-[#00704A]"
            } ${isCodeSent ? "text-[#222]" : ""}`}
          />

          <button
            type="button"
            onClick={handleSendCode}
            disabled={!canSendCode || isSending}
            className="shrink-0 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors disabled:cursor-not-allowed disabled:border-[#ddd] disabled:text-[#bbb] enabled:border-[#00704A] enabled:text-[#00704A] enabled:hover:bg-[#00704A]/5"
          >
            {isSending
              ? "발송 중..."
              : isCodeSent
                ? "인증코드 재발송"
                : "인증코드 발송"}
          </button>
        </div>

        {(phoneError || phoneFormatError) && (
          <p className="mt-2 text-sm text-red-500" role="alert">
            {phoneError ?? phoneFormatError}
          </p>
        )}
      </div>

      {isCodeSent && verificationCode && (
        <div className="mt-10 rounded-2xl border border-[#eee] bg-[#fafafa] px-6 py-8 text-center">
          <div className="flex items-center justify-between gap-3">
            <p className="text-left text-sm leading-6 text-[#666]">
              아래 인증코드를 본인 휴대폰에서
              <br />
              <span className="font-semibold text-[#222]">
                {formattedReceiveNumber}
              </span>
              로 문자 발송해 주세요.
            </p>
            {isTimerActive ? (
              <span className="shrink-0 text-sm font-medium text-[#E75B5B]">
                {formatVerificationTimer(remainingSeconds)}
              </span>
            ) : (
              <span className="shrink-0 text-sm font-medium text-red-500">
                만료됨
              </span>
            )}
          </div>

          <p className="mt-8 text-[40px] font-semibold tracking-[0.25em] text-[#222]">
            {verificationCode}
          </p>

          <div className="mt-8 space-y-1 text-xs leading-5 text-[#888]">
            {sendGuideMessage && (
              <p className="whitespace-pre-line">{sendGuideMessage}</p>
            )}
            <p>문자에는 인증코드 숫자만 입력해 주세요.</p>
            <p className="font-medium text-[#666]">
              문자 전송 후 10~30초 뒤 아래 [다음] 버튼을 눌러 주세요.
            </p>
            <p>문자만 보내면 자동으로 인증되지 않습니다.</p>
            <p>이 코드는 5분 동안만 유효합니다.</p>
          </div>
        </div>
      )}

      {verifyMessage && (
        <p
          className={`mt-6 whitespace-pre-line text-center text-sm font-medium ${
            verifyMessage.type === "success" ? "text-[#00704A]" : "text-red-500"
          }`}
          role="status"
        >
          {verifyMessage.text}
        </p>
      )}

      <button
        type="button"
        onClick={handleNext}
        disabled={
          !isCodeSent || !verificationCode || isSending || isVerifying
        }
        className="mt-16 w-full rounded-full py-4 text-base font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:bg-[#ddd] enabled:bg-[#00704A] enabled:hover:opacity-90"
      >
        {isVerifying
          ? "1666-3538 문자 확인 중..."
          : isSending
            ? "인증코드 발송 중..."
            : "다음"}
      </button>
    </div>
  );
}
