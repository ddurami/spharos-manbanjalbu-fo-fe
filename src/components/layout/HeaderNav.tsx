"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";

const BASE_NAV_ITEMS = [
  { label: "MENU", href: "/menu" },
  { label: "EVENT", href: "/event" },
  { label: "BEST", href: "/best" },
] as const;

const MY_PAGE_ITEM = { label: "MY PAGE", href: "/mypage" } as const;

export function HeaderNav() {
  const { isLoggedIn } = useAuth();

  const navItems = isLoggedIn
    ? [...BASE_NAV_ITEMS, MY_PAGE_ITEM]
    : BASE_NAV_ITEMS;

  return (
    <nav className="hidden items-center gap-8 md:flex lg:gap-10">
      {navItems.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          className="text-sm font-medium tracking-wide text-black transition-opacity hover:opacity-60"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
