export const PRODUCT_DETAIL = {
  contentMaxWidth: 1320,
  infoWidth: 650,
  headerGap: 60,
  detailImageMaxHeight: 1500,
  relatedProductsCount: 6,
  get thumbnailSize() {
    return this.contentMaxWidth - this.infoWidth - this.headerGap;
  },
} as const;
