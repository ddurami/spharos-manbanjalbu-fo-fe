import type {
  BestCategory,
  BestCategoryItem,
  PrimaryCategoryItem,
  Product,
  SortOptionItem,
  SubCategoryItem,
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

export const PRIMARY_CATEGORIES: PrimaryCategoryItem[] = [
  { id: "all", label: "전체상품" },
  ...BEST_CATEGORIES,
];

export const SUB_CATEGORIES: Record<BestCategory, SubCategoryItem[]> = {
  tumbler: [
    { id: "tumbler", label: "텀블러" },
    { id: "thermos", label: "보온병" },
    { id: "coldcup", label: "콜드컵" },
  ],
  mug: [
    { id: "mug", label: "머그" },
    { id: "cup", label: "컵" },
  ],
  "home-living": [
    { id: "home-deco", label: "홈데코" },
    { id: "living", label: "리빙" },
  ],
  coffee: [
    { id: "beans", label: "원두" },
    { id: "capsule-drip", label: "드립/캡슐" },
    { id: "beverage", label: "음료" },
  ],
  "cake-bread": [
    { id: "cake", label: "케이크" },
    { id: "bread", label: "브레드" },
  ],
  "chocolate-snack": [
    { id: "chocolate", label: "초콜릿" },
    { id: "snack", label: "스낵" },
  ],
  engraving: [
    { id: "tumbler-engraving", label: "텀블러 각인" },
    { id: "mug-engraving", label: "머그/컵 각인" },
    { id: "thermos-engraving", label: "보온병 각인" },
  ],
  set: [
    { id: "tumbler-set", label: "텀블러 세트" },
    { id: "mug-set", label: "머그 세트" },
    { id: "gift-set", label: "선물세트" },
  ],
};

export const SORT_OPTIONS: SortOptionItem[] = [
  { id: "newest", label: "신상품순" },
  { id: "recommended", label: "추천순" },
  { id: "price-asc", label: "낮은 가격순" },
  { id: "price-desc", label: "높은 가격순" },
];

export const ALL_SUB_CATEGORY_ID = "all";

export function getSubCategories(
  primaryCategory: BestCategory,
): SubCategoryItem[] {
  return [
    { id: ALL_SUB_CATEGORY_ID, label: "전체" },
    ...SUB_CATEGORIES[primaryCategory],
  ];
}

const PRODUCT_NAMES: Record<
  BestCategory,
  { name: string; subCategory: string }[]
> = {
  tumbler: [
    { name: "스타벅스 클래식 텀블러", subCategory: "tumbler" },
    { name: "SS 스타벅스 텀블러", subCategory: "tumbler" },
    { name: "프리미엄 보온병", subCategory: "thermos" },
    { name: "데일리 텀블러", subCategory: "tumbler" },
    { name: "콜드컵 텀블러", subCategory: "coldcup" },
    { name: "리유저블 텀블러", subCategory: "tumbler" },
    { name: "그린 텀블러", subCategory: "tumbler" },
    { name: "미니 보온병", subCategory: "thermos" },
    { name: "트래블 텀블러", subCategory: "tumbler" },
    { name: "오로라 텀블러", subCategory: "tumbler" },
  ],
  mug: [
    { name: "스타벅스 머그컵", subCategory: "mug" },
    { name: "세라믹 머그", subCategory: "mug" },
    { name: "핸드드립 머그", subCategory: "mug" },
    { name: "클래식 머그컵", subCategory: "mug" },
    { name: "미니 머그", subCategory: "mug" },
    { name: "스푼 머그", subCategory: "mug" },
    { name: "데일리 머그", subCategory: "mug" },
    { name: "오로라 머그", subCategory: "mug" },
  ],
  "home-living": [
    { name: "홈 데코 오브제", subCategory: "home-deco" },
    { name: "리빙 트레이", subCategory: "living" },
    { name: "쿠션 커버", subCategory: "living" },
    { name: "아로마 디퓨저", subCategory: "home-deco" },
    { name: "데스크 매트", subCategory: "living" },
    { name: "홈 세트", subCategory: "home-deco" },
  ],
  coffee: [
    { name: "스타벅스 원두", subCategory: "beans" },
    { name: "블onde 로스트", subCategory: "beans" },
    { name: "다크 로스트", subCategory: "beans" },
    { name: "에스프레소 원두", subCategory: "beans" },
    { name: "콜드브루 원액", subCategory: "beverage" },
    { name: "드립백 세트", subCategory: "capsule-drip" },
    { name: "캡슐 커피", subCategory: "capsule-drip" },
    { name: "디카페인 원두", subCategory: "beans" },
  ],
  "cake-bread": [
    { name: "치즈 케이크", subCategory: "cake" },
    { name: "바나나 브레드", subCategory: "bread" },
    { name: "스콘 세트", subCategory: "bread" },
    { name: "머핀 박스", subCategory: "bread" },
    { name: "크로와상", subCategory: "bread" },
    { name: "티라미수", subCategory: "cake" },
  ],
  "chocolate-snack": [
    { name: "다크 초콜릿", subCategory: "chocolate" },
    { name: "초콜릿 바", subCategory: "chocolate" },
    { name: "견과류 스낵", subCategory: "snack" },
    { name: "쿠키 세트", subCategory: "snack" },
    { name: "초콜릿 선물세트", subCategory: "chocolate" },
  ],
  engraving: [
    { name: "각인 텀블러", subCategory: "tumbler-engraving" },
    { name: "각인 머그컵", subCategory: "mug-engraving" },
    { name: "각인 보온병", subCategory: "thermos-engraving" },
    { name: "커스텀 각인 세트", subCategory: "tumbler-engraving" },
  ],
  set: [
    { name: "텀블러 세트", subCategory: "tumbler-set" },
    { name: "머그 세트", subCategory: "mug-set" },
    { name: "홈&리빙 세트", subCategory: "gift-set" },
    { name: "커피 선물세트", subCategory: "gift-set" },
    { name: "베스트 세트", subCategory: "gift-set" },
  ],
};

function createProducts(): Product[] {
  const products: Product[] = [];
  let index = 0;

  (Object.entries(PRODUCT_NAMES) as [BestCategory, { name: string; subCategory: string }[]][]).forEach(
    ([category, items]) => {
      items.forEach(({ name, subCategory }, nameIndex) => {
        index += 1;
        const badges: Product["badges"] = [];

        if (index % 7 === 1) badges.push("BEST");
        if (index % 5 === 0) badges.push("NEW");

        products.push({
          id: `product-${index}`,
          name,
          price: 15000 + (index % 12) * 2500 + nameIndex * 1000,
          category,
          subCategory,
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

export const ALL_PRODUCTS = createProducts();
export const BEST_PRODUCTS = ALL_PRODUCTS;
