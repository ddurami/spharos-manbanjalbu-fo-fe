"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowUpIcon, ClockIcon } from "lucide-react";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { getRecentViewedItems } from "@/lib/recent-items/storage";

export function RecentItemsFloating() {
  const [latestItem, setLatestItem] = useState<{
    thumbnailUrl: string;
    name: string;
  } | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const refresh = useCallback(() => {
    const items = getRecentViewedItems();
    if (items.length > 0) {
      setLatestItem({
        thumbnailUrl: items[0].thumbnailUrl,
        name: items[0].name,
      });
    } else {
      setLatestItem(null);
    }
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("recent-items-updated", refresh);
    return () => window.removeEventListener("recent-items-updated", refresh);
  }, [refresh]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col items-center gap-3">
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="flex size-[52px] items-center justify-center rounded-full border border-sb-border bg-white shadow-lg hover:shadow-xl"
          aria-label="맨 위로"
        >
          <ArrowUpIcon className="size-5 text-sb-text-muted" />
        </button>
      )}

      <Link
        href="/recent-items"
        className="relative flex size-[52px] items-center justify-center overflow-hidden rounded-full border border-sb-border bg-white shadow-lg hover:shadow-xl"
        aria-label="최근 본 상품"
      >
        {latestItem ? (
          <ImagePlaceholder
            src={latestItem.thumbnailUrl}
            alt={latestItem.name}
            width={52}
            height={52}
            className="size-full object-cover"
          />
        ) : (
          <ClockIcon className="size-5 text-sb-text-muted" />
        )}
      </Link>
    </div>
  );
}
