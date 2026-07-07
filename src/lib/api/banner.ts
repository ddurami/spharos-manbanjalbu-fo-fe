import { apiRequest } from "@/lib/api/client";

export type BannerItem = {
  id: number;
  title: string;
  imageUrl: string;
  linkUrl: string;
  displayOrder: number;
};

export function getMainCarouselBanners() {
  return apiRequest<BannerItem[]>("/api/banners/main-carousel");
}
