"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";

const MY_PAGE_ITEM = { label: "MY PAGE", href: "/mypage" } as const;

const navLinkClassName =
  "text-sm font-medium tracking-wide text-black transition-opacity hover:opacity-60";

type HeaderNavProps = {
  onMenuEnter: () => void;
  onMenuLeave: () => void;
};

export function HeaderNav({ onMenuEnter, onMenuLeave }: HeaderNavProps) {
  const { isLoggedIn } = useAuth();

  return (
    <nav className="hidden items-center gap-8 md:flex lg:gap-10">
      <div onMouseEnter={onMenuEnter} onMouseLeave={onMenuLeave}>
        <Link href="/products" className={navLinkClassName}>
          MENU
        </Link>
      </div>

      <Link href="/event" className={navLinkClassName}>
        EVENT
      </Link>

      <Link href="/best" className={navLinkClassName}>
        BEST
      </Link>

      {isLoggedIn && (
        <Link href={MY_PAGE_ITEM.href} className={navLinkClassName}>
          {MY_PAGE_ITEM.label}
        </Link>
      )}
    </nav>
  );
}
