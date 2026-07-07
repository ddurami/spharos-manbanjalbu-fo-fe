"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { clearFindIdSession } from "@/lib/find-id-session";

export function FindIdResultForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const loginId = searchParams.get("loginId")?.trim() ?? "";

  useEffect(() => {
    if (!loginId) {
      router.replace("/find-id");
      return;
    }

    clearFindIdSession();
  }, [loginId, router]);

  if (!loginId) {
    return null;
  }

  return (
    <div className="mx-auto flex w-full max-w-[460px] flex-col bg-white px-4 py-16">
      <div className="flex flex-col items-center text-center">
        <Image
          src="/images/find-id-success.png"
          alt=""
          width={200}
          height={200}
          priority
          className="shrink-0"
          aria-hidden
        />

        <p className="mt-10 text-lg leading-8 text-[#222]">
          고객님의 아이디는{" "}
          <span className="font-bold text-[#00704A]">{loginId}</span> 입니다.
        </p>
      </div>

      <div className="mt-16 flex gap-3">
        <Link
          href="/login"
          className="flex-1 rounded-full border border-[#00704A] py-4 text-center text-base font-medium text-[#00704A] transition-colors hover:bg-[#00704A]/5"
        >
          로그인하기
        </Link>
        <Link
          href={`/find-password/reset?loginId=${encodeURIComponent(loginId)}`}
          className="flex-1 rounded-full bg-[#00704A] py-4 text-center text-base font-medium text-white transition-opacity hover:opacity-90"
        >
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
}
