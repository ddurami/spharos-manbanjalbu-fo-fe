import type { Metadata } from "next";
import { PersonalInfoPasswordVerifyForm } from "@/components/personal-info/PersonalInfoPasswordVerifyForm";

export const metadata: Metadata = {
  title: "비밀번호 변경 인증 | 스타벅스",
};

export default function PersonalInfoPasswordPage() {
  return <PersonalInfoPasswordVerifyForm />;
}
