import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function MypagePersonalInfoLink() {
  return (
    <Link
      href="#"
      className="flex items-center justify-between border border-sb-border bg-white px-[30px] py-5 transition-opacity hover:opacity-70"
    >
      <span className="text-2xl font-normal text-foreground">개인정보 관리</span>
      <ChevronRight className="size-[30px] shrink-0 text-foreground" aria-hidden />
    </Link>
  );
}
