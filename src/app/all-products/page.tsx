import type { Metadata } from "next";
import { AllProductsPageContent } from "@/components/all-products/AllProductsPageContent";

export const metadata: Metadata = {
  title: "전체상품 | 스타벅스",
  description: "스타벅스 전체상품 리스트",
};

export default function AllProductsPage() {
  return <AllProductsPageContent />;
}
