import Link from "next/link";

import { maskName } from "@/lib/mypage/mask-name";

type MypageWelcomeProps = {
  name: string;
};

export function MypageWelcome({ name }: MypageWelcomeProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-[28px] font-medium text-foreground sm:text-[32px]">
        {maskName(name)}님 환영합니다!
      </h1>
      <Link
        href="#"
        className="inline-flex h-10 shrink-0 items-center justify-center rounded-full border border-sb-green px-6 text-sm font-medium text-sb-green transition-opacity hover:opacity-70"
      >
        개인정보 관리
      </Link>
    </div>
  );
}
