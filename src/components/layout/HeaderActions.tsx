"use client";

import Image from "next/image";
import Link from "next/link";
import { AuthTrigger } from "@/components/layout/AuthTrigger";

const linkClassName =
  "flex items-center gap-1.5 text-sm font-medium tracking-wide text-black transition-opacity hover:opacity-60";

type HeaderActionsProps = {
  onSearchOpen: () => void;
};

export function HeaderActions({ onSearchOpen }: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-5 lg:gap-8">
      <button
        type="button"
        onClick={onSearchOpen}
        className={linkClassName}
      >
        <span>Search</span>
        <Image
          src="/images/icon-search.png"
          alt=""
          width={24}
          height={24}
          aria-hidden
        />
      </button>

      <Link href="/cart" className={linkClassName}>
        <span>Cart</span>
        <Image
          src="/images/icon-cart.png"
          alt=""
          width={24}
          height={24}
          aria-hidden
        />
      </Link>

      <AuthTrigger className={linkClassName} />
    </div>
  );
}
