"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { getProducts } from "@/lib/api/product";
import { getCategories, getSeasons } from "@/lib/api/category";
import { PageContainer } from "@/components/common/PageContainer";
import { ProductGrid } from "@/components/common/ProductGrid";
import {
  SortDropdown,
  PRODUCT_SORT_OPTIONS,
} from "@/components/common/SortDropdown";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import type { ProductListItem } from "@/types/product";
import type { Category, Season } from "@/types/category";

const PAGE_SIZE = 30;

const CAPACITY_OPTIONS = ["SHORT", "TALL", "GRANDE", "VENTI", "TRENTA"];

export function ProductsPageContent() {
  const searchParams = useSearchParams();
  const urlCategoryId = searchParams.get("categoryId");
  const urlSubcategoryId = searchParams.get("subcategoryId");
  const urlKeyword = searchParams.get("keyword") ?? "";

  const [categories, setCategories] = useState<Category[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    urlCategoryId ? Number(urlCategoryId) : null,
  );
  const [selectedSubcategoryIds, setSelectedSubcategoryIds] = useState<
    number[]
  >(urlSubcategoryId ? [Number(urlSubcategoryId)] : []);
  const [selectedSeasonId, setSelectedSeasonId] = useState<number | null>(null);
  const [selectedCapacities, setSelectedCapacities] = useState<string[]>([]);
  const [sort, setSort] = useState("RECOMMEND");
  const [keyword, setKeyword] = useState(urlKeyword);

  useEffect(() => {
    const newCategoryId = urlCategoryId ? Number(urlCategoryId) : null;
    const newSubcategoryId = urlSubcategoryId ? Number(urlSubcategoryId) : null;

    setSelectedCategoryId(newCategoryId);
    setSelectedSubcategoryIds(newSubcategoryId ? [newSubcategoryId] : []);
    setSelectedCapacities([]);
    setKeyword(urlKeyword);
  }, [urlCategoryId, urlSubcategoryId, urlKeyword]);

  useEffect(() => {
    Promise.all([getCategories(), getSeasons()])
      .then(([cats, seas]) => {
        setCategories(cats);
        setSeasons(seas);
      })
      .catch(() => {});
  }, []);

  const buildCategoryIds = useCallback(() => {
    if (selectedSubcategoryIds.length > 0) {
      return selectedSubcategoryIds;
    }
    if (selectedCategoryId != null) {
      const cat = categories.find((c) => c.id === selectedCategoryId);
      if (cat && cat.subcategories.length > 0) {
        return cat.subcategories.map((s) => s.id);
      }
      return [selectedCategoryId];
    }
    return undefined;
  }, [selectedCategoryId, selectedSubcategoryIds, categories]);

  const fetchProducts = useCallback(
    async (pageNum: number, append: boolean) => {
      setIsLoading(true);
      try {
        const categoryIds = buildCategoryIds();
        const data = await getProducts({
          categoryIds,
          seasonId: selectedSeasonId ?? undefined,
          capacities:
            selectedCapacities.length > 0 ? selectedCapacities : undefined,
          keyword: keyword || undefined,
          sort,
          page: pageNum,
          size: PAGE_SIZE,
        });

        setProducts((prev) =>
          append ? [...prev, ...data.products] : data.products,
        );
        setHasMore(pageNum < data.totalPages - 1);
        setPage(pageNum);
      } catch {
        if (!append) setProducts([]);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    },
    [buildCategoryIds, selectedSeasonId, selectedCapacities, keyword, sort],
  );

  useEffect(() => {
    fetchProducts(0, false);
  }, [fetchProducts]);

  const handleLoadMore = useCallback(() => {
    fetchProducts(page + 1, true);
  }, [fetchProducts, page]);

  const sentinelRef = useInfiniteScroll({
    hasMore,
    isLoading,
    onLoadMore: handleLoadMore,
  });

  const handleCategoryChange = (id: number | null) => {
    setSelectedCategoryId(id);
    setSelectedSubcategoryIds([]);
    setSelectedCapacities([]);
  };

  const handleSubcategoryToggle = (id: number) => {
    setSelectedSubcategoryIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  const handleCapacityToggle = (cap: string) => {
    setSelectedCapacities((prev) =>
      prev.includes(cap) ? prev.filter((v) => v !== cap) : [...prev, cap],
    );
  };

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);
  const availableCapacities = selectedCategory?.hasCapacityFilter
    ? CAPACITY_OPTIONS
    : [];

  const pageTitle = keyword ? `"${keyword}" 검색 결과` : "전체상품";

  return (
    <PageContainer className="py-8">
      <h1 className="text-3xl font-bold text-[#121212]">{pageTitle}</h1>

      <div className="mt-6">
        <CategoryFilter
          categories={categories}
          seasons={seasons}
          selectedCategoryId={selectedCategoryId}
          selectedSubcategoryIds={selectedSubcategoryIds}
          selectedSeasonId={selectedSeasonId}
          selectedCapacities={selectedCapacities}
          availableCapacities={availableCapacities}
          onCategoryChange={handleCategoryChange}
          onSubcategoryToggle={handleSubcategoryToggle}
          onSubcategoryClear={() => setSelectedSubcategoryIds([])}
          onSeasonChange={(id) => setSelectedSeasonId(id)}
          onCapacityToggle={handleCapacityToggle}
          onCapacityClear={() => setSelectedCapacities([])}
        />
      </div>

      <div className="mt-6 flex items-center justify-end">
        <SortDropdown
          options={PRODUCT_SORT_OPTIONS}
          value={sort}
          onChange={setSort}
        />
      </div>

      <div className="mt-4">
        <ProductGrid products={products} />
      </div>

      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="size-6 animate-spin rounded-full border-2 border-sb-green border-t-transparent" />
        </div>
      )}

      <div ref={sentinelRef} className="h-1" />
    </PageContainer>
  );
}
