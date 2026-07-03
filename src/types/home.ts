export interface HeroSlide {
  id: string;
  alt: string;
  imageSrc?: string;
}

export interface SelectionItem {
  id: string;
  label: string;
  href: string;
  imageSrc?: string;
}

export interface PopularCategory {
  id: string;
  label?: string;
  alt: string;
  imageSrc?: string;
  featured?: boolean;
}

export type ProductBadge = "BEST" | "NEW" | "SALE";

export interface Product {
  id: string;
  name: string;
  price: number;
  imageSrc?: string;
  alt?: string;
  href?: string;
  badges?: ProductBadge[];
}

export interface ProductCategorySection {
  id: string;
  title: string;
  products: Product[];
}
