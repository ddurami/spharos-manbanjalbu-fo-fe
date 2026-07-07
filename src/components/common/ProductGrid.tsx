import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/common/ProductCard";
import type { ProductListItem } from "@/types/product";

type ProductGridProps = {
  products: ProductListItem[];
  rankStart?: number;
  className?: string;
  emptyMessage?: string;
};

export function ProductGrid({
  products,
  rankStart,
  className,
  emptyMessage = "상품이 없습니다.",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center text-sm text-sb-text-muted">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
        className,
      )}
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          rank={rankStart != null ? rankStart + index : undefined}
        />
      ))}
    </div>
  );
}
