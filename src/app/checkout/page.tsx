import type { Metadata } from "next";
import { Suspense } from "react";

import { CheckoutContent } from "@/components/checkout/checkout-content";

export const metadata: Metadata = {
  title: "결제하기 | Starbucks",
  description: "스타벅스 온라인 스토어 결제",
};

export default function CheckoutPage() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <Suspense
        fallback={
          <div className="flex flex-1 items-center justify-center py-20">
            <p className="text-base text-sb-text-muted">결제 정보를 불러오는 중...</p>
          </div>
        }
      >
        <CheckoutContent />
      </Suspense>
    </div>
  );
}
