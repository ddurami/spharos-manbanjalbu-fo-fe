"use client";

import { useState, useEffect, useCallback } from "react";
import { getProducts } from "@/lib/api/product";
import { getCategories } from "@/lib/api/category";
import { PageContainer } from "@/components/common/PageContainer";
import { ProductGrid } from "@/components/common/ProductGrid";
import { cn } from "@/lib/utils";
import type { ProductListItem } from "@/types/product";
import type { Category } from "@/types/category";

const BEST_SIZE = 30;

export function BestPageContent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  const buildCategoryIds = useCallback(() => {
    if (selectedCategoryId == null) return undefined;
    const cat = categories.find((c) => c.id === selectedCategoryId);
    if (cat && cat.subcategories.length > 0) {
      return cat.subcategories.map((s) => s.id);
    }
    return [selectedCategoryId];
  }, [selectedCategoryId, categories]);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getProducts({
        categoryIds: buildCategoryIds(),
        sort: "BEST_SELLING",
        page: 0,
        size: BEST_SIZE,
      });
      setProducts(data.products);
    } catch {
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [buildCategoryIds]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <PageContainer className="py-8">
      <h1 className="text-3xl font-bold text-[#121212]">BEST</h1>

      <div className="mt-6 flex items-center gap-1">
        <button
          type="button"
          onClick={() => setSelectedCategoryId(null)}
          className={cn(
            "shrink-0 border-b-2 px-4 pb-2.5 text-lg font-medium transition-colors",
            selectedCategoryId === null
              ? "border-sb-green text-sb-green"
              : "border-transparent text-sb-text-muted hover:text-sb-text-secondary",
          )}
        >
          전체
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategoryId(cat.id)}
            className={cn(
              "shrink-0 border-b-2 px-4 pb-2.5 text-lg font-medium transition-colors",
              selectedCategoryId === cat.id
                ? "border-sb-green text-sb-green"
                : "border-transparent text-sb-text-muted hover:text-sb-text-secondary",
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <ProductGrid products={products} rankStart={1} />
      </div>

      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="size-6 animate-spin rounded-full border-2 border-sb-green border-t-transparent" />
        </div>
      )}
    </PageContainer>
  );
}
