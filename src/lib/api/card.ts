import { apiRequest } from "@/lib/api/client";
import type { CardDetailResponse, CardResponse } from "@/types/card";

export function getCards() {
  return apiRequest<CardResponse[]>("/api/cards");
}

export function getCard(cardId: number) {
  return apiRequest<CardDetailResponse>(`/api/cards/${cardId}`);
}
