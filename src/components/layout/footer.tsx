import Image from "next/image";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const FOOTER_LINKS = [
  { label: "개인정보처리방침", href: "/privacy" },
  { label: "홈페이지 이용약관", href: "/terms" },
  { label: "스타벅스카드 이용약관", href: "/card-terms" },
] as const;

function FooterDivider() {
  return (
    <Separator
      orientation="vertical"
      className="h-3 bg-sb-text-muted data-[orientation=vertical]:w-px"
    />
  );
}

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("bg-sb-surface py-[60px]", className)}>
      <div className="mx-auto flex max-w-[1920px] items-end justify-between gap-8 px-[50px] lg:px-[300px]">
        <div className="flex flex-col gap-5">
          <Link
            href="/"
            aria-label="스타벅스 홈"
            className="relative inline-block h-4 w-[157px] shrink-0"
          >
            <Image
              src="/images/starbucks-wordmark.png"
              alt="Starbucks"
              width={708}
              height={74}
              className="block h-4 w-[157px] object-contain object-left"
              priority
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[#1b6e32] mix-blend-lighten"
            />
          </Link>
          <p className="text-sm font-medium text-sb-text-muted">
            주식회사 에스씨케이컴퍼니
          </p>
          <div className="flex flex-col gap-1.5 text-sm text-sb-text-muted">
            <div className="flex flex-wrap items-center gap-2.5">
              <span>대표이사 : 손정현</span>
              <FooterDivider />
              <span>사업자등록번호 : 201-81-21515</span>
              <FooterDivider />
              <span>TEL : 1522-3232</span>
              <FooterDivider />
              <span>개인정보 보호책임자 : 이찬우</span>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span>통신판매업신고번호 : 2011-서울중구-1066</span>
              <FooterDivider />
              <span>
                주소 : 서울 강남구 테헤란로 231 센터필드 EAST 20~22F (06142)
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-5">
          <nav
            aria-label="푸터 링크"
            className="flex flex-wrap items-center justify-end gap-[30px] text-sm text-sb-text-muted"
          >
            {FOOTER_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="text-right text-sm text-sb-text-muted">
            <p>©2026 Starbucks Coffee Company. All Rights Reserved</p>
            <p className="mt-1.5">Hosting By (주)신세계아이앤씨</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
