"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { AuthTrigger } from "@/components/layout/AuthTrigger";
import { getCartCount } from "@/lib/api/cart";

const linkClassName =
  "flex items-center gap-1.5 text-sm font-medium tracking-wide text-black transition-opacity hover:opacity-60";

type HeaderActionsProps = {
  onSearchOpen: () => void;
};

export function HeaderActions({ onSearchOpen }: HeaderActionsProps) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (!isLoggedIn) {
      setCartCount(0);
      return;
    }
    getCartCount()
      .then(setCartCount)
      .catch(() => setCartCount(0));
  }, [isLoggedIn]);

  useEffect(() => {
    const handleCartUpdate = () => {
      if (!isLoggedIn) return;
      getCartCount()
        .then(setCartCount)
        .catch(() => {});
    };
    window.addEventListener("cart-updated", handleCartUpdate);
    return () => window.removeEventListener("cart-updated", handleCartUpdate);
  }, [isLoggedIn]);

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

      {isLoggedIn ? (
        <Link href="/cart" className={linkClassName}>
          <span>Cart</span>
          <span className="relative">
            <Image
              src="/images/icon-cart.png"
              alt=""
              width={24}
              height={24}
              aria-hidden
            />
            {cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-sb-green text-[10px] font-bold text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </span>
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => {
            alert("로그인 후 이용해주세요");
            router.push("/login");
          }}
          className={linkClassName}
        >
          <span>Cart</span>
          <Image
            src="/images/icon-cart.png"
            alt=""
            width={24}
            height={24}
            aria-hidden
          />
        </button>
      )}

      <AuthTrigger className={linkClassName} />
    </div>
  );
}
