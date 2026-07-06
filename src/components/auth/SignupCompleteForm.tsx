"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSignupSession } from "@/lib/signup-session";

type MarketingConsent = {
  emailAds: boolean;
  smsAds: boolean;
};

function getConsentLabel(agreed: boolean) {
  return agreed ? "수신 동의" : "수신 거부";
}

const MARKETING_ITEMS = [
  { key: "emailAds" as const, label: "E-mail 광고성 정보" },
  { key: "smsAds" as const, label: "SMS 광고성 정보" },
];

export function SignupCompleteForm() {
  const [consent, setConsent] = useState<MarketingConsent>({
    emailAds: false,
    smsAds: false,
  });

  useEffect(() => {
    const session = getSignupSession();
    setConsent({
      emailAds: session.emailAds,
      smsAds: session.smsAds,
    });
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-[460px] flex-col bg-white px-4 py-16">
      <div className="flex items-center gap-4">
        <Image
          src="/images/logo.png"
          alt="Starbucks"
          width={56}
          height={56}
          priority
          className="shrink-0"
        />
        <div>
          <h1 className="text-[22px] font-bold leading-8 tracking-tight text-[#222]">
            축하합니다
          </h1>
          <p className="text-[22px] font-bold leading-8 tracking-tight text-[#222]">
            회원가입이 완료되었습니다
          </p>
        </div>
      </div>

      <div className="mt-14">
        <p className="text-sm text-[#888]">
          광고성 정보 수신동의 여부 처리 결과
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[#eee]">
          {MARKETING_ITEMS.map((item, index) => (
            <div
              key={item.key}
              className={`grid grid-cols-2 text-center text-sm ${
                index > 0 ? "border-t border-[#eee]" : ""
              }`}
            >
              <div className="border-r border-[#eee] px-4 py-4 text-[#888]">
                {item.label}
              </div>
              <div className="px-4 py-4 font-medium text-[#666]">
                {getConsentLabel(consent[item.key])}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link
        href="/login"
        className="mt-16 w-full rounded-full bg-[#00704A] py-4 text-center text-base font-medium text-white transition-opacity hover:opacity-90"
      >
        로그인 하기
      </Link>
    </div>
  );
}
