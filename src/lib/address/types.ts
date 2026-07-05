export type Address = {
  nickname: string;
  recipient: string;
  zipCode: string;
  address: string;
  addressDetail: string;
  phone1: string;
  phone2: string;
  deliveryMemo: string;
};

export type ShippingAddress = {
  id: string;
  recipient: string;
  nickname: string;
  zipCode: string;
  address: string;
  addressDetail: string;
  phone: string;
  isDefault: boolean;
};

export const EMPTY_ADDRESS: Address = {
  nickname: "",
  recipient: "",
  zipCode: "",
  address: "",
  addressDetail: "",
  phone1: "",
  phone2: "",
  deliveryMemo: "",
};
