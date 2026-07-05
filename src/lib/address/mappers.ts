import type { Address, ShippingAddress } from "@/lib/address/types";

export function shippingAddressToForm(address: ShippingAddress): Address {
  return {
    nickname: address.nickname,
    recipient: address.recipient,
    zipCode: address.zipCode,
    address: address.address,
    addressDetail: address.addressDetail,
    phone1: address.phone,
    phone2: "",
    deliveryMemo: "",
  };
}

export function formToShippingAddress(
  form: Address,
  id: string,
  isDefault: boolean
): ShippingAddress {
  return {
    id,
    recipient: form.recipient.trim(),
    nickname: form.nickname.trim() || "배송지",
    zipCode: form.zipCode.trim(),
    address: form.address.trim(),
    addressDetail: form.addressDetail.trim(),
    phone: form.phone1.trim(),
    isDefault,
  };
}

export function createAddressId() {
  return `address-${Date.now()}`;
}
