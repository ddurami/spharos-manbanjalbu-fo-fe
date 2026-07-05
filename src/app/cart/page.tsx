import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "장바구니 | 스타벅스",
  description: "스타벅스 장바구니",
};

export default function CartPage() {
  return (
    <div className="min-h-full bg-white py-10">
      <PageContainer>
        <h1 className="text-[30px] font-normal text-[#121212]">장바구니</h1>
      </PageContainer>
    </div>
  );
}
