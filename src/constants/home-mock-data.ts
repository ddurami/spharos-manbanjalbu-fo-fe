import type {
  HeroSlide,
  PopularCategory,
  ProductCategorySection,
  SelectionItem,
} from "@/types/home";
import { STARBUCKS_IMAGES } from "@/constants/starbucks-images";

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "hero-1",
    alt: "스타벅스 시그니처 커피 프로모션",
    imageSrc: STARBUCKS_IMAGES.hero.banner1,
  },
  {
    id: "hero-2",
    alt: "스타벅스 핸드드립 커피 프로모션",
    imageSrc: STARBUCKS_IMAGES.hero.banner2,
  },
  {
    id: "hero-3",
    alt: "스타벅스 매장 분위기 프로모션",
    imageSrc: STARBUCKS_IMAGES.hero.banner3,
  },
  {
    id: "hero-4",
    alt: "스타벅스 원두 및 음료 프로모션",
    imageSrc: STARBUCKS_IMAGES.hero.banner4,
  },
];

export const SELECTION_ITEMS: SelectionItem[] = [
  {
    id: "all",
    label: "전체 상품",
    href: "/products",
    imageSrc: STARBUCKS_IMAGES.selection.all,
  },
  {
    id: "best",
    label: "BEST",
    href: "/products/best",
    imageSrc: STARBUCKS_IMAGES.selection.best,
  },
  {
    id: "season",
    label: "이번 시즌",
    href: "/products/season",
    imageSrc: STARBUCKS_IMAGES.selection.season,
  },
  {
    id: "online",
    label: "온라인 전용",
    href: "/products/online-exclusive",
    imageSrc: STARBUCKS_IMAGES.selection.online,
  },
  {
    id: "sale",
    label: "SALE",
    href: "/products/sale",
    imageSrc: STARBUCKS_IMAGES.selection.sale,
  },
  {
    id: "stanley",
    label: "스탠리 콜라보",
    href: "/products/stanley",
    imageSrc: STARBUCKS_IMAGES.selection.stanley,
  },
  {
    id: "food",
    label: "스타벅스 푸드",
    href: "/products/food",
    imageSrc: STARBUCKS_IMAGES.selection.food,
  },
  {
    id: "gift",
    label: "테마별 선물",
    href: "/products/gift",
    imageSrc: STARBUCKS_IMAGES.selection.gift,
  },
];

export const POPULAR_CATEGORIES: PopularCategory[] = [
  {
    id: "featured-1",
    alt: "스타벅스 매장 추천 카테고리",
    imageSrc: STARBUCKS_IMAGES.popular.featured1,
  },
  {
    id: "daily-umbrella",
    label: "데일리 장우산",
    alt: "데일리 장우산 카테고리",
    imageSrc: STARBUCKS_IMAGES.popular.umbrella,
  },
  {
    id: "tumbler",
    alt: "스타벅스 텀블러 카테고리",
    imageSrc: STARBUCKS_IMAGES.popular.tumbler,
  },
  {
    id: "mug",
    alt: "스타벅스 머그 카테고리",
    imageSrc: STARBUCKS_IMAGES.popular.mug,
  },
  {
    id: "featured-2",
    alt: "스타벅스 시즌 추천 카테고리",
    imageSrc: STARBUCKS_IMAGES.popular.featured2,
  },
  {
    id: "beans",
    label: "데일리 원두",
    alt: "데일리 원두 카테고리",
    imageSrc: STARBUCKS_IMAGES.popular.beans,
  },
  {
    id: "food",
    alt: "스타벅스 푸드 카테고리",
    imageSrc: STARBUCKS_IMAGES.popular.food,
  },
  {
    id: "gift",
    alt: "스타벅스 기프트 카테고리",
    imageSrc: STARBUCKS_IMAGES.popular.gift,
  },
];

const PRODUCT_IMAGE_MAP = {
  "daily-beans": STARBUCKS_IMAGES.products.beans,
  tumbler: STARBUCKS_IMAGES.products.tumbler,
  mug: STARBUCKS_IMAGES.products.mug,
  food: STARBUCKS_IMAGES.products.food,
  "gift-set": STARBUCKS_IMAGES.products.giftSet,
} as const;

const createProducts = (
  categoryId: keyof typeof PRODUCT_IMAGE_MAP,
  items: Array<{ name: string; badges?: ProductCategorySection["products"][number]["badges"] }>,
  basePrice: number,
): ProductCategorySection["products"] => {
  const images = PRODUCT_IMAGE_MAP[categoryId];

  return items.map((item, index) => ({
    id: `${categoryId}-product-${index + 1}`,
    name: item.name,
    price: basePrice + index * 2000,
    alt: item.name,
    href: `/products/${categoryId}/${index + 1}`,
    badges: item.badges,
    imageSrc: images[index],
  }));
};

export const PRODUCT_SECTIONS: ProductCategorySection[] = [
  {
    id: "daily-beans",
    title: "데일리 원두",
    products: createProducts(
      "daily-beans",
      [
        { name: "스타벅스 하우스 블렌드", badges: ["BEST"] },
        { name: "파ike Place 로스트", badges: ["NEW"] },
        { name: "에스프레소 로스트" },
        { name: "콜롬비아 Narino" },
        { name: "케냐 AA", badges: ["BEST"] },
        { name: "과테말라 안티구아" },
      ],
      15000,
    ),
  },
  {
    id: "tumbler",
    title: "스타벅스 텀블러",
    products: createProducts(
      "tumbler",
      [
        { name: "스타벅스 스탠리 텀블러", badges: ["BEST", "NEW"] },
        { name: "SS 시그니처 텀블러" },
        { name: "데일리 텀블러 473ml", badges: ["NEW"] },
        { name: "콜드컵 710ml" },
        { name: "트래블 텀블러 591ml", badges: ["SALE"] },
        { name: "리유저블 컵 473ml" },
      ],
      35000,
    ),
  },
  {
    id: "mug",
    title: "스타벅스 머그",
    products: createProducts(
      "mug",
      [
        { name: "시그니처 머그 355ml" },
        { name: "데일리 머그 414ml", badges: ["NEW"] },
        { name: "스톤 웨어 머그" },
        { name: "글라스 머그 355ml" },
        { name: "캠퍼스 머그", badges: ["BEST"] },
        { name: "리미티드 머그" },
      ],
      22000,
    ),
  },
  {
    id: "food",
    title: "스타벅스 푸드",
    products: createProducts(
      "food",
      [
        { name: "클래식 치즈 케이크", badges: ["BEST"] },
        { name: "초콜릿 케이크" },
        { name: "크루아상", badges: ["NEW"] },
        { name: "치아바타 샌드위치" },
        { name: "에그 샐러드 샌드위치" },
        { name: "바나나 브레드" },
      ],
      6500,
    ),
  },
  {
    id: "gift-set",
    title: "기프트 세트",
    products: createProducts(
      "gift-set",
      [
        { name: "원두 & 머그 기프트 세트", badges: ["NEW"] },
        { name: "텀블러 기프트 세트", badges: ["BEST"] },
        { name: "시즌 기프트 박스" },
        { name: "프리미엄 원두 세트", badges: ["SALE"] },
        { name: "홈카페 스타터 키트" },
        { name: "테마별 선물 세트" },
      ],
      45000,
    ),
  },
];
