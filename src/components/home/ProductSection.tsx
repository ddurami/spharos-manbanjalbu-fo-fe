import type { ProductCategorySection } from "@/types/home";
import { PRODUCT_IMAGE } from "@/constants/image-sizes";
import { PageContainer } from "@/components/layout/PageContainer";
import { ProductCard } from "@/components/home/ProductCard";
import { HomeSection, SectionHeading } from "@/components/home/SectionLayout";

interface ProductSectionProps {
  section: ProductCategorySection;
}

export function ProductSection({ section }: ProductSectionProps) {
  const headingId = `product-section-${section.id}`;

  return (
    <HomeSection aria-labelledby={headingId}>
      <PageContainer>
        <SectionHeading id={headingId} size="secondary">
          {section.title}
        </SectionHeading>
        <ul className="hidden w-full justify-between lg:flex">
          {section.products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
        <ul className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:hidden">
          {section.products.map((product) => (
            <li key={product.id} className="flex justify-center">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </PageContainer>
    </HomeSection>
  );
}
