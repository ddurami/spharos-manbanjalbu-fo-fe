import type { BestProduct } from "@/types/best";
import { BEST_GRID } from "@/constants/image-sizes";
import { BestProductCard } from "@/components/best/BestProductCard";
import { cn } from "@/lib/utils";

interface BestProductGridProps {
  products: BestProduct[];
}

function chunkProducts(products: BestProduct[], size: number): BestProduct[][] {
  const rows: BestProduct[][] = [];

  for (let i = 0; i < products.length; i += size) {
    rows.push(products.slice(i, i + size));
  }

  return rows;
}

export function BestProductGrid({ products }: BestProductGridProps) {
  const rows = chunkProducts(products, BEST_GRID.itemsPerRow);

  if (products.length === 0) {
    return (
      <p className="py-20 text-center text-[16px] text-[#6c6c6c]">
        해당 카테고리에 상품이 없습니다.
      </p>
    );
  }

  return (
    <div
      className="flex flex-col"
      style={{ gap: BEST_GRID.rowGap }}
    >
      {rows.map((row, rowIndex) => {
        const isFullRow = row.length === BEST_GRID.itemsPerRow;

        return (
          <ul
            key={rowIndex}
            className={cn(
              "flex w-full",
              isFullRow ? "justify-between" : "justify-start",
            )}
            style={
              isFullRow ? undefined : { gap: BEST_GRID.columnGap }
            }
          >
            {row.map((product) => (
              <li key={product.id}>
                <BestProductCard product={product} />
              </li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}
