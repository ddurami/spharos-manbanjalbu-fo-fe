const STORAGE_KEY = "recent-viewed-products";
const MAX_DAYS = 14;
const MAX_ITEMS = 20;

export type RecentViewedItem = {
  productId: number;
  name: string;
  price: number;
  thumbnailUrl: string;
  isBest: boolean;
  isNew: boolean;
  viewedAt: string;
};

export function getRecentViewedItems(): RecentViewedItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const items: RecentViewedItem[] = JSON.parse(raw);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - MAX_DAYS);

    return items.filter((item) => new Date(item.viewedAt) >= cutoff);
  } catch {
    return [];
  }
}

export function addRecentViewedItem(
  item: Omit<RecentViewedItem, "viewedAt">,
) {
  const items = getRecentViewedItems();
  const filtered = items.filter((i) => i.productId !== item.productId);

  const newItem: RecentViewedItem = {
    ...item,
    viewedAt: new Date().toISOString(),
  };

  const updated = [newItem, ...filtered].slice(0, MAX_ITEMS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event("recent-items-updated"));
}

export function clearRecentViewedItems() {
  localStorage.removeItem(STORAGE_KEY);
}
