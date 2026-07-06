"use client";

import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { DuplicateIdModal } from "@/components/auth/DuplicateIdModal";
import { SignupStepIndicator } from "@/components/auth/SignupStepIndicator";
import { ApiError } from "@/lib/api/client";
import { checkLoginId, joinMember } from "@/lib/api/member";
import {
  clearSignupVerificationSession,
  getSignupSession,
} from "@/lib/signup-session";
import {
  formatBirthDateForApi,
  getPasswordConfirmFeedback,
  getPasswordFormatError,
  getUserIdFormatError,
  isUserIdFormatValid,
  normalizePhone,
  validateBirthDate,
  validateNickname,
  validatePassword,
  validatePasswordConfirm,
  validateRequired,
  validateUserId,
} from "@/lib/signup-validation";

type FieldErrors = {
  userId: string | null;
  password: string | null;
  confirmPassword: string | null;
  name: string | null;
  birthDate: string | null;
  phone: string | null;
  email: string | null;
  nickname: string | null;
};

function getFieldErrors(
  values: {
    userId: string;
    password: string;
    confirmPassword: string;
    name: string;
    birthDate: string;
    phone: string;
    email: string;
    nickname: string;
  },
  touched: Record<string, boolean>,
): FieldErrors {
  return {
    userId: touched.userId ? validateUserId(values.userId) : null,
    password: null,
    confirmPassword: touched.confirmPassword
      ? validatePasswordConfirm(values.password, values.confirmPassword)
      : null,
    name: touched.name
      ? validateRequired(values.name, "이름을 입력해 주세요.")
      : null,
    birthDate: touched.birthDate ? validateBirthDate(values.birthDate) : null,
    phone: touched.phone
      ? validateRequired(values.phone, "휴대 전화 번호를 입력해 주세요.")
      : null,
    email: touched.email
      ? validateRequired(values.email, "이메일을 입력해 주세요.")
      : null,
    nickname: touched.nickname ? validateNickname(values.nickname) : null,
  };
}

type FormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: string;
  readOnly?: boolean;
  error?: string | null;
  success?: string | null;
  action?: React.ReactNode;
  trailing?: React.ReactNode;
};

