export const LAYOUT = {
  contentMaxWidth: 1320,
  imageRadius: 12,
  sectionGap: 150,
  titleGap: 50,
} as const;

export const SELECTION = {
  circleDiameter: 190,
  firstRowCount: 5,
  /** 첫 번째 줄 space-between 기준 간격 (1320px 컨테이너, 5개 아이템) */
  rowGap:
    (LAYOUT.contentMaxWidth - 5 * 190) / 4,
} as const;

/** 공통 콘텐츠 이미지 비율 (200 × 235) */
export const CONTENT_IMAGE_RATIO = 200 / 235;

export const HERO = {
  width: 1300,
  height: 600,
  gap: 50,
  autoplayInterval: 3000,
} as const;

export const POPULAR_CATEGORY = {
  large: { width: 365, height: 430 },
  small: { width: 238, height: 280 },
  itemsPerPage: 4,
  pageCount: 5,
  subtitleGap: 80,
} as const;

export const PRODUCT_IMAGE = {
  width: 200,
  height: 235,
  nameGap: 45,
} as const;

export function placeholderImage(
  seed: string,
  width: number,
  height: number,
): string {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}
