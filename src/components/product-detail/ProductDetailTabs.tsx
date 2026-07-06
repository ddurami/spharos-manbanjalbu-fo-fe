"use client";

import type { ProductDetailTab } from "@/types/product-detail";
import { cn } from "@/lib/utils";

interface ProductDetailTabsProps {
  activeTab: ProductDetailTab;
  onTabChange: (tab: ProductDetailTab) => void;
}

const TABS: { id: ProductDetailTab; label: string }[] = [
  { id: "detail", label: "상세정보" },
  { id: "guide", label: "안내사항" },
];

export function ProductDetailTabs({
  activeTab,
  onTabChange,
}: ProductDetailTabsProps) {
  return (
    <div className="border-b border-[#e5e5e5]">
      <div className="flex gap-10">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "relative w-[220px] pb-4 text-[20px] transition-colors",
                isActive
                  ? "font-bold text-[#121212]"
                  : "font-normal text-[#6c6c6c]",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {tab.label}
              {isActive && (
                <span className="absolute right-0 bottom-0 left-0 h-[2px] bg-[#121212]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
