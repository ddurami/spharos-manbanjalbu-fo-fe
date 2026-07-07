import { apiRequest } from "@/lib/api/client";
import type {
  ProductListResponse,
  ProductDetail,
  MainPageSeason,
  ProductListParams,
} from "@/types/product";

export function getProducts(params: ProductListParams = {}) {
  const searchParams = new URLSearchParams();

  if (params.categoryIds?.length) {
    searchParams.set("categoryIds", params.categoryIds.join(","));
  }
  if (params.seasonId != null) {
    searchParams.set("seasonId", String(params.seasonId));
  }
  if (params.minPrice != null) {
    searchParams.set("minPrice", String(params.minPrice));
  }
  if (params.maxPrice != null) {
    searchParams.set("maxPrice", String(params.maxPrice));
  }
  if (params.capacities?.length) {
    searchParams.set("capacities", params.capacities.join(","));
  }
  if (params.keyword) {
    searchParams.set("keyword", params.keyword);
  }
  if (params.sort) {
    searchParams.set("sort", params.sort);
  }
  if (params.page != null) {
    searchParams.set("page", String(params.page));
  }
  if (params.size != null) {
    searchParams.set("size", String(params.size));
  }

  const query = searchParams.toString();
  return apiRequest<ProductListResponse>(
    `/api/products${query ? `?${query}` : ""}`,
  );
}

export function getProductDetail(productId: number) {
  return apiRequest<ProductDetail>(`/api/products/${productId}`);
}

export function getMainPageProducts() {
  return apiRequest<MainPageSeason[]>("/api/products/main");
}
