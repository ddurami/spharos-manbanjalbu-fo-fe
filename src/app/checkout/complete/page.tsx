import type { Metadata } from "next";

import { CheckoutCompleteContent } from "@/components/checkout/checkout-complete-content";

export const metadata: Metadata = {
  title: "주문 완료 | Starbucks",
  description: "스타벅스 온라인 스토어 주문 완료",
};

export default function CheckoutCompletePage() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <CheckoutCompleteContent />
    </div>
  );
}
