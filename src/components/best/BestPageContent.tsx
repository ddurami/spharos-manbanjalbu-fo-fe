"use client";

import { useMemo, useState } from "react";
import type { BestCategory, Product, SortOption } from "@/types/best";
import { BEST_CATEGORIES, BEST_PRODUCTS } from "@/constants/best-mock-data";
import { PageContainer } from "@/components/layout/PageContainer";
import { CategoryTabs } from "@/components/best/CategoryTabs";
import { SortDropdown } from "@/components/best/SortDropdown";
import { BestProductGrid } from "@/components/best/BestProductGrid";

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];

  switch (sort) {
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    case "recommended":
      return sorted.sort(
        (a, b) => b.recommendationScore - a.recommendationScore,
      );
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    default:
      return sorted;
  }
}

export function BestPageContent() {
  const [selectedCategory, setSelectedCategory] =
    useState<BestCategory>("tumbler");
  const [selectedSort, setSelectedSort] = useState<SortOption>("newest");

  const filteredProducts = useMemo(() => {
    const categoryProducts = BEST_PRODUCTS.filter(
      (product) => product.category === selectedCategory,
    );

    return sortProducts(categoryProducts, selectedSort);
  }, [selectedCategory, selectedSort]);

  return (
    <div className="py-10">
      <PageContainer>
        <h1 className="text-[30px] font-normal text-[#121212]">BEST</h1>

        <div className="mt-6">
          <CategoryTabs
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </PageContainer>

      <div className="h-[1.5px] w-full bg-[#b9b9b9]" aria-hidden />

      <PageContainer className="mt-[30px]">
        <SortDropdown
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
        />

        <div className="mt-5">
          <BestProductGrid products={filteredProducts} />
        </div>
      </PageContainer>
    </div>
  );
}
