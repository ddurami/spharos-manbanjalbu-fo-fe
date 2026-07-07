import type { Address, StoredAddress } from "@/lib/address/types";
import type {
  MemberAddressCreateRequest,
  MemberAddressResponse,
  MemberAddressUpdateRequest,
} from "@/types/address";

const DEFAULT_ADDRESS_NAME = "기본 배송지";

export function toStoredAddress(response: MemberAddressResponse): StoredAddress {
  return {
    id: String(response.id),
    nickname:
      response.addressName === DEFAULT_ADDRESS_NAME ? "" : response.addressName,
    recipient: response.recipientName,
    zipCode: response.zipcode,
    address: response.baseAddress,
    addressDetail: response.detailAddress,
    phone1: response.phone1,
    phone2: response.phone2 ?? "",
    deliveryMemo: response.deliveryMemo ?? "",
    isDefault: response.isDefault,
  };
}

export function toAddress(stored: StoredAddress): Address {
  return {
    nickname: stored.nickname,
    recipient: stored.recipient,
    zipCode: stored.zipCode,
    address: stored.address,
    addressDetail: stored.addressDetail,
    phone1: stored.phone1,
    phone2: stored.phone2,
    deliveryMemo: stored.deliveryMemo,
  };
}

function toRequestPayload(
  address: Address,
  isDefault?: boolean,
): MemberAddressCreateRequest {
  return {
    addressName: address.nickname.trim() || undefined,
    recipientName: address.recipient.trim(),
    zipcode: address.zipCode.trim(),
    baseAddress: address.address.trim(),
    detailAddress: address.addressDetail.trim(),
    phone1: address.phone1.trim(),
    phone2: address.phone2.trim() || undefined,
    deliveryMemo: address.deliveryMemo.trim() || undefined,
    isDefault,
  };
}

export function toCreateRequest(
  address: Address,
  isDefault?: boolean,
): MemberAddressCreateRequest {
  return toRequestPayload(address, isDefault);
}

export function toUpdateRequest(
  address: Address,
  isDefault?: boolean,
): MemberAddressUpdateRequest {
  return toRequestPayload(address, isDefault);
}
