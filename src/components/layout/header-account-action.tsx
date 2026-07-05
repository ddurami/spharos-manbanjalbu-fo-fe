"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, LogOut } from "lucide-react";

import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";

export function HeaderAccountAction() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (user) {
    return (
      <Button
        variant="ghost"
        size="icon-lg"
        aria-label="로그아웃"
        className="text-foreground"
        onClick={handleLogout}
      >
        <LogOut className="size-9 stroke-[1.25]" />
      </Button>
    );
  }

  return (
    <Link
      href="/login"
      aria-label="로그인"
      className="inline-flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted"
    >
      <LogIn className="size-9 stroke-[1.25]" />
    </Link>
  );
}
