import Image from "next/image";
import Link from "next/link";
import { LogIn, Search, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "MENU", href: "/menu" },
  { label: "EVENT", href: "/event" },
  { label: "BEST", href: "/best" },
  { label: "MY PAGE", href: "/mypage" },
] as const;

export function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "flex h-[85px] shrink-0 items-center justify-between bg-white px-[50px] py-2.5",
        className
      )}
    >
      <div className="flex items-center gap-10">
        <Link href="/" aria-label="스타벅스 홈">
          <Image
            src="/images/starbucks-logo.png"
            alt="Starbucks"
            width={58}
            height={58}
            priority
          />
        </Link>
        <nav aria-label="주요 메뉴" className="flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-2.5 py-2.5 text-lg text-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <Button
          variant="ghost"
          size="icon-lg"
          aria-label="검색"
          className="text-foreground"
        >
          <Search className="size-9 stroke-[1.25]" />
        </Button>
        <Link
          href="/checkout"
          aria-label="장바구니"
          className="inline-flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted"
        >
          <ShoppingCart className="size-9 stroke-[1.25]" />
        </Link>
        <Button
          variant="ghost"
          size="icon-lg"
          aria-label="로그인"
          className="text-foreground"
        >
          <LogIn className="size-9 stroke-[1.25]" />
        </Button>
      </div>
    </header>
  );
}
