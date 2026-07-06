import type { SubCategoryItem } from "@/types/best";
import { cn } from "@/lib/utils";

interface SubCategoryTabsProps {
  categories: SubCategoryItem[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function SubCategoryTabs({
  categories,
  selectedCategory,
  onCategoryChange,
}: SubCategoryTabsProps) {
  if (categories.length === 0) return null;

  return (
    <nav aria-label="2차 카테고리">
      <ul className="flex flex-wrap gap-[30px]">
        {categories.map((category) => {
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
