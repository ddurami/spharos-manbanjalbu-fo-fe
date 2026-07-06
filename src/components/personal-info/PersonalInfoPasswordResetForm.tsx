"use client";

import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PersonalInfoPasswordChangedModal } from "@/components/personal-info/PersonalInfoPasswordChangedModal";
import {
  getPasswordConfirmFeedback,
  getPasswordFormatError,
  validatePassword,
  validatePasswordConfirm,
} from "@/lib/signup-validation";
import {
  clearPersonalInfoPasswordSession,
  getPersonalInfoPasswordSession,
  updatePersonalInfoDraft,
  updatePersonalInfoPasswordSession,
} from "@/lib/personal-info-session";

export function PersonalInfoPasswordResetForm() {
  const router = useRouter();
  const [loginId, setLoginId] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const session = getPersonalInfoPasswordSession();
    if (!session.verificationToken || !session.loginId) {
      router.replace("/mypage/personal-info/password");
      return;
    }

    setLoginId(session.loginId);
    setVerificationToken(session.verificationToken);
    updatePersonalInfoPasswordSession(session);
  }, [router]);

  const passwordFormatError = getPasswordFormatError(password);
  const passwordFormatSuccess =
    password && !passwordFormatError ? "사용 가능한 비밀번호입니다." : null;

  const passwordConfirmFeedback = getPasswordConfirmFeedback(
    password,
    confirmPassword,
  );
  const confirmPasswordError =
    isConfirmPasswordTouched && !confirmPassword
      ? "비밀번호 확인을 입력해 주세요."
      : passwordConfirmFeedback.error;
  const confirmPasswordSuccess = passwordConfirmFeedback.success;

  const canSubmit =
    Boolean(loginId && verificationToken) &&
    !passwordFormatError &&
    !confirmPasswordError &&
    Boolean(password && confirmPassword);

  function handleSubmit() {
    const passwordError = validatePassword(password);
    const confirmError = validatePasswordConfirm(password, confirmPassword);

    if (passwordError || confirmError) {
      setError(passwordError ?? confirmError);
      return;
    }

    updatePersonalInfoDraft({
      pendingPassword: password,
      passwordVerificationToken: verificationToken,
      hasPasswordDraft: true,
    });
    clearPersonalInfoPasswordSession();
    setShowSuccessModal(true);
  }

  function handleSuccessConfirm() {
    setShowSuccessModal(false);
    router.push("/mypage/personal-info");
  }

  if (!loginId || !verificationToken) {
    return null;
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-[460px] flex-col bg-white px-4 py-16">
        <h1 className="text-[22px] font-bold leading-8 tracking-tight text-[#222]">
          <span className="text-[#00704A]">{loginId}</span> 님의 비밀번호를
          변경합니다.
        </h1>

        <div className="mt-10 space-y-8">
          <div>
            <div className="relative">
              <input
                id="personal-info-password-new"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (error) {
                    setError(null);
                  }
                }}
                placeholder="새 비밀번호"
                autoComplete="new-password"
                className={`w-full border-b bg-transparent py-3 pr-10 text-base text-[#222] outline-none placeholder:text-[#bbb] ${
                  passwordFormatError
                    ? "border-red-400"
                    : "border-[#ddd] focus:border-[#00704A]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[#bbb] transition-colors hover:text-[#888]"
              >
                {showPassword ? (
                  <Eye className="size-5" />
                ) : (
                  <EyeOff className="size-5" />
                )}
              </button>
            </div>
            {passwordFormatError && (
              <p className="mt-2 text-sm text-red-500" role="alert">
                {passwordFormatError}
              </p>
            )}
            {!passwordFormatError && passwordFormatSuccess && (
              <p className="mt-2 text-sm text-[#00704A]">{passwordFormatSuccess}</p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                id="personal-info-password-confirm"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                  setIsConfirmPasswordTouched(true);
                  if (error) {
                    setError(null);
                  }
                }}
                onBlur={() => setIsConfirmPasswordTouched(true)}
                placeholder="새 비밀번호 확인"
                autoComplete="new-password"
                className={`w-full border-b bg-transparent py-3 pr-10 text-base text-[#222] outline-none placeholder:text-[#bbb] ${
                  confirmPasswordError
                    ? "border-red-400"
                    : "border-[#ddd] focus:border-[#00704A]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={
                  showConfirmPassword ? "비밀번호 숨기기" : "비밀번호 보기"
                }
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[#bbb] transition-colors hover:text-[#888]"
              >
                {showConfirmPassword ? (
                  <Eye className="size-5" />
                ) : (
                  <EyeOff className="size-5" />
                )}
              </button>
            </div>
            {confirmPasswordError && (
              <p className="mt-2 text-sm text-red-500" role="alert">
                {confirmPasswordError}
              </p>
            )}
            {!confirmPasswordError && confirmPasswordSuccess && (
              <p className="mt-2 text-sm text-[#00704A]">
                {confirmPasswordSuccess}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-[#eee] bg-[#fafafa] px-5 py-5 text-sm leading-6 text-[#666]">
          <p className="font-semibold text-[#222]">안전한 비밀번호 만들기</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>8~16자리 영문, 숫자, 특수문자를 조합하여 사용해 주세요.</li>
            <li>
              아이디, 생년월일, 전화번호 등 추측하기 쉬운 비밀번호는 사용하지
              마세요.
            </li>
            <li>이전에 사용했던 비밀번호는 다시 사용하지 않는 것이 좋습니다.</li>
          </ul>
        </div>

        {error && (
          <p className="mt-6 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="mt-10 w-full rounded-full bg-[#00704A] py-4 text-base font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          확인
        </button>
      </div>

      <PersonalInfoPasswordChangedModal
        open={showSuccessModal}
        onConfirm={handleSuccessConfirm}
      />
    </>
  );
}
