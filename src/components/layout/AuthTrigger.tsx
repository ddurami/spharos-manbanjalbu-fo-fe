"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";

export function AuthTrigger() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return (
      <Link
        href="/mypage"
        aria-label="마이 프로필"
        className="transition-opacity hover:opacity-60"
      >
        <Image
          src="/images/icon-profile.png"
          alt=""
          width={24}
          height={24}
          aria-hidden
        />
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      aria-label="로그인"
      className="transition-opacity hover:opacity-60"
    >
      <Image
        src="/images/icon-login.png"
        alt=""
        width={24}
        height={24}
        aria-hidden
      />
    </Link>
  );
}