function FormField({
  id,
  label,
  required = false,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  readOnly = false,
  error,
  success,
  action,
  trailing,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm text-[#888]">
        {label}
        {required && <span className="ml-0.5 text-[#00704A]">*</span>}
      </label>

      <div className="flex items-end gap-3">
        <div className="relative min-w-0 flex-1">
          <input
            id={id}
            type={type}
            value={value}
            readOnly={readOnly}
            placeholder={placeholder}
            onBlur={onBlur}
            onChange={(event) => onChange(event.target.value)}
            className={`w-full border-b bg-transparent py-3 pr-8 text-base text-[#222] outline-none placeholder:text-[#bbb] ${
              error
                ? "border-red-400 focus:border-red-400"
                : "border-[#ddd] focus:border-[#00704A]"
            } ${readOnly ? "text-[#666]" : ""}`}
          />
          {trailing}
        </div>
        {action}
      </div>

      {error && (
        <p className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
      {!error && success && (
        <p className="text-sm text-[#00704A]">{success}</p>
      )}
    </div>
  );
}

export function SignupMemberForm() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [idCheckMessage, setIdCheckMessage] = useState<string | null>(null);
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isEmailPrefilled, setIsEmailPrefilled] = useState(false);
  const [isPhonePrefilled, setIsPhonePrefilled] = useState(false);
  const [isCheckingId, setIsCheckingId] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const session = getSignupSession();

    if (session.email) {
      setEmail(session.email);
      setIsEmailPrefilled(true);
    }

    if (session.phone) {
      setPhone(session.phone);
      setIsPhonePrefilled(true);
    }
  }, []);

  const fieldErrors = getFieldErrors(
    {
      userId,
      password,
      confirmPassword,
      name,
      birthDate,
      phone,
      email,
      nickname,
    },
    touched,
  );

  const passwordConfirmFeedback = getPasswordConfirmFeedback(
    password,
    confirmPassword,
  );
  const userIdFormatError = getUserIdFormatError(userId);
  const passwordFormatError = getPasswordFormatError(password);
  const canCheckDuplicate = isUserIdFormatValid(userId);
  const confirmPasswordError =
    touched.confirmPassword && !confirmPassword
      ? "비밀번호 확인을 입력해 주세요."
      : passwordConfirmFeedback.error;
  const confirmPasswordSuccess = passwordConfirmFeedback.success;

  const canSubmit = useMemo(() => {
    return (
      !validateUserId(userId) &&
      !validatePassword(password) &&
      !validatePasswordConfirm(password, confirmPassword) &&
      !validateRequired(name, "") &&
      !validateBirthDate(birthDate) &&
      !validateRequired(phone, "") &&
      !validateRequired(email, "") &&
      !validateNickname(nickname) &&
      isIdChecked &&
      isIdAvailable
    );
  }, [
    userId,
    password,
    confirmPassword,
    name,
    birthDate,
    phone,
    email,
    nickname,
    isIdChecked,
    isIdAvailable,
  ]);

  function markTouched(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleUserIdChange(value: string) {
    setUserId(value);
    setIsIdChecked(false);
    setIsIdAvailable(false);
    setIdCheckMessage(null);
  }

  async function handleDuplicateCheck() {
    if (!canCheckDuplicate || isCheckingId) {
      return;
    }

    setIsCheckingId(true);

    try {
      const result = await checkLoginId(userId.trim());

      setIsIdChecked(true);
      setIsIdAvailable(result.available);

      if (!result.available) {
        setIdCheckMessage(null);
        setShowDuplicateModal(true);
        return;
      }

      setIdCheckMessage(result.message);
    } catch (error) {
      setIdCheckMessage(
        error instanceof ApiError
          ? error.message
          : "중복 확인에 실패했습니다.",
      );
      setIsIdChecked(false);
      setIsIdAvailable(false);
    } finally {
      setIsCheckingId(false);
    }
  }

  function handleNicknameChange(value: string) {
    setNickname(value.slice(0, 6));
  }

  function handleNicknameBlur() {
    markTouched("nickname");
    setNickname((prev) => prev.replace(/[^가-힣]/g, "").slice(0, 6));
  }

  async function handleSubmit() {
    setTouched({
      userId: true,
      password: true,
      confirmPassword: true,
      name: true,
      birthDate: true,
      phone: true,
      email: true,
      nickname: true,
    });

    if (!canSubmit || isSubmitting) {
      return;
    }

    const session = getSignupSession();
    const birthDateValue = formatBirthDateForApi(birthDate);

    if (!session.verificationToken || !birthDateValue) {
      setSubmitError("회원가입 정보가 올바르지 않습니다. 처음부터 다시 진행해 주세요.");
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      await joinMember({
        verificationToken: session.verificationToken,
        loginId: userId.trim(),
        password,
        name: name.trim(),
        birthDate: birthDateValue,
        phone: normalizePhone(phone),
        email: email.trim(),
        nickname: nickname.trim() || undefined,
      });

      clearSignupVerificationSession({
        emailAds: session.emailAds,
        smsAds: session.smsAds,
      });
      router.push("/signup/complete");
    } catch (error) {
      setSubmitError(
        error instanceof ApiError
          ? error.message
          : "회원가입에 실패했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-[460px] flex-col bg-white px-4 py-16">
        <SignupStepIndicator currentStep={3} />

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
            회원정보를
            <br />
            입력해 주세요
          </h1>
        </div>

        <div className="mt-10 space-y-8">
          <FormField
            id="signup-user-id"
            label="아이디"
            required
            value={userId}
            onChange={handleUserIdChange}
            placeholder="영문, 숫자 조합 6-12자리"
            error={userIdFormatError}
            success={idCheckMessage}
            action={
              <button
                type="button"
                onClick={handleDuplicateCheck}
                disabled={!canCheckDuplicate || isCheckingId}
                className="shrink-0 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors disabled:cursor-not-allowed disabled:border-[#ddd] disabled:text-[#bbb] enabled:border-[#00704A] enabled:text-[#00704A] enabled:hover:bg-[#00704A]/5"
              >
                {isCheckingId ? "확인 중..." : "중복확인"}
              </button>
            }
          />

          <FormField
            id="signup-password"
            label="비밀번호"
            required
            value={password}
            onChange={setPassword}
            placeholder="8~16자리 특수문자 1개 이상, 영문 대소문자"
            type={showPassword ? "text" : "password"}
            error={passwordFormatError}
            trailing={
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
            }
          />

          <FormField
            id="signup-confirm-password"
            label="비밀번호"
            required
            value={confirmPassword}
            onChange={(value) => {
              setConfirmPassword(value);
              markTouched("confirmPassword");
            }}
            onBlur={() => markTouched("confirmPassword")}
            placeholder="비밀번호 확인"
            type={showConfirmPassword ? "text" : "password"}
            error={confirmPasswordError}
            success={confirmPasswordSuccess}
            trailing={
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
            }
          />

          <FormField
            id="signup-name"
            label="이름"
            required
            value={name}
            onChange={setName}
            onBlur={() => markTouched("name")}
            error={fieldErrors.name}
          />

          <FormField
            id="signup-birth-date"
            label="생년월일"
            required
            value={birthDate}
            onChange={setBirthDate}
            onBlur={() => markTouched("birthDate")}
            placeholder="YYYYMMDD"
            error={fieldErrors.birthDate}
          />

          <FormField
            id="signup-phone"
            label="휴대 전화 번호"
            required
            value={phone}
            onChange={setPhone}
            onBlur={() => markTouched("phone")}
            readOnly={isPhonePrefilled}
            error={fieldErrors.phone}
          />

          <FormField
            id="signup-email"
            label="이메일"
            required
            value={email}
            onChange={setEmail}
            onBlur={() => markTouched("email")}
            readOnly={isEmailPrefilled}
            error={fieldErrors.email}
          />

          <FormField
            id="signup-nickname"
            label="닉네임"
            value={nickname}
            onChange={handleNicknameChange}
            onBlur={handleNicknameBlur}
            placeholder="한글 최대 6자"
            error={fieldErrors.nickname}
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit || isSubmitting}
          className="mt-16 w-full rounded-full py-4 text-base font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:bg-[#ddd] enabled:bg-[#00704A] enabled:hover:opacity-90"
        >
          {isSubmitting ? "가입 처리 중..." : "다음"}
        </button>

        {submitError && (
          <p className="mt-4 text-center text-sm text-red-500" role="alert">
            {submitError}
          </p>
        )}
      </div>

      <DuplicateIdModal
        open={showDuplicateModal}
        onClose={() => setShowDuplicateModal(false)}
      />
    </>
  );
}
