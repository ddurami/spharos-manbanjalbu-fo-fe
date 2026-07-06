import type { Metadata } from "next";

import { MypageContent } from "@/components/mypage/mypage-content";

export const metadata: Metadata = {
  title: "MY PAGE | 스타벅스",
  description: "스타벅스 마이페이지",
};

export default function MypagePage() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <MypageContent />
    </div>
  );
}
