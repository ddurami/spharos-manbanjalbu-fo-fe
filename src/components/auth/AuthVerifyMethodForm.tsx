"use client";

import { Mail, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignupStepIndicator } from "@/components/auth/SignupStepIndicator";

type VerifyMethod = "email" | "phone";

const VERIFY_OPTIONS = [
  {
    value: "email" as const,
    icon: Mail,
    title: "이메일 인증하기",
    description: "이메일 계정으로 인증할 수 있어요.",
  },
  {
    value: "phone" as const,
    icon: Smartphone,
    title: "휴대폰 본인 인증하기",
    description: "본인 명의 휴대폰으로 인증할 수 있어요.",
  },
] as const;

type AuthVerifyMethodFormProps = {
  emailHref: string;
  phoneHref: string;
  onMethodSelect?: (method: VerifyMethod) => void;
};

export function AuthVerifyMethodForm({
  emailHref,
  phoneHref,
  onMethodSelect,
}: AuthVerifyMethodFormProps) {
  const router = useRouter();
  const [method, setMethod] = useState<VerifyMethod>("email");

  function handleNext() {
    onMethodSelect?.(method);
    router.push(method === "email" ? emailHref : phoneHref);
  }

  return (
    <div className="mx-auto flex w-full max-w-[460px] flex-col bg-white px-4 py-16">
      <SignupStepIndicator currentStep={1} />

      <h1 className="mt-10 text-[22px] font-bold leading-8 tracking-tight text-[#222]">
        본인확인을 위해
        <br />
        인증을 진행해 주세요.
      </h1>

      <div className="mt-10 space-y-4" role="radiogroup" aria-label="인증 방식 선택">
        {VERIFY_OPTIONS.map((option) => {
          const isSelected = method === option.value;
          const Icon = option.icon;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setMethod(option.value)}
              className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-5 text-left transition-colors ${
                isSelected
                  ? "border-[#00704A] bg-white"
                  : "border-[#eee] bg-white hover:border-[#ddd]"
              }`}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f5f5f5]">
                <Icon className="size-5 text-[#00704A]" strokeWidth={1.75} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-base font-semibold text-[#222]">
                  {option.title}
                </span>
                <span className="mt-1 block whitespace-nowrap text-sm leading-5 text-[#888]">
                  {option.description}
                </span>
              </span>

              <span
                aria-hidden
                className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  isSelected
                    ? "border-[#00704A]"
                    : "border-[#ddd] bg-white"
                }`}
              >
                {isSelected && (
                  <span className="size-2.5 rounded-full bg-[#00704A]" />
                )}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleNext}
        className="mt-10 w-full rounded-full bg-[#00704A] py-4 text-base font-medium text-white transition-opacity hover:opacity-90"
      >
        다음
      </button>
    </div>
  );
}
