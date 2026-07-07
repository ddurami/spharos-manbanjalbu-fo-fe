import type { Metadata } from "next";
import { PersonalInfoWithdrawVerifyForm } from "@/components/personal-info/PersonalInfoWithdrawVerifyForm";

export const metadata: Metadata = {
  title: "회원 탈퇴 인증 | 스타벅스",
};

export default function PersonalInfoWithdrawPage() {
  return <PersonalInfoWithdrawVerifyForm />;
}
