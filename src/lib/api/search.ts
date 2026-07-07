import { apiRequest } from "@/lib/api/client";
import type { SearchHistory, RecommendedKeyword } from "@/types/search";

export function getSearchHistory() {
  return apiRequest<SearchHistory[]>("/api/search/history");
}

export function saveSearchHistory(keyword: string) {
  return apiRequest<SearchHistory>("/api/search/history", {
    method: "POST",
    body: JSON.stringify({ keyword }),
  });
}

export function deleteSearchHistoryItem(historyId: number) {
  return apiRequest<unknown>(`/api/search/history/${historyId}`, {
    method: "DELETE",
  });
}

export function deleteAllSearchHistory() {
  return apiRequest<unknown>("/api/search/history", {
    method: "DELETE",
  });
}

export function getRecommendedKeywords() {
  return apiRequest<RecommendedKeyword[]>("/api/search/recommended-keywords");
}
