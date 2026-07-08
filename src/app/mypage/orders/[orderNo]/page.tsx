import type { Metadata } from "next";

import { MypageOrderDetailPageContent } from "@/components/mypage/orders/mypage-order-detail-page-content";

export const metadata: Metadata = {
  title: "주문 상세 정보 | 스타벅스",
  description: "스타벅스 주문 상세 정보",
};

export default function MypageOrderDetailPage() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <MypageOrderDetailPageContent />
    </div>
  );
}
