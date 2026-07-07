import type { Metadata } from "next";
import { RecentItemsContent } from "@/components/recent-items/RecentItemsContent";

export const metadata: Metadata = {
  title: "최근 본 상품 | 스타벅스",
  description: "최근 본 상품 목록",
};

export default function RecentItemsPage() {
  return (
    <div className="min-h-full bg-white">
      <RecentItemsContent />
    </div>
  );
}
