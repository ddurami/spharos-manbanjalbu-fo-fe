const LEGACY_CONTENT_MAX_WIDTH = 1320;

/** 1320px 기준 디자인을 1280px 콘텐츠 너비에 맞춰 축소 */
const scale = (value: number) =>
  Math.round((value * 1280) / LEGACY_CONTENT_MAX_WIDTH);

export const LAYOUT = {
  contentMaxWidth: 1280,
  imageRadius: scale(12),
  sectionGap: scale(150),
  titleGap: scale(50),
} as const;

export const SELECTION = {
  circleDiameter: scale(190),
  firstRowCount: 5,
  /** 첫 번째 줄 space-between 기준 간격 (1280px 컨테이너, 5개 아이템) */
  get rowGap() {
    return (
      (LAYOUT.contentMaxWidth - this.firstRowCount * this.circleDiameter) /
      (this.firstRowCount - 1)
    );
  },
} as const;

/** 공통 콘텐츠 이미지 비율 (200 × 235) */
export const CONTENT_IMAGE_RATIO = scale(200) / scale(235);

export const HERO = {
  width: scale(1300),
  height: scale(600),
  gap: scale(50),
  autoplayInterval: 3000,
} as const;

export const POPULAR_CATEGORY = {
  large: { width: scale(365), height: scale(430) },
  small: { width: scale(238), height: scale(280) },
  itemsPerPage: 4,
  pageCount: 5,
  subtitleGap: scale(80),
} as const;

export const PRODUCT_IMAGE = {
  width: scale(200),
  height: scale(235),
  nameGap: scale(45),
} as const;

export const BEST_GRID = {
  itemsPerRow: 6,
  rowGap: scale(60),
  get columnGap() {
    return (
      (LAYOUT.contentMaxWidth - this.itemsPerRow * PRODUCT_IMAGE.width) /
      (this.itemsPerRow - 1)
    );
  },
} as const;

export function placeholderImage(
  seed: string,
  width: number,
  height: number,
): string {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}
