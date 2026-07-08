"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { SignupTermConfig } from "@/constants/signup-terms";
import { updateSignupTermAgreement } from "@/lib/signup-terms-session";

type SignupTermDetailProps = {
  config: SignupTermConfig;
  content: string | null;
};

function MarketingTermContent() {
  return (
    <div className="space-y-6">
      <table className="w-full border-collapse text-sm text-[#222]">
        <tbody>
          <tr className="border-b border-[#ddd]">
            <th
              scope="row"
              className="w-[108px] border-r border-[#ddd] px-3 py-4 text-left font-normal"
            >
              목적
            </th>
            <td className="px-3 py-4 leading-6">
              <span className="underline">
                마케팅 정보 활용(상품정보 및 행사 정보 안내 등).
              </span>
            </td>
          </tr>
          <tr className="border-b border-[#ddd]">
            <th
              scope="row"
              className="border-r border-[#ddd] px-3 py-4 text-left font-normal"
            >
              항목
            </th>
            <td className="px-3 py-4 leading-6">휴대폰번호, 이메일주소</td>
          </tr>
          <tr>
            <th
              scope="row"
              className="border-r border-[#ddd] px-3 py-4 text-left font-normal"
            >
              보유 및
              <br />
              이용 기간
            </th>
            <td className="px-3 py-4 leading-6">
              <span className="underline">회원탈퇴 또는 동의 철회시</span>
            </td>
          </tr>
        </tbody>
      </table>

      <p className="text-xs leading-5 text-[#888]">
        ※ 마케팅 개인정보 수집 이용 동의를 거부할 수 있으며, 거부 시 스타벅스
        상품, 이벤트 등 마케팅 정보를 받을 수 없습니다.
      </p>
    </div>
  );
}

function TextTermContent({ content }: { content: string }) {
  return (
    <div className="whitespace-pre-wrap text-sm leading-6 text-[#222]">
      {content}
    </div>
  );
}

export function SignupTermDetail({ config, content }: SignupTermDetailProps) {
  const router = useRouter();

  function handleClose() {
    router.push("/signup/terms");
  }

  function handleConfirm() {
    if (!config.required) {
      updateSignupTermAgreement("marketing", true);
    }

    router.push("/signup/terms");
  }

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-[460px] flex-1 flex-col bg-white px-4">
      <div className="flex shrink-0 items-start justify-between gap-4 pt-6">
        <h1 className="text-lg font-bold leading-7 text-[#222]">
          {config.title}
        </h1>
        <button
          type="button"
          onClick={handleClose}
          aria-label="닫기"
          className="shrink-0 p-1 text-[#222] transition-opacity hover:opacity-70"
        >
          <X className="size-5" aria-hidden />
        </button>
      </div>

      <div className="mt-6 min-h-0 flex-1 overflow-y-auto pb-4">
        {config.slug === "marketing" ? (
          <MarketingTermContent />
        ) : (
          content && <TextTermContent content={content} />
        )}
      </div>

      <div className="shrink-0 border-t border-[#eee] bg-white py-4">
        <button
          type="button"
          onClick={handleConfirm}
          className="w-full rounded-full bg-[#00704A] py-4 text-base font-medium text-white transition-opacity hover:opacity-90"
        >
          {config.required ? "확인" : "동의"}
        </button>
      </div>
    </div>
  );
}
