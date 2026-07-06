import type {
  BestCategory,
  BestCategoryItem,
  BestProduct,
  SortOptionItem,
} from "@/types/best";
import { getProductImage } from "@/constants/product-images";

export const BEST_CATEGORIES: BestCategoryItem[] = [
  { id: "tumbler", label: "텀블러/보온병" },
  { id: "mug", label: "머그/컵" },
  { id: "home-living", label: "홈&리빙" },
  { id: "coffee", label: "커피" },
  { id: "cake-bread", label: "케이크/브레드" },
  { id: "chocolate-snack", label: "초콜릿/스낵" },
  { id: "engraving", label: "각인" },
  { id: "set", label: "세트" },
];

export const SORT_OPTIONS: SortOptionItem[] = [
  { id: "newest", label: "신상품순" },
  { id: "recommended", label: "추천순" },
  { id: "price-asc", label: "낮은 가격순" },
  { id: "price-desc", label: "높은 가격순" },
];

const PRODUCT_NAMES: Record<BestCategory, string[]> = {
  tumbler: [
    "스타벅스 클래식 텀블러",
    "SS 스타벅스 텀블러",
    "프리미엄 보온병",
    "데일리 텀블러",
    "콜드컵 텀블러",
    "리유저블 텀블러",
    "그린 텀블러",
    "미니 보온병",
    "트래블 텀블러",
    "오로라 텀블러",
  ],
  mug: [
    "스타벅스 머그컵",
    "세라믹 머그",
    "핸드드립 머그",
    "클래식 머그컵",
    "미니 머그",
    "스푼 머그",
    "데일리 머그",
    "오로라 머그",
  ],
  "home-living": [
    "홈 데코 오브제",
    "리빙 트레이",
    "쿠션 커버",
    "아로마 디퓨저",
    "데스크 매트",
    "홈 세트",
  ],
  coffee: [
    "스타벅스 원두",
    "블onde 로스트",
    "다크 로스트",
    "에스프레소 원두",
    "콜드브루 원액",
    "드립백 세트",
    "캡슐 커피",
    "디카페인 원두",
  ],
  "cake-bread": [
    "치즈 케이크",
    "바나나 브레드",
    "스콘 세트",
    "머핀 박스",
    "크로와상",
    "티라미수",
  ],
  "chocolate-snack": [
    "다크 초콜릿",
    "초콜릿 바",
    "견과류 스낵",
    "쿠키 세트",
    "초콜릿 선물세트",
  ],
  engraving: [
    "각인 텀블러",
    "각인 머그컵",
    "각인 보온병",
    "커스텀 각인 세트",
  ],
  set: [
    "텀블러 세트",
    "머그 세트",
    "홈&리빙 세트",
    "커피 선물세트",
    "베스트 세트",
  ],
};

function createProducts(): BestProduct[] {
  const products: BestProduct[] = [];
  let index = 0;

  (Object.entries(PRODUCT_NAMES) as [BestCategory, string[]][]).forEach(
    ([category, names]) => {
      names.forEach((name, nameIndex) => {
        index += 1;
        const badges: BestProduct["badges"] = [];

        if (index % 7 === 1) badges.push("BEST");
        if (index % 5 === 0) badges.push("NEW");

        products.push({
          id: `best-${index}`,
          name,
          price: 15000 + (index % 12) * 2500 + nameIndex * 1000,
          category,
          createdAt: new Date(2025, (index % 12) - 1, (index % 28) + 1)
            .toISOString()
            .slice(0, 10),
          recommendationScore: 100 - (index % 40),
          badges: badges.length > 0 ? badges : undefined,
          imageSrc: getProductImage(category, nameIndex),
        });
      });
    },
  );

  return products;
}

export const BEST_PRODUCTS = createProducts();
export const ALL_PRODUCTS = BEST_PRODUCTS;
