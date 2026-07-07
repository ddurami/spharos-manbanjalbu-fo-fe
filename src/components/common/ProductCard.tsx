import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { ProductBadgeList } from "@/components/common/ProductBadge";
import type { ProductListItem } from "@/types/product";

type ProductCardProps = {
  product: ProductListItem;
  rank?: number;
  className?: string;
};

export function ProductCard({ product, rank, className }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className={cn("group flex flex-col", className)}
    >
      <div className="relative aspect-square overflow-hidden rounded-image bg-placeholder">
        <ImagePlaceholder
          src={product.thumbnailUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
        {rank != null && (
          <span className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-md bg-sb-green text-xs font-bold text-white">
            {rank}
          </span>
        )}
      </div>
      <div className="mt-2 flex flex-col gap-0.5">
        <div className="h-[18px]">
          <ProductBadgeList isBest={product.isBest} isNew={product.isNew} />
        </div>
        <p className="text-sm leading-snug text-[#121212] line-clamp-2">
          {product.name}
        </p>
        <p className="text-sm font-bold text-[#121212]">
          {formatPrice(product.price)}
          <span className="font-normal">원</span>
        </p>
      </div>
    </Link>
  );
}
