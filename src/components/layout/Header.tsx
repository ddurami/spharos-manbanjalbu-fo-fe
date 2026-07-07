"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeaderNav } from "@/components/layout/HeaderNav";
import { HeaderActions } from "@/components/layout/HeaderActions";
import { MenuPanel } from "@/components/layout/MenuPanel";
import { SearchPanel } from "@/components/search/SearchPanel";

export function Header() {
  const [activePanel, setActivePanel] = useState<"menu" | "search" | null>(
    null,
  );
  const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMenuEnter = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setActivePanel("menu");
  };

  const handleMenuLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setActivePanel((prev) => (prev === "menu" ? null : prev));
    }, 150);
  };

  const handleSearchOpen = () => {
    setActivePanel("search");
  };

  const handlePanelClose = () => {
    setActivePanel(null);
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="border-b border-black/5">
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-10 lg:gap-14">
            <Link href="/" className="shrink-0" aria-label="스타벅스 홈">
              <Image
                src="/images/logo.png"
                alt="Starbucks"
                width={40}
                height={40}
                priority
              />
            </Link>

            <HeaderNav
              onMenuEnter={handleMenuEnter}
              onMenuLeave={handleMenuLeave}
            />
          </div>

          <HeaderActions onSearchOpen={handleSearchOpen} />
        </div>
      </div>

      {activePanel != null && (
        <div className="absolute left-0 right-0 top-[72px] z-50">
          {activePanel === "menu" && (
            <MenuPanel
              onMouseEnter={handleMenuEnter}
              onMouseLeave={handleMenuLeave}
            />
          )}

          {activePanel === "search" && (
            <SearchPanel onClose={handlePanelClose} />
          )}

          <div
            className="fixed inset-0 top-[72px] -z-10 bg-black/30"
            onClick={handlePanelClose}
            aria-hidden
          />
        </div>
      )}
    </header>
  );
}
