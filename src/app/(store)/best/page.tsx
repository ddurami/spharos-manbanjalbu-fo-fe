import type { Metadata } from "next";
import { BestPageContent } from "@/components/best/BestPageContent";

export const metadata: Metadata = {
  title: "BEST | 스타벅스",
  description: "스타벅스 BEST 상품 리스트",
};

export default function BestPage() {
  return (
    <div className="min-h-full bg-white">
      <BestPageContent />
    </div>
  );
}
