export const PRODUCT_DETAIL = {
  contentMaxWidth: 1320,
  infoWidth: 650,
  headerGap: 60,
  detailImageMaxHeight: 1500,
  detailImageHeight: 2400,
  detailImageDisplayWidth: 1000,
  get detailImageDisplayHeight() {
    return Math.round(
      (this.detailImageHeight * this.detailImageDisplayWidth) /
        this.contentMaxWidth,
    );
  },
  relatedProductsCount: 6,
  get thumbnailSize() {
    return this.contentMaxWidth - this.infoWidth - this.headerGap;
  },
} as const;
