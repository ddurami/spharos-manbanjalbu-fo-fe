import type { Metadata } from "next";

import { AddressForm } from "@/components/address/address-form";

export const metadata: Metadata = {
  title: "배송지 등록 | Starbucks",
  description: "스타벅스 온라인 스토어 배송지 등록",
};

export default function AddressPage() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <div className="mx-auto flex w-full max-w-[850px] flex-col px-[50px] pb-[50px] pt-[50px]">
        <h1 className="pb-[50px] text-[36px] font-medium text-foreground">
          배송지 등록
        </h1>
        <AddressForm />
      </div>
    </div>
  );
}
