import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";

import { HeaderAccountAction } from "@/components/layout/header-account-action";
import { HeaderNav } from "@/components/layout/header-nav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
        <HeaderNav />
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
        <HeaderAccountAction />
      </div>
    </header>
  );
}
