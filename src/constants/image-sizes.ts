export const LAYOUT = {
  contentMaxWidth: 1320,
  imageRadius: 12,
} as const;

export const PRODUCT_IMAGE = {
  width: 200,
  height: 235,
  nameGap: 45,
} as const;

export const BEST_GRID = {
  itemsPerRow: 6,
  rowGap: 60,
  get columnGap() {
    return (
      (LAYOUT.contentMaxWidth - this.itemsPerRow * PRODUCT_IMAGE.width) /
      (this.itemsPerRow - 1)
    );
  },
} as const;
