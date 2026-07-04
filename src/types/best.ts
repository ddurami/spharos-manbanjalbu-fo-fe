export type BestCategory =
  | "tumbler"
  | "mug"
  | "home-living"
  | "coffee"
  | "cake-bread"
  | "chocolate-snack"
  | "engraving"
  | "set";

export type ProductBadge = "BEST" | "NEW" | "SALE";

export type SortOption = "newest" | "recommended" | "price-asc" | "price-desc";

export interface BestProduct {
  id: string;
  name: string;
  price: number;
  category: BestCategory;
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

export interface SortOptionItem {
  id: SortOption;
  label: string;
}
