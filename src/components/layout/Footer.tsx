import Link from "next/link";
import { cn } from "@/lib/utils";

const LEGAL_LINKS = [
  { label: "개인정보처리방침", href: "/privacy", highlight: true },
  { label: "홈페이지 이용약관", href: "/terms" },
  { label: "스타벅스카드 이용약관", href: "/card-terms" },
] as const;

function Separator() {
  return (
    <span className="mx-2 text-[#999]" aria-hidden>
      |
    </span>
  );
}

export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "mt-auto shrink-0 bg-[#f4f4f2] text-xs leading-relaxed text-[#666]",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-6 py-10 lg:flex-row lg:justify-between lg:px-10">
        <div className="space-y-3">
          <p className="text-base font-bold tracking-wider text-[#00704A]">
            STARBUCKS
          </p>
          <p>주식회사 에스씨케이컴퍼니</p>
          <p>
            대표이사 : 손정현
            <Separator />
            사업자등록번호 : 201-81-21515
            <Separator />
            TEL : 1522-3232
            <Separator />
            개인정보 보호책임자 : 이찬우
            <Separator />
          </p>
          <p>
            통신판매업신고번호 : 2011-서울중구-1056
            <Separator />
            주소 : 서울 강남구 테헤란로 231 센터필드 EAST 20~22F (06142)
          </p>
        </div>

        <div className="space-y-3 lg:text-right">
          <nav className="flex flex-wrap items-center lg:justify-end">
            {LEGAL_LINKS.map((item, index) => (
              <span key={item.href} className="inline-flex items-center">
                {index > 0 && <Separator />}
                <Link
                  href={item.href}
                  className={
                    "highlight" in item && item.highlight
                      ? "font-bold text-[#00704A] hover:underline"
                      : "hover:underline"
                  }
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>
          <p>© 2026 Starbucks Coffee Company. All Rights Reserved</p>
          <p>Hosting By (주)신세계아이앤씨</p>
        </div>
      </div>
    </footer>
  );
}
