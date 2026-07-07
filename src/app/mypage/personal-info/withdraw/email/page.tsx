import type { Metadata } from "next";
import { PersonalInfoWithdrawEmailVerifyForm } from "@/components/personal-info/PersonalInfoWithdrawEmailVerifyForm";

export const metadata: Metadata = {
  title: "회원 탈퇴 이메일 인증 | 스타벅스",
};

export default function PersonalInfoWithdrawEmailPage() {
  return <PersonalInfoWithdrawEmailVerifyForm />;
}
