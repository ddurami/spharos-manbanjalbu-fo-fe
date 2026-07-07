"use client";

import { useState, useEffect } from "react";
import { getProductDetail } from "@/lib/api/product";
import { addRecentViewedItem } from "@/lib/recent-items/storage";
import { PageContainer } from "@/components/common/PageContainer";
import { ProductDetailHeader } from "@/components/product-detail/ProductDetailHeader";
import { ProductDetailTabs } from "@/components/product-detail/ProductDetailTabs";
import { ProductDetailImage } from "@/components/product-detail/ProductDetailImage";
import { ProductGuideAccordion } from "@/components/product-detail/ProductGuideAccordion";
import type { ProductDetail } from "@/types/product";

type ProductDetailPageContentProps = {
  productId: number;
};

export function ProductDetailPageContent({
  productId,
}: ProductDetailPageContentProps) {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [activeTab, setActiveTab] = useState<"detail" | "guide">("detail");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getProductDetail(productId)
      .then((data) => {
        setProduct(data);

        addRecentViewedItem({
          productId: data.id,
          name: data.name,
          price: data.price,
          thumbnailUrl:
            data.mediaList.find((m) => m.isMain)?.mediaUrl ?? "",
          isBest: data.isBest,
          isNew: data.isNew,
        });
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [productId]);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-sb-green border-t-transparent" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sb-text-muted">상품을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const thumbnail = product.mediaList.find((m) => m.isMain);
  const detailImages = product.mediaList.filter(
    (m) => m.mediaType === "DETAIL_IMAGE",
  );

  return (
    <div className="py-8">
      <ProductDetailHeader product={product} thumbnailUrl={thumbnail?.mediaUrl} />

      <PageContainer className="mt-10">
        <ProductDetailTabs activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === "detail" ? (
          <div className="mt-6">
            <ProductDetailImage images={detailImages} />
          </div>
        ) : (
          <div className="mt-6">
            <ProductGuideAccordion policy={product.policy} />
          </div>
        )}
      </PageContainer>
    </div>
  );
}
