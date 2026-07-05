"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { MypageMenuItem } from "@/lib/mypage/mock-data";
import { cn } from "@/lib/utils";

type MypageMenuListProps = {
  items: MypageMenuItem[];
  ariaLabel: string;
};

export function MypageMenuList({ items, ariaLabel }: MypageMenuListProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={ariaLabel}>
      <ul className="flex flex-col gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-4 rounded-lg py-4 text-lg transition-colors hover:text-primary",
                  active
                    ? "font-medium text-primary"
                    : "text-foreground"
                )}
              >
                <Icon
                  aria-hidden
                  className={cn(
                    "size-[30px] shrink-0 stroke-[1.25]",
                    active ? "text-primary" : "text-sb-text-muted"
                  )}
                />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
