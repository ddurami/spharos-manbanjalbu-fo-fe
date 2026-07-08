export type ProductListItem = {
  id: number;
  name: string;
  price: number;
  thumbnailUrl: string;
  isBest: boolean;
  isNew: boolean;
};

export type ProductListResponse = {
  products: ProductListItem[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  availableCategoryIds: number[];
};

export type ProductMedia = {
  id: number;
  mediaType: string;
  mediaUrl: string;
  displayOrder: number;
  isMain: boolean;
};

export type ProductPolicy = {
  title: string;
  deliveryInfo: string;
  exchangeInfo: string;
  refundInfo: string;
};

export type ProductDetail = {
  id: number;
  name: string;
  shortDescription: string;
  price: number;
  saleType: string;
  capacity: string | null;
  isBest: boolean;
  isNew: boolean;
  categoryName: string;
  seasonName: string | null;
  mediaList: ProductMedia[];
  policy: ProductPolicy;
};

export type MainPageSeason = {
  seasonId: number;
  seasonName: string;
  products: ProductListItem[];
};

export type ProductListParams = {
  categoryIds?: number[];
  seasonId?: number;
  minPrice?: number;
  maxPrice?: number;
  capacities?: string[];
  keyword?: string;
  sort?: string;
  page?: number;
  size?: number;
};
