"use client";

import Link from "next/link";

import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { DEMO_MEMBER } from "@/lib/api/server/mock-data";
import { maskName } from "@/lib/mypage/mask-name";

const outlineButtonClassName =
  "h-10 shrink-0 rounded-full border-[1.5px] border-primary px-5 text-[17px] tracking-tight text-primary hover:bg-sb-green-soft hover:text-primary";

export function MypageGreeting() {
  const { user } = useAuth();
  const maskedName = maskName(user?.name ?? DEMO_MEMBER.name);

  return (
    <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-2">
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-[36px] font-medium leading-[1.2]">
          <span className="block text-[#00A864]">{maskedName}님</span>
          <span className="block text-foreground">환영합니다</span>
        </h1>
        <Link href="/mypage/profile" className="shrink-0">
          <Button variant="outline" className={outlineButtonClassName}>
            개인정보 관리
          </Button>
        </Link>
      </div>
    </div>
  );
}
