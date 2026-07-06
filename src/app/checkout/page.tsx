import type { Metadata } from "next";

import { CheckoutContent } from "@/components/checkout/checkout-content";

export const metadata: Metadata = {
  title: "결제하기 | Starbucks",
  description: "스타벅스 온라인 스토어 결제",
};

export default function CheckoutPage() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <CheckoutContent />
    </div>
  );
}
