import type { Metadata } from "next";

import { MypageContent } from "@/components/mypage/mypage-content";
import { MypageGreeting } from "@/components/mypage/mypage-greeting";

export const metadata: Metadata = {
  title: "마이페이지 | Starbucks",
  description: "스타벅스 온라인 스토어 마이페이지",
};

export default function MypagePage() {
  return (
    <div className="flex flex-1 flex-col bg-white px-[50px] py-[50px] lg:px-[300px]">
      <MypageGreeting />
      <div className="mt-[50px]">
        <MypageContent />
      </div>
    </div>
  );
}
