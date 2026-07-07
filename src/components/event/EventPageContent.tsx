"use client";

import { useState, useEffect, useCallback } from "react";
import { getProducts } from "@/lib/api/product";
import { getSeasons } from "@/lib/api/category";
import { PageContainer } from "@/components/common/PageContainer";
import { ProductGrid } from "@/components/common/ProductGrid";
import {
  SortDropdown,
  PRODUCT_SORT_OPTIONS,
} from "@/components/common/SortDropdown";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { cn } from "@/lib/utils";
import type { ProductListItem } from "@/types/product";
import type { Season } from "@/types/category";

const PAGE_SIZE = 30;

export function EventPageContent() {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeasonId, setSelectedSeasonId] = useState<number | null>(null);
  const [sort, setSort] = useState("RECOMMEND");
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getSeasons()
      .then(setSeasons)
      .catch(() => {});
  }, []);

  const fetchProducts = useCallback(
    async (pageNum: number, append: boolean) => {
      setIsLoading(true);
      try {
        const data = await getProducts({
          seasonId: selectedSeasonId ?? undefined,
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
    [selectedSeasonId, sort],
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

  return (
    <PageContainer className="py-8">
      <h1 className="text-3xl font-bold text-[#121212]">EVENT</h1>

      <div className="mt-6 flex items-center gap-1">
        <button
          type="button"
          onClick={() => setSelectedSeasonId(null)}
          className={cn(
            "shrink-0 border-b-2 px-4 pb-2.5 text-lg font-medium transition-colors",
            selectedSeasonId === null
              ? "border-sb-green text-sb-green"
              : "border-transparent text-sb-text-muted hover:text-sb-text-secondary",
          )}
        >
          전체
        </button>
        {seasons.map((season) => (
          <button
            key={season.id}
            type="button"
            onClick={() => setSelectedSeasonId(season.id)}
            className={cn(
              "shrink-0 border-b-2 px-4 pb-2.5 text-lg font-medium transition-colors",
              selectedSeasonId === season.id
                ? "border-sb-green text-sb-green"
                : "border-transparent text-sb-text-muted hover:text-sb-text-secondary",
            )}
          >
            {season.name}
          </button>
        ))}
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
