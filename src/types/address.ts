export type MemberAddressResponse = {
  id: number;
  addressName: string;
  recipientName: string;
  zipcode: string;
  baseAddress: string;
  detailAddress: string;
  phone1: string;
  phone2: string | null;
  deliveryMemo: string | null;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
};

export type MemberAddressCreateRequest = {
  addressName?: string;
  recipientName: string;
  zipcode: string;
  baseAddress: string;
  detailAddress: string;
  phone1: string;
  phone2?: string;
  deliveryMemo?: string;
  isDefault?: boolean;
};

export type MemberAddressUpdateRequest = MemberAddressCreateRequest;
