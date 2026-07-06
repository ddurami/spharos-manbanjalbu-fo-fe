import type { BestCategory } from "@/types/best";
import { cn } from "@/lib/utils";
import { BEST_CATEGORIES } from "@/constants/best-mock-data";

interface CategoryTabsProps {
  selectedCategory: BestCategory;
  onCategoryChange: (category: BestCategory) => void;
}

export function CategoryTabs({
  selectedCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <nav aria-label="1차 카테고리">
      <ul className="flex flex-wrap gap-[30px]">
        {BEST_CATEGORIES.map((category) => {
          const isSelected = category.id === selectedCategory;

          return (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  "px-[6px] py-[14px] text-[20px] leading-none transition-colors",
                  isSelected
                    ? "font-medium text-[#00A864]"
                    : "font-normal text-[#6c6c6c]",
                )}
                aria-current={isSelected ? "page" : undefined}
              >
                {category.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
