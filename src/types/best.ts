export type BestCategory =
  | "tumbler"
  | "mug"
  | "home-living"
  | "coffee"
  | "cake-bread"
  | "chocolate-snack"
  | "engraving"
  | "set";

export type PrimaryCategoryId = "all" | BestCategory;

export type ProductBadge = "BEST" | "NEW" | "SALE";

export type SortOption = "newest" | "recommended" | "price-asc" | "price-desc";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: BestCategory;
  subCategory: string;
  createdAt: string;
  recommendationScore: number;
  badges?: ProductBadge[];
  imageSrc?: string;
  alt?: string;
}

export interface BestCategoryItem {
  id: BestCategory;
  label: string;
}

export interface PrimaryCategoryItem {
  id: PrimaryCategoryId;
  label: string;
}

export interface SubCategoryItem {
  id: string;
  label: string;
}

export interface SortOptionItem {
  id: SortOption;
  label: string;
}

/** @deprecated Product 타입을 사용하세요 */
export type BestProduct = Product;
