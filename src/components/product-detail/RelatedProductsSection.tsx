import Link from "next/link";
import { ALL_PRODUCTS } from "@/constants/best-mock-data";
import { BestProductCard } from "@/components/best/BestProductCard";

interface RelatedProductsSectionProps {
  relatedProductIds: string[];
}

export function RelatedProductsSection({
  relatedProductIds,
}: RelatedProductsSectionProps) {
  const relatedProducts = relatedProductIds
    .map((id) => ALL_PRODUCTS.find((product) => product.id === id))
    .filter((product) => product !== undefined);

  if (relatedProducts.length === 0) return null;

  return (
    <section aria-labelledby="related-products-heading" className="mt-20">
      <h2
        id="related-products-heading"
        className="mb-10 text-[24px] font-bold text-[#121212]"
      >
        관련 상품
      </h2>

      <ul className="flex w-full justify-between">
        {relatedProducts.map((product) => (
          <li key={product.id}>
            <Link
              href={`/products/${product.id}`}
              className="block transition-opacity hover:opacity-80"
            >
              <BestProductCard product={product} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
