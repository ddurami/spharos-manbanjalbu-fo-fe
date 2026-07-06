"use client";

import { useState } from "react";
import type { Product } from "@/types/best";
import { BEST_PRODUCTS } from "@/constants/best-mock-data";
import { PageContainer } from "@/components/layout/PageContainer";
import { DeleteAllButton } from "@/components/recent-items/DeleteAllButton";
import { BestProductGrid } from "@/components/best/BestProductGrid";

const INITIAL_RECENT_PRODUCTS = BEST_PRODUCTS.slice(0, 39);

export function RecentlyViewedPageContent() {
  const [products, setProducts] = useState<Product[]>(INITIAL_RECENT_PRODUCTS);

  const handleDeleteAll = () => {
    setProducts([]);
  };

  return (
    <div className="py-10">
      <PageContainer>
        <h1 className="text-[30px] font-normal text-[#121212]">최근 본 상품</h1>

        <div className="mt-[60px] mb-[30px]">
          <DeleteAllButton
            onDeleteAll={handleDeleteAll}
            disabled={products.length === 0}
          />
        </div>

        <BestProductGrid
          products={products}
          emptyMessage="최근 본 상품이 없습니다."
        />
      </PageContainer>
    </div>
  );
}
