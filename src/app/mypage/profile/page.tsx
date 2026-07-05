import type { Metadata } from "next";

import { ProfileContent } from "@/components/mypage/profile-content";

export const metadata: Metadata = {
  title: "개인정보 관리 | Starbucks",
  description: "스타벅스 온라인 스토어 개인정보 관리",
};

export default function ProfilePage() {
  return <ProfileContent />;
}
