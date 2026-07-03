import Link from "next/link";
import type { Product } from "@/types/home";
import { PRODUCT_IMAGE } from "@/constants/image-sizes";
import { ImagePlaceholder, imageRadiusStyle } from "@/components/home/ImagePlaceholder";
import { ProductBadgeList } from "@/components/home/ProductBadge";
import { formatPrice } from "@/lib/format";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const content = (
    <div style={imageRadiusStyle}>
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
      <div
        style={{ height: PRODUCT_IMAGE.nameGap }}
        className="flex items-center"
      >
        {product.badges && product.badges.length > 0 && (
          <ProductBadgeList badges={product.badges} />
        )}
      </div>
      <h3 className="truncate text-sm text-foreground">{product.name}</h3>
      <p className="mt-1 text-sm font-bold text-foreground">
        {formatPrice(product.price)}
      </p>
    </div>
  );

  if (product.href) {
    return (
      <article className="group min-w-0">
        <Link
          href={product.href}
          className="block transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-starbucks-green focus-visible:ring-offset-2"
          aria-label={`${product.name}${product.badges?.length ? `, ${product.badges.join(", ")}` : ""}, ${formatPrice(product.price)}`}
        >
          {content}
        </Link>
      </article>
    );
  }

  return <article className="min-w-0">{content}</article>;
}
