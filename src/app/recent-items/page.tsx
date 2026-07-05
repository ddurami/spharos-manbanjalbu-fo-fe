import type { Metadata } from "next";
import { RecentlyViewedPageContent } from "@/components/recent-items/RecentlyViewedPageContent";

export const metadata: Metadata = {
  title: "최근 본 상품 | 스타벅스",
  description: "스타벅스 최근 본 상품 리스트",
};

export default function RecentItemsPage() {
  return (
    <div className="min-h-full bg-white">
      <RecentlyViewedPageContent />
    </div>
  );
}
