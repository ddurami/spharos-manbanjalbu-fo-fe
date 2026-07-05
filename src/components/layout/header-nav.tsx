"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "MENU", href: "/menu" },
  { label: "EVENT", href: "/event" },
  { label: "BEST", href: "/best" },
  { label: "MY PAGE", href: "/mypage", matchPrefix: "/mypage" },
] as const;

function isNavActive(pathname: string, href: string, matchPrefix?: string) {
  if (matchPrefix) {
    return pathname === matchPrefix || pathname.startsWith(`${matchPrefix}/`);
  }

  return pathname === href;
}

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="주요 메뉴" className="flex items-center gap-10">
      {NAV_ITEMS.map((item) => {
        const active = isNavActive(
          pathname,
          item.href,
          "matchPrefix" in item ? item.matchPrefix : undefined
        );

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "px-2.5 py-2.5 text-lg text-foreground transition-colors hover:text-primary",
              active && "border-b-2 border-primary font-medium text-primary"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
