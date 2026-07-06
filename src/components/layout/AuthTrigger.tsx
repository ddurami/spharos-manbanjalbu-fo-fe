"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";

type AuthTriggerProps = {
  className?: string;
};

export function AuthTrigger({ className }: AuthTriggerProps) {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();

  if (isLoggedIn) {
    return (
      <button
        type="button"
        onClick={() => {
          logout();
          router.push("/");
        }}
        className={cn(className)}
      >
        <span>Log Out</span>
        <Image
          src="/images/icon-logout.png"
          alt=""
          width={24}
          height={24}
          aria-hidden
        />
      </button>
    );
  }

  return (
    <Link href="/login" className={cn(className)}>
      <span>Log In</span>
      <Image
        src="/images/icon-login-profile.png"
        alt=""
        width={24}
        height={24}
        aria-hidden
      />
    </Link>
  );
}
