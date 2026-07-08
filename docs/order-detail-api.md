# 주문 상세 API 설계

주문 상세 정보 페이지(`/mypage/orders/[orderNo]`) UI 구현을 기준으로 정의한 API 스펙입니다.

## 현재 상태

| API | 상태 | 비고 |
|-----|------|------|
| `GET /api/orders` | 구현됨 | 주문 목록 조회 |
| `GET /api/orders/{orderNo}` | **미구현** | 주문 상세 조회 (본 문서) |

프론트엔드는 `getOrderDetail(orderNo)` 함수와 `OrderDetailResponse` 타입을 준비해 두었으며, 현재 UI는 `getMockOrderDetail()` 더미 데이터로 렌더링합니다.

---

## 주문 상세 조회

### Request

```
GET /api/orders/{orderNo}
Authorization: Bearer {accessToken}
```

| Path | 타입 | 설명 |
|------|------|------|
| `orderNo` | string | 주문번호 (목록 API의 `orderNo`와 동일) |

### Response `200 OK`

```json
{
  "orderId": 1,
  "orderNo": "1234567890",
  "orderName": "클래식 넛츠 타르트 외 1개",
  "orderStatus": "PAID",
  "orderType": "DELIVERY",
  "orderAmount": 30000,
  "orderedAt": "2026-07-10T16:00:00",
  "thumbnailUrl": "https://example.com/image.jpg",
  "reservationDeliveryDate": null,
  "cancelable": true,
  "changeableAddress": true,
  "items": [
    {
      "productId": 1,
      "productName": "클래식 넛츠 타르트",
      "quantity": 1,
      "unitPrice": 15000,
      "lineAmount": 15000,
      "thumbnailUrl": "https://example.com/tart.jpg"
    }
  ],
  "payment": {
    "orderAmount": 30000,
    "productAmount": 30000,
    "deliveryFee": 3000,
    "discountAmount": 0,
    "paidAmount": 30000,
    "paymentMethod": "EASY_PAY",
    "paymentStatus": "PAID"
  },
  "deliveryAddress": {
    "recipientName": "홍길동",
    "addressName": "집",
    "zipcode": "12345",
    "baseAddress": "부산광역시 중구 초량중로 29",
    "detailAddress": "3층 스파로스 아카데미",
    "phone1": "010-1234-5678",
    "isDefault": true
  },
  "policy": {
    "refundInfo": "취소/환불 안내 텍스트",
    "exchangeInfo": "교환/반품 안내 텍스트",
    "deliveryInfo": "이용조건 및 배송 안내 텍스트"
  }
}
```

### Error Responses

| Status | 설명 |
|--------|------|
| `401` | 미인증 |
| `403` | 타인 주문 조회 |
| `404` | 존재하지 않는 주문번호 |

---

## 필드 정의

### OrderDetailResponse

| 필드 | 타입 | 필수 | UI 매핑 |
|------|------|------|---------|
| `orderId` | number | Y | 내부 식별자 |
| `orderNo` | string | Y | 좌측 헤더, 우측 주문정보 |
| `orderName` | string | Y | 상품 요약명 (`외 N개` 포함) |
| `orderStatus` | OrderStatus | Y | 상품 상태 라벨 |
| `orderType` | OrderType | Y | 예약 배송 구분 (향후) |
| `orderAmount` | number | Y | 상품 영역 결제 금액 |
| `orderedAt` | string (ISO 8601) | Y | 좌측 날짜, 우측 주문일시 |
| `thumbnailUrl` | string \| null | N | 대표 상품 썸네일 |
| `reservationDeliveryDate` | string \| null | N | 예약 배송일 (RESERVATION 타입) |
| `cancelable` | boolean | Y | 취소 버튼 노출 (향후) |
| `changeableAddress` | boolean | Y | 배송지 변경 링크 노출 |
| `items` | OrderDetailItem[] | Y | 상품 상세 (향후 확장) |
| `payment` | OrderDetailPayment | Y | 결제정보 섹션 |
| `deliveryAddress` | OrderDetailAddress | Y | 배송정보 섹션 |
| `policy` | OrderDetailPolicy | Y | 하단 아코디언 |

### OrderDetailItem

