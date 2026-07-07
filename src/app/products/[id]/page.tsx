import type { Metadata } from "next";
import { ProductDetailPageContent } from "@/components/product-detail/ProductDetailPageContent";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `상품 상세 | 스타벅스`,
    description: `스타벅스 상품 ${id} 상세 정보`,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;

  return (
    <div className="min-h-full bg-white">
      <ProductDetailPageContent productId={Number(id)} />
    </div>
  );
}
