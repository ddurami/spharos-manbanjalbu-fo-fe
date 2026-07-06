import type { Metadata } from "next";

import { CartContent } from "@/components/cart/cart-content";

export const metadata: Metadata = {
  title: "장바구니 | 스타벅스",
  description: "스타벅스 온라인 스토어 장바구니",
};

export default function CartPage() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <CartContent />
    </div>
  );
}
