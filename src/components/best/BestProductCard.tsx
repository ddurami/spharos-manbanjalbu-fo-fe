import Link from "next/link";
import type { BestProduct } from "@/types/best";
import { PRODUCT_IMAGE } from "@/constants/image-sizes";
import {
  ImagePlaceholder,
  imageRadiusStyle,
} from "@/components/home/ImagePlaceholder";
import { ProductBadgeList } from "@/components/home/ProductBadge";
import { formatPrice } from "@/lib/format";

interface BestProductCardProps {
  product: BestProduct;
}

export function BestProductCard({ product }: BestProductCardProps) {
  return (
    <article className="min-w-0" style={{ width: PRODUCT_IMAGE.width }}>
      <div style={imageRadiusStyle}>
        <Link
          href={`/products/${product.id}`}
          className="block transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-starbucks-green focus-visible:ring-offset-2"
          aria-label={`${product.name} 상세 페이지`}
        >
          <div
            className="relative shrink-0 overflow-hidden"
            style={{
              width: PRODUCT_IMAGE.width,
              height: PRODUCT_IMAGE.height,
            }}
          >
            <ImagePlaceholder
              alt={product.alt ?? product.name}
              src={product.imageSrc}
              rounded="content"
              className="size-full"
            />
          </div>
        </Link>
        <div
          style={{ height: PRODUCT_IMAGE.nameGap }}
          className="flex items-center"
        >
          {product.badges && product.badges.length > 0 && (
            <ProductBadgeList badges={product.badges} />
          )}
        </div>
        <h3 className="truncate text-[16px] font-normal text-[#121212]">
          {product.name}
        </h3>
        <p className="mt-1 text-[16px] font-bold text-[#121212]">
          {formatPrice(product.price)}
        </p>
      </div>
    </article>
  );
}
