"use client";

import { useState, useEffect, useMemo } from "react";
import { TrashIcon } from "lucide-react";
import { PageContainer } from "@/components/common/PageContainer";
import { ProductGrid } from "@/components/common/ProductGrid";
import {
  getRecentViewedItems,
  clearRecentViewedItems,
  type RecentViewedItem,
} from "@/lib/recent-items/storage";

function groupByDate(items: RecentViewedItem[]) {
  const groups = new Map<string, RecentViewedItem[]>();

  for (const item of items) {
    const date = new Date(item.viewedAt);
    const key = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;

    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(item);
  }

  return Array.from(groups.entries());
}

export function RecentItemsContent() {
  const [items, setItems] = useState<RecentViewedItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setItems(getRecentViewedItems());
    setIsLoaded(true);
  }, []);

  const grouped = useMemo(() => groupByDate(items), [items]);

  const handleClearAll = () => {
    clearRecentViewedItems();
    setItems([]);
  };

  if (!isLoaded) return null;

  return (
    <PageContainer className="py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#121212]">최근 본 상품</h1>
        {items.length > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="flex items-center gap-1 text-sm text-sb-text-muted hover:text-sb-text-secondary"
          >
            <TrashIcon className="size-4" />
            전체 삭제
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex min-h-[300px] items-center justify-center text-sm text-sb-text-muted">
          최근 본 상품이 없습니다.
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-10">
          {grouped.map(([date, dateItems]) => (
            <section key={date}>
              <h2 className="text-sm font-medium text-sb-text-muted">
                {date}
              </h2>
              <div className="mt-3">
                <ProductGrid
                  products={dateItems.map((item) => ({
                    id: item.productId,
                    name: item.name,
                    price: item.price,
                    thumbnailUrl: item.thumbnailUrl,
                    isBest: item.isBest,
                    isNew: item.isNew,
                  }))}
                />
              </div>
            </section>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
