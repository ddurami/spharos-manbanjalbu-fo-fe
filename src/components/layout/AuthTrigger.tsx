"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";

type AuthTriggerProps = {
  className?: string;
};

export function AuthTrigger({ className }: AuthTriggerProps) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return (
      <Link href="/mypage" className={cn(className)}>
        <span>My Page</span>
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
    <Link href="/login" className={cn(className)}>
      <span>Log In</span>
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
