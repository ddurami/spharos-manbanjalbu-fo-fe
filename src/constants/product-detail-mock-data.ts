import type { ProductDetail, ProductGuideSection } from "@/types/product-detail";
import { ALL_PRODUCTS } from "@/constants/best-mock-data";
import { getProductImage } from "@/constants/product-images";

const GUIDE_SECTIONS: ProductGuideSection[] = [
  {
    id: "cancel-refund",
    title: "취소/환불 안내",
    content: [
      "온라인 스토어는 스타벅스 웹사이트 및 모바일 애플리케이션에 게시된 웹사이트 이용약관 및 비회원 이용약관의 적용을 받습니다.",
      "주문 취소는 상품 준비 전까지 가능하며, 배송 시작 후에는 취소가 제한될 수 있습니다.",
      "환불은 결제 수단에 따라 영업일 기준 3~7일 이내 처리됩니다.",
    ],
  },
  {
    id: "exchange-return",
    title: "교환/반품 안내",
    content: [
      "상품 수령 후 7일 이내 교환 및 반품이 가능합니다.",
      "단, 상품의 태그 및 포장을 훼손하거나 사용 흔적이 있는 경우 교환/반품이 불가합니다.",
      "교환/반품 배송비는 사유에 따라 고객 부담 또는 판매자 부담으로 구분됩니다.",
    ],
  },
  {
    id: "product-info",
    title: "상품 정보 제공 고시",
    content: [
      "품명: 클래식 넛츠 타르트",
      "식품의 유형: 과자",
      "원산지: 상품 정보 제공 고시 참조",
      "유통기한: 제품 별도 표시일까지",
      "소비자 상담 관련 전화번호: 1522-3232",
    ],
  },
  {
    id: "terms-shipping",
    title: "이용조건 및 배송 안내",
    content: [
      "배송은 결제 완료 후 영업일 기준 2~5일 소요됩니다.",
      "제주 및 도서 산간 지역은 추가 배송일이 소요될 수 있습니다.",
      "배송비는 주문 금액 및 지역에 따라 달라질 수 있습니다.",
    ],
  },
];

function unsplashDetailImage(): string {
  return "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1320&h=2400&q=80";
}

export function getProductDetail(productId: string): ProductDetail | undefined {
  const product = ALL_PRODUCTS.find((item) => item.id === productId);
  if (!product) return undefined;

  const relatedProductIds = ALL_PRODUCTS.filter(
    (item) => item.category === product.category && item.id !== product.id,
  )
    .slice(0, 6)
    .map((item) => item.id);

  return {
    id: product.id,
    name: product.name,
    description:
      "고소한 견과류와 달콤한 타르트 크림이 조화를 이루는 스타벅스 시그니처 디저트입니다. 바삭한 타르트지와 풍부한 넛츠의 식감을 즐겨보세요.",
    origin: "원산지: 상품 정보 제공 고시 참조",
    price: product.price,
    thumbnailSrc: product.imageSrc ?? getProductImage(product.category, 0),
    detailImageSrc: unsplashDetailImage(),
    guideSections: GUIDE_SECTIONS,
    relatedProductIds:
      relatedProductIds.length > 0
        ? relatedProductIds
        : ALL_PRODUCTS.slice(0, 6).map((item) => item.id),
  };
}

export function getAllProductDetailIds(): string[] {
  return ALL_PRODUCTS.map((product) => product.id);
}
