import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPageContent } from "@/components/product-detail/ProductDetailPageContent";
import {
  getAllProductDetailIds,
  getProductDetail,
} from "@/constants/product-detail-mock-data";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAllProductDetailIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductDetail(id);

  if (!product) {
    return { title: "상품을 찾을 수 없습니다" };
  }

  return {
    title: `${product.name} | 스타벅스`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = getProductDetail(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-full bg-white">
      <ProductDetailPageContent product={product} />
    </div>
  );
}
