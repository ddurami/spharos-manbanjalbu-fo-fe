import type { Metadata } from "next";

import { AddressForm } from "@/components/address/address-form";

type AddressPageProps = {
  searchParams: Promise<{ mode?: string }>;
};

function getPageTitle(mode?: string) {
  return mode === "change" ? "배송지 변경" : "배송지 등록";
}

export async function generateMetadata({
  searchParams,
}: AddressPageProps): Promise<Metadata> {
  const { mode } = await searchParams;
  const title = getPageTitle(mode);

  return {
    title: `${title} | Starbucks`,
    description: `스타벅스 온라인 스토어 ${title}`,
  };
}

export default async function AddressPage({ searchParams }: AddressPageProps) {
  const { mode } = await searchParams;
  const title = getPageTitle(mode);

  return (
    <div className="flex flex-1 flex-col bg-white">
      <div className="mx-auto flex w-full max-w-[850px] flex-col px-[50px] pb-[50px] pt-[50px]">
        <h1 className="pb-[50px] text-[36px] font-medium text-foreground">
          {title}
        </h1>
        <AddressForm />
      </div>
    </div>
  );
}
