import type { Metadata } from "next";

import { AddressForm } from "@/components/address/address-form";

export const metadata: Metadata = {
  title: "배송지 수정 | 스타벅스",
  description: "스타벅스 배송지 수정",
};

type MypageAddressEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MypageAddressEditPage({
  params,
}: MypageAddressEditPageProps) {
  const { id } = await params;

  return (
    <div className="flex flex-1 flex-col bg-white">
      <div className="mx-auto flex w-full max-w-[850px] flex-col px-6 pb-10 pt-10 lg:px-[50px] lg:pb-[50px] lg:pt-[50px]">
        <h1 className="pb-10 text-[28px] font-medium text-foreground sm:pb-[50px] sm:text-[36px]">
          배송지 수정
        </h1>
        <AddressForm
          addressId={id}
          redirectHref="/mypage/address"
          cancelHref="/mypage/address"
        />
      </div>
    </div>
  );
}
