"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type SortOption = {
  label: string;
  value: string;
};

type SortDropdownProps = {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function SortDropdown({
  options,
  value,
  onChange,
  className,
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedLabel =
    options.find((o) => o.value === value)?.label ?? options[0]?.label;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-sb-text-subtle"
      >
        {selectedLabel}
        <ChevronDownIcon
          className={cn(
            "size-4 transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>
      {isOpen && (
        <ul className="absolute right-0 top-full z-20 mt-1 min-w-[140px] rounded-lg border border-sb-border bg-white py-1 shadow-md">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full px-4 py-2 text-left text-sm",
                  option.value === value
                    ? "font-medium text-sb-green"
                    : "text-sb-text-secondary hover:bg-sb-surface",
                )}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const PRODUCT_SORT_OPTIONS: SortOption[] = [
  { label: "추천순", value: "RECOMMEND" },
  { label: "신상품순", value: "NEWEST" },
  { label: "낮은가격순", value: "PRICE_ASC" },
  { label: "높은가격순", value: "PRICE_DESC" },
];
