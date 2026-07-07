import { apiRequest } from "@/lib/api/client";
import type { Category, Season } from "@/types/category";

export function getCategories() {
  return apiRequest<Category[]>("/api/categories");
}

export function getSeasons() {
  return apiRequest<Season[]>("/api/seasons");
}
