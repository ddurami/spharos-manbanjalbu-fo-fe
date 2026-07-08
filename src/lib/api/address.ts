import { apiRequest, apiRequestVoid } from "@/lib/api/client";
import type {
  MemberAddressCreateRequest,
  MemberAddressResponse,
  MemberAddressUpdateRequest,
} from "@/types/address";

export function getMemberAddresses() {
  return apiRequest<MemberAddressResponse[]>("/api/member/addresses");
}

export function getMemberAddress(addressId: number) {
  return apiRequest<MemberAddressResponse>(
    `/api/member/addresses/${addressId}`,
  );
}

export function createMemberAddress(request: MemberAddressCreateRequest) {
  return apiRequest<MemberAddressResponse>("/api/member/addresses", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

export function updateMemberAddress(
  addressId: number,
  request: MemberAddressUpdateRequest,
) {
  return apiRequest<MemberAddressResponse>(
    `/api/member/addresses/${addressId}`,
    {
      method: "PUT",
      body: JSON.stringify(request),
    },
  );
}

export function setMemberAddressDefault(addressId: number) {
  return apiRequest<MemberAddressResponse>(
    `/api/member/addresses/${addressId}/default`,
    {
      method: "PATCH",
    },
  );
}

export function deleteMemberAddress(addressId: number) {
  return apiRequestVoid(`/api/member/addresses/${addressId}`, {
    method: "DELETE",
  });
}
