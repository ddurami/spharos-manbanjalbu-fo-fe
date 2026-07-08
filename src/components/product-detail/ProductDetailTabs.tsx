"use client";

import { cn } from "@/lib/utils";

type ProductDetailTabsProps = {
  activeTab: "detail" | "guide";
  onChange: (tab: "detail" | "guide") => void;
};

const TABS = [
  { id: "detail" as const, label: "상세정보" },
  { id: "guide" as const, label: "안내사항" },
];

export function ProductDetailTabs({
  activeTab,
  onChange,
}: ProductDetailTabsProps) {
  return (
    <div className="flex border-b border-sb-border">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            "flex-1 py-3 text-center text-sm font-medium transition-colors",
            activeTab === tab.id
              ? "border-b-2 border-[#121212] text-[#121212]"
              : "text-sb-text-muted",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
