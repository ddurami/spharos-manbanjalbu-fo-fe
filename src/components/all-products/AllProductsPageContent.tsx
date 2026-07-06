"use client";

import { useEffect, useMemo, useState } from "react";
import type { PrimaryCategoryId, Product, SortOption } from "@/types/best";
import {
  ALL_PRODUCTS,
  ALL_SUB_CATEGORY_ID,
  getSubCategories,
} from "@/constants/best-mock-data";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/PageContainer";
import { PrimaryCategoryDropdown } from "@/components/all-products/PrimaryCategoryDropdown";
import { SubCategoryTabs } from "@/components/all-products/SubCategoryTabs";
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

export function AllProductsPageContent() {
  const [primaryCategory, setPrimaryCategory] =
    useState<PrimaryCategoryId>("all");
  const [subCategory, setSubCategory] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<SortOption>("newest");

  const subCategories = useMemo(() => {
    if (primaryCategory === "all") return [];
    return getSubCategories(primaryCategory);
  }, [primaryCategory]);

  useEffect(() => {
    if (subCategories.length === 0) {
      setSubCategory("");
      return;
    }

    setSubCategory((current) => {
      const isValid = subCategories.some((category) => category.id === current);
      return isValid ? current : subCategories[0].id;
    });
  }, [subCategories]);

  const filteredProducts = useMemo(() => {
    let products = ALL_PRODUCTS;

    if (primaryCategory !== "all") {
      products = products.filter(
        (product) => product.category === primaryCategory,
      );

      if (subCategory && subCategory !== ALL_SUB_CATEGORY_ID) {
        products = products.filter(
          (product) => product.subCategory === subCategory,
        );
      }
    }

    return sortProducts(products, selectedSort);
  }, [primaryCategory, subCategory, selectedSort]);

  return (
    <div className="py-10">
      <PageContainer>
        <PrimaryCategoryDropdown
          selectedCategory={primaryCategory}
          onCategoryChange={setPrimaryCategory}
        />

        <div className="mt-6">
          {subCategories.length > 0 ? (
            <SubCategoryTabs
              categories={subCategories}
              selectedCategory={subCategory}
              onCategoryChange={setSubCategory}
            />
          ) : (
            <div className="h-[48px]" aria-hidden />
          )}
        </div>
      </PageContainer>

      <div
        className={cn(
          "h-[1.5px] w-full",
          subCategories.length > 0 ? "bg-[#b9b9b9]" : "bg-transparent",
        )}
        aria-hidden
      />

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
