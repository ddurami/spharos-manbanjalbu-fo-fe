import type { Metadata } from "next";

import { AddressListContent } from "@/components/address/address-list-content";

export const metadata: Metadata = {
  title: "배송지 관리 | Starbucks",
  description: "스타벅스 온라인 스토어 배송지 관리",
};

export default function AddressesPage() {
  return <AddressListContent />;
}
