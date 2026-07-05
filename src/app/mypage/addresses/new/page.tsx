import type { Metadata } from "next";

import { AddressFormPage } from "@/components/address/address-form-page";

export const metadata: Metadata = {
  title: "배송지 추가 | Starbucks",
  description: "스타벅스 온라인 스토어 배송지 추가",
};

export default function NewAddressPage() {
  return <AddressFormPage title="배송지 추가" mode="create" />;
}
