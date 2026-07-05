import type { Metadata } from "next";

import { CheckoutContent } from "@/components/checkout/checkout-content";

export const metadata: Metadata = {
  title: "결제하기 | Starbucks",
  description: "스타벅스 온라인 스토어 결제",
};

export default function CheckoutPage() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <div className="px-[50px] py-[50px] lg:px-[300px]">
        <h1 className="text-[36px] font-medium text-foreground">결제하기</h1>
      </div>

      <CheckoutContent />
    </div>
  );
}
