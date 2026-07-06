"use client";

import { ChevronDownIcon } from "lucide-react";
import type { SortOption } from "@/types/best";
import { cn } from "@/lib/utils";
import { SORT_OPTIONS } from "@/constants/best-mock-data";

interface SortDropdownProps {
  selectedSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function SortDropdown({ selectedSort, onSortChange }: SortDropdownProps) {
  const selectedLabel =
    SORT_OPTIONS.find((option) => option.id === selectedSort)?.label ??
    "신상품순";

  return (
    <div className="group relative ml-auto w-fit">
      <button
        type="button"
        className="flex items-center gap-1 text-[16px] font-normal text-[#121212]"
        aria-haspopup="listbox"
        aria-expanded={false}
      >
        {selectedLabel}
        <ChevronDownIcon className="size-4 text-[#6c6c6c]" aria-hidden />
      </button>

      <ul
        role="listbox"
        aria-label="상품 정렬"
        className={cn(
          "absolute top-full right-0 z-10 mt-1 min-w-[140px] overflow-hidden rounded-md border border-[#e5e5e5] bg-white shadow-sm",
          "max-h-0 opacity-0 transition-all duration-300 ease-out",
          "group-hover:max-h-48 group-hover:opacity-100",
        )}
      >
        {SORT_OPTIONS.map((option) => (
          <li key={option.id} role="option" aria-selected={option.id === selectedSort}>
            <button
              type="button"
              onClick={() => onSortChange(option.id)}
              className={cn(
                "block w-full px-4 py-2.5 text-left text-[16px] transition-colors hover:bg-[#f5f5f5]",
                option.id === selectedSort
                  ? "font-medium text-[#00A864]"
                  : "font-normal text-[#121212]",
              )}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
