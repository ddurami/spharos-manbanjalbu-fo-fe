import type { Metadata } from "next";

import { MypageOrderListContent } from "@/components/mypage/orders/mypage-order-list-content";

export const metadata: Metadata = {
  title: "주문내역 | 스타벅스",
  description: "스타벅스 주문내역",
};

export default function MypageOrdersPage() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <MypageOrderListContent />
    </div>
  );
}
