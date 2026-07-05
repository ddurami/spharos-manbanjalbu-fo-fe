import type { Metadata } from "next";

import { AddressFormPage } from "@/components/address/address-form-page";

export const metadata: Metadata = {
  title: "배송지 수정 | Starbucks",
  description: "스타벅스 온라인 스토어 배송지 수정",
};

type EditAddressPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditAddressPage({ params }: EditAddressPageProps) {
  const { id } = await params;

  return <AddressFormPage title="배송지 수정" mode="edit" addressId={id} />;
}
