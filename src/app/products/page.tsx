import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductsPageContent } from "@/components/products/ProductsPageContent";

export const metadata: Metadata = {
  title: "전체상품 | 스타벅스",
  description: "스타벅스 전체 상품을 만나보세요",
};

export default function ProductsPage() {
  return (
    <div className="min-h-full bg-white">
      <Suspense>
        <ProductsPageContent />
      </Suspense>
    </div>
  );
}
