import { Dancing_Script } from "next/font/google";
import type { ProductBadge as ProductBadgeType } from "@/types/best";
import { cn } from "@/lib/utils";

const scriptFont = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface ProductBadgeProps {
  badges: ProductBadgeType[];
  className?: string;
}

const BADGE_LABELS: Record<ProductBadgeType, string> = {
  BEST: "Best",
  NEW: "New",
  SALE: "Sale",
};

const BADGE_COLORS: Record<ProductBadgeType, string> = {
  BEST: "text-[#FF5452]",
  NEW: "text-[#00A864]",
  SALE: "text-[#FF5452]",
};

export function ProductBadgeList({ badges, className }: ProductBadgeProps) {
  if (badges.length === 0) return null;

  return (
    <ul
      className={cn("flex flex-wrap gap-3", className)}
      aria-label="상품 뱃지"
    >
      {badges.map((badge) => (
        <li key={badge}>
          <span
            className={cn(
              scriptFont.className,
              "text-[14px] leading-none",
              BADGE_COLORS[badge],
            )}
          >
            {BADGE_LABELS[badge]}
          </span>
        </li>
      ))}
    </ul>
  );
}
