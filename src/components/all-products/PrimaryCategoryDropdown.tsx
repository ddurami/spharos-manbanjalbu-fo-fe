"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import type { PrimaryCategoryId } from "@/types/best";
import { cn } from "@/lib/utils";
import { PRIMARY_CATEGORIES } from "@/constants/best-mock-data";

interface PrimaryCategoryDropdownProps {
  selectedCategory: PrimaryCategoryId;
  onCategoryChange: (category: PrimaryCategoryId) => void;
}

export function PrimaryCategoryDropdown({
  selectedCategory,
  onCategoryChange,
}: PrimaryCategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLabel =
    PRIMARY_CATEGORIES.find((category) => category.id === selectedCategory)
      ?.label ?? "전체상품";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-fit">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 text-[30px] font-normal leading-none text-[#121212]"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="1차 카테고리 선택"
      >
        {selectedLabel}
        <ChevronDownIcon
          className={cn(
            "size-5 text-[#6c6c6c] transition-transform duration-300",
            isOpen && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      <ul
        role="listbox"
        aria-label="1차 카테고리"
        className={cn(
          "absolute top-full left-0 z-20 mt-2 min-w-[180px] overflow-hidden rounded-md border border-[#e5e5e5] bg-white shadow-sm",
          "transition-all duration-300 ease-out",
          isOpen
            ? "max-h-96 opacity-100"
            : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        {PRIMARY_CATEGORIES.map((category) => (
          <li
            key={category.id}
            role="option"
            aria-selected={category.id === selectedCategory}
          >
            <button
              type="button"
              onClick={() => {
                onCategoryChange(category.id);
                setIsOpen(false);
              }}
              className={cn(
                "block w-full px-4 py-3 text-left text-[20px] transition-colors hover:bg-[#f5f5f5]",
                category.id === selectedCategory
                  ? "font-medium text-[#00A864]"
                  : "font-normal text-[#121212]",
              )}
            >
              {category.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
