"use client";

import { useState } from "react";
import type { ProductDetail, ProductDetailTab } from "@/types/product-detail";
import { PageContainer } from "@/components/layout/PageContainer";
import { ProductDetailHeader } from "@/components/product-detail/ProductDetailHeader";
import { ProductDetailTabs } from "@/components/product-detail/ProductDetailTabs";
import { ProductDetailImage } from "@/components/product-detail/ProductDetailImage";
import { ProductGuideAccordion } from "@/components/product-detail/ProductGuideAccordion";
import { RelatedProductsSection } from "@/components/product-detail/RelatedProductsSection";

interface ProductDetailPageContentProps {
  product: ProductDetail;
}

export function ProductDetailPageContent({
  product,
}: ProductDetailPageContentProps) {
  const [activeTab, setActiveTab] = useState<ProductDetailTab>("detail");

  return (
    <main className="py-10">
      <PageContainer>
        <ProductDetailHeader product={product} />

        <div className="mt-16">
          <ProductDetailTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="mt-10">
          {activeTab === "detail" ? (
            <ProductDetailImage
              imageSrc={product.detailImageSrc}
              alt={`${product.name} 상세 정보`}
            />
          ) : (
            <ProductGuideAccordion sections={product.guideSections} />
          )}
        </div>

        <RelatedProductsSection relatedProductIds={product.relatedProductIds} />
      </PageContainer>
    </main>
  );
}
