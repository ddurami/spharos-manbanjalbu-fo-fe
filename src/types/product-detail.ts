export type ProductDetailTab = "detail" | "guide";

export interface ProductGuideSection {
  id: string;
  title: string;
  content: string[];
}

export interface ProductDetail {
  id: string;
  name: string;
  description: string;
  origin: string;
  price: number;
  thumbnailSrc?: string;
  detailImageSrc?: string;
  guideSections: ProductGuideSection[];
  relatedProductIds: string[];
}
