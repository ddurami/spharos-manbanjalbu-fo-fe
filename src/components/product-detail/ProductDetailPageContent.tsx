"use client";

import { useState, useEffect, useMemo } from "react";
import { getProductDetail } from "@/lib/api/product";
import { getCategories } from "@/lib/api/category";
import { addRecentViewedItem } from "@/lib/recent-items/storage";
import { PageContainer } from "@/components/common/PageContainer";
import { ProductDetailHeader } from "@/components/product-detail/ProductDetailHeader";
import { ProductDetailTabs } from "@/components/product-detail/ProductDetailTabs";
import { ProductDetailImage } from "@/components/product-detail/ProductDetailImage";
import { ProductGuideAccordion } from "@/components/product-detail/ProductGuideAccordion";
import type { ProductDetail } from "@/types/product";
import type { Category } from "@/types/category";

export type CategoryBreadcrumb = {
  parentId: number;
  parentName: string;
  childId: number | null;
  childName: string | null;
};

function findCategoryBreadcrumb(
  categories: Category[],
  categoryName: string,
): CategoryBreadcrumb | null {
  for (const cat of categories) {
    for (const sub of cat.subcategories) {
      if (sub.name === categoryName) {
        return {
          parentId: cat.id,
          parentName: cat.name,
          childId: sub.id,
          childName: sub.name,
        };
      }
    }
    if (cat.name === categoryName) {
      return {
        parentId: cat.id,
        parentName: cat.name,
        childId: null,
        childName: null,
      };
    }
  }
  return null;
}

type ProductDetailPageContentProps = {
  productId: number;
};

export function ProductDetailPageContent({
  productId,
}: ProductDetailPageContentProps) {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState<"detail" | "guide">("detail");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getProductDetail(productId), getCategories()])
      .then(([productData, cats]) => {
        setProduct(productData);
        setCategories(cats);

        addRecentViewedItem({
          productId: productData.id,
          name: productData.name,
          price: productData.price,
          thumbnailUrl:
            productData.mediaList.find((m) => m.isMain)?.mediaUrl ?? "",
          isBest: productData.isBest,
          isNew: productData.isNew,
        });
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [productId]);

  const categoryBreadcrumb = useMemo(() => {
    if (!product) return null;
    return findCategoryBreadcrumb(categories, product.categoryName);
  }, [product, categories]);

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
      <ProductDetailHeader
        product={product}
        thumbnailUrl={thumbnail?.mediaUrl}
        categoryBreadcrumb={categoryBreadcrumb}
      />

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
