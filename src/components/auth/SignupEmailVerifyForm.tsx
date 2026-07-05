"use client";



import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";

import { SignupStepIndicator } from "@/components/auth/SignupStepIndicator";

import { ApiError } from "@/lib/api/client";

import {

  confirmEmailVerification,

  sendEmailVerification,

} from "@/lib/api/member";

import { updateSignupSession } from "@/lib/signup-session";



const CODE_LENGTH = 6;

const TIMER_SECONDS = 5 * 60;



const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



function formatTimer(seconds: number) {

  const minutes = Math.floor(seconds / 60);

  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;

}



function validateEmail(email: string) {

  const trimmed = email.trim();



  if (!trimmed) {

    return "이메일 주소를 입력해 주세요.";

  }



  if (!EMAIL_PATTERN.test(trimmed)) {

    return "올바른 이메일 형식으로 입력해 주세요.";

  }



  return null;

}



export function SignupEmailVerifyForm() {

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [emailError, setEmailError] = useState<string | null>(null);

  const [codeError, setCodeError] = useState<string | null>(null);

  const [isCodeSent, setIsCodeSent] = useState(false);

  const [isSending, setIsSending] = useState(false);

  const [isVerifying, setIsVerifying] = useState(false);

  const [remainingSeconds, setRemainingSeconds] = useState(0);

  const [sendCount, setSendCount] = useState(0);

  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));

  const codeInputRefs = useRef<Array<HTMLInputElement | null>>([]);



  useEffect(() => {

    if (!isCodeSent || sendCount === 0) {

      return;

    }



    setRemainingSeconds(TIMER_SECONDS);



    const timerId = window.setInterval(() => {

      setRemainingSeconds((prev) => {

        if (prev <= 1) {

          window.clearInterval(timerId);

          return 0;

        }

        return prev - 1;

      });

    }, 1000);



    return () => window.clearInterval(timerId);

  }, [isCodeSent, sendCount]);



  async function handleSendCode() {

    const error = validateEmail(email);



    if (error) {

      setEmailError(error);

      return;

    }



    setEmailError(null);

    setCodeError(null);

    setIsSending(true);



    try {

      await sendEmailVerification(email.trim());

      setIsCodeSent(true);

      setSendCount((prev) => prev + 1);

      setCode(Array(CODE_LENGTH).fill(""));

      codeInputRefs.current[0]?.focus();

    } catch (sendError) {

      setEmailError(

        sendError instanceof ApiError

          ? sendError.message

          : "인증코드 발송에 실패했습니다.",

      );

    } finally {

      setIsSending(false);

    }

  }



  function handleEmailChange(value: string) {

    setEmail(value);



    if (emailError) {

      setEmailError(null);

    }

  }



  function handleCodeChange(index: number, value: string) {

    const digit = value.replace(/\D/g, "").slice(-1);



    setCode((prev) => {

      const next = [...prev];

      next[index] = digit;

      return next;

    });



    if (codeError) {

      setCodeError(null);

    }



    if (digit && index < CODE_LENGTH - 1) {

      codeInputRefs.current[index + 1]?.focus();

    }

  }



  function handleCodeKeyDown(

    index: number,

    event: React.KeyboardEvent<HTMLInputElement>,

  ) {

    if (event.key === "Backspace" && !code[index] && index > 0) {

      codeInputRefs.current[index - 1]?.focus();

    }

  }



  function handleCodePaste(event: React.ClipboardEvent<HTMLInputElement>) {

    event.preventDefault();

    const pasted = event.clipboardData

      .getData("text")

      .replace(/\D/g, "")

      .slice(0, CODE_LENGTH);



    if (!pasted) {

      return;

    }



    const nextCode = Array(CODE_LENGTH)

      .fill("")

      .map((_, index) => pasted[index] ?? "");



    setCode(nextCode);

    codeInputRefs.current[Math.min(pasted.length, CODE_LENGTH - 1)]?.focus();

  }



  async function handleNext() {

    if (!isCodeSent || isVerifying || code.some((digit) => !digit)) {

      return;

    }



    setCodeError(null);

    setIsVerifying(true);



    try {

      const result = await confirmEmailVerification(

        email.trim(),

        code.join(""),

      );



      updateSignupSession({

        email: result.verifiedValue,

        verifyMethod: "email",

        verificationToken: result.verificationToken,

        verifiedValue: result.verifiedValue,

      });

      router.push("/signup/terms");

    } catch (verifyError) {

      setCodeError(

        verifyError instanceof ApiError

          ? verifyError.message

          : "인증번호가 일치하지 않습니다.",

      );

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

        {isCodeSent && (

          <p className="mb-4 text-sm leading-5 text-[#888]">

            입력하신 이메일로 인증코드가 발송되었습니다.

          </p>

        )}



        <label

          htmlFor="signup-email"

          className="block text-sm text-[#888]"

        >

          이메일주소

        </label>



        <div className="mt-3 flex items-end gap-3">

          <input

            id="signup-email"

            type="email"

            value={email}

            onChange={(event) => handleEmailChange(event.target.value)}

            placeholder="이메일을 입력해 주세요"

            autoComplete="email"

            readOnly={isCodeSent}

            className={`min-w-0 flex-1 border-b bg-transparent py-3 text-base text-[#222] outline-none placeholder:text-[#bbb] ${

              emailError

                ? "border-red-400 focus:border-red-400"

                : "border-[#ddd] focus:border-[#00704A]"

            } ${isCodeSent ? "text-[#222]" : ""}`}

          />



          <button

            type="button"

            onClick={handleSendCode}

            disabled={isSending}

            className="shrink-0 rounded-full border border-[#00704A] px-4 py-2 text-sm font-medium whitespace-nowrap text-[#00704A] transition-colors hover:bg-[#00704A]/5 disabled:cursor-not-allowed disabled:opacity-50"

          >

            {isSending

              ? "발송 중..."

              : isCodeSent

                ? "인증코드 재발송"

                : "인증코드 발송"}

          </button>

        </div>



        {emailError && (

          <p className="mt-2 text-sm text-red-500" role="alert">

            {emailError}

          </p>

        )}

      </div>



      <div className="mt-10">

        <div className="flex items-center justify-between">

          <label className="text-sm text-[#888]">인증번호</label>

          {isCodeSent && remainingSeconds > 0 && (

            <span className="text-sm font-medium text-[#E75B5B]">

              {formatTimer(remainingSeconds)}

            </span>

          )}

        </div>



        <div className="mt-4 flex justify-between gap-2">

          {code.map((digit, index) => (

            <input

              key={index}

              ref={(element) => {

                codeInputRefs.current[index] = element;

              }}

              type="text"

              inputMode="numeric"

              maxLength={1}

              value={digit}

              disabled={!isCodeSent}

              aria-label={`인증번호 ${index + 1}번째 자리`}

              onChange={(event) => handleCodeChange(index, event.target.value)}

              onKeyDown={(event) => handleCodeKeyDown(index, event)}

              onPaste={handleCodePaste}

              className="size-11 rounded-xl border border-[#ddd] bg-white text-center text-lg font-medium text-[#222] outline-none transition-colors focus:border-[#00704A] disabled:bg-[#fafafa] disabled:text-[#bbb] sm:size-12"

            />

          ))}

        </div>



        {codeError && (

          <p className="mt-3 text-sm text-red-500" role="alert">

            {codeError}

          </p>

        )}

      </div>



      <button

        type="button"

        onClick={handleNext}

        className="mt-16 w-full rounded-full bg-[#00704A] py-4 text-base font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"

        disabled={!isCodeSent || code.some((digit) => !digit) || isVerifying}

      >

        {isVerifying ? "인증 확인 중..." : "다음"}

      </button>

    </div>

  );

}


