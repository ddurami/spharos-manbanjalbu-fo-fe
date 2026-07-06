import { LAYOUT } from "@/constants/image-sizes";

const LEGACY_CONTENT_MAX_WIDTH = 1320;

const scale = (value: number) =>
  Math.round((value * LAYOUT.contentMaxWidth) / LEGACY_CONTENT_MAX_WIDTH);

export const PRODUCT_DETAIL = {
  contentMaxWidth: LAYOUT.contentMaxWidth,
  infoWidth: scale(650),
  headerGap: scale(60),
  detailImageMaxHeight: scale(1500),
  detailImageHeight: scale(2400),
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