| 필드 | 타입 | 설명 |
|------|------|------|
| `productId` | number | 상품 ID |
| `productName` | string | 상품명 |
| `quantity` | number | 수량 |
| `unitPrice` | number | 단가 |
| `lineAmount` | number | 라인 합계 |
| `thumbnailUrl` | string \| null | 상품 썸네일 |

### OrderDetailPayment

| 필드 | 타입 | UI 라벨 |
|------|------|---------|
| `orderAmount` | number | 주문금액 |
| `productAmount` | number | 상품금액 |
| `deliveryFee` | number | 배송비 |
| `discountAmount` | number | 할인금액 |
| `paidAmount` | number | 결제금액 |
| `paymentMethod` | OrderPaymentMethod | 결제수단 라벨 |
| `paymentStatus` | PaymentStatus | 결제 상태 (향후) |

### OrderDetailAddress

주문 시점 배송지 **스냅샷**입니다. 회원 배송지 API(`GET /api/member/addresses`)와 별도로 관리해야 합니다.

| 필드 | 타입 | UI 매핑 |
|------|------|---------|
| `recipientName` | string | 수령인 |
| `addressName` | string \| null | 배송지 별칭 (`집`) |
| `zipcode` | string | 우편번호 |
| `baseAddress` | string | 기본 주소 |
| `detailAddress` | string | 상세 주소 |
| `phone1` | string | 연락처 |
| `isDefault` | boolean | `기본` 뱃지 |

### OrderDetailPolicy

| 필드 | 타입 | UI 매핑 |
|------|------|---------|
| `refundInfo` | string | 취소/환불 안내 |
| `exchangeInfo` | string | 교환/반품 안내 |
| `deliveryInfo` | string | 이용조건 및 배송 안내 |

---

## Enum 참조

기존 `src/types/order.ts` 타입을 그대로 사용합니다.

### OrderStatus

`PENDING` | `PAID` | `PREPARING` | `SHIPPING` | `DELIVERED` | `CANCELLED` | `REFUNDED`

### OrderPaymentMethod

`CARD` | `MOBILE` | `BANK_TRANSFER` | `VIRTUAL_ACCOUNT` | `EASY_PAY`

프론트 라벨 매핑: `src/lib/order/order-labels.ts` → `getOrderPaymentMethodLabel()`

---

## 목록 API와의 관계

`GET /api/orders`의 `OrderSummary`와 상세 API 필드 대응:

| OrderSummary (목록) | OrderDetailResponse (상세) |
|---------------------|--------------------------|
| `orderId` | `orderId` |
| `orderNo` | `orderNo` |
| `orderName` | `orderName` |
| `orderStatus` | `orderStatus` |
| `orderType` | `orderType` |
| `orderAmount` | `orderAmount` |
| `orderedAt` | `orderedAt` |
| `thumbnailUrl` | `thumbnailUrl` |
| `cancelable` | `cancelable` |
| `paymentStatus` | `payment.paymentStatus` |
| — | `items`, `payment`, `deliveryAddress`, `policy` |

목록에서 `주문상세` 클릭 시 `/mypage/orders/{orderNo}`로 이동합니다.

---

## 프론트엔드 연동 방법

API 구현 후 `mypage-order-detail-page-content.tsx`에서 mock 호출을 API 호출로 교체합니다.

```typescript
import { getOrderDetail } from "@/lib/api/order";

const data = await getOrderDetail(params.orderNo);
setOrder(data);
```

관련 파일:

| 파일 | 역할 |
|------|------|
| `src/types/order.ts` | `OrderDetailResponse` 타입 |
| `src/lib/api/order.ts` | `getOrderDetail()` |
| `src/lib/order/order-detail-mock.ts` | UI 더미 데이터 (연동 후 제거 가능) |
| `src/components/mypage/orders/mypage-order-detail-content.tsx` | 순수 UI (props 기반) |

---

## 향후 확장 API (참고)

| API | 용도 |
|-----|------|
| `PATCH /api/orders/{orderNo}/address` | 주문 배송지 변경 |
| `POST /api/orders/{orderNo}/cancel` | 주문 취소 |

`changeableAddress`, `cancelable` 필드로 UI 노출 여부를 제어합니다.
