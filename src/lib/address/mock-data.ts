import type { ShippingAddress } from "@/lib/address/types";

const SHARED_ADDRESS = {
  zipCode: "12345",
  address: "부산광역시 중구 초량중로 29",
  addressDetail: "한국방송통신전파진흥원 3층 스파로스 아카데미",
  phone: "010-1234-5678",
  recipient: "홍길동",
} as const;

export const MOCK_SHIPPING_ADDRESSES: ShippingAddress[] = [
  {
    id: "address-1",
    nickname: "집",
    isDefault: true,
    ...SHARED_ADDRESS,
  },
  {
    id: "address-2",
    nickname: "회사",
    isDefault: false,
    ...SHARED_ADDRESS,
  },
  {
    id: "address-3",
    nickname: "회사",
    isDefault: false,
    ...SHARED_ADDRESS,
  },
  {
    id: "address-4",
    nickname: "회사",
    isDefault: false,
    ...SHARED_ADDRESS,
  },
  {
    id: "address-5",
    nickname: "회사",
    isDefault: false,
    ...SHARED_ADDRESS,
  },
];
