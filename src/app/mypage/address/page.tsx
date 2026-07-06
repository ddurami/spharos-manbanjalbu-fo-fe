import type { Metadata } from "next";

import { MypageAddressListContent } from "@/components/mypage/address/mypage-address-list-content";

export const metadata: Metadata = {
  title: "배송지 관리 | 스타벅스",
  description: "스타벅스 배송지 관리",
};

export default function MypageAddressPage() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <MypageAddressListContent />
    </div>
  );
}
