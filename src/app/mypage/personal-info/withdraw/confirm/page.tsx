import type { Metadata } from "next";
import { PersonalInfoWithdrawConfirmForm } from "@/components/personal-info/PersonalInfoWithdrawConfirmForm";

export const metadata: Metadata = {
  title: "회원 탈퇴 확인 | 스타벅스",
};

export default function PersonalInfoWithdrawConfirmPage() {
  return <PersonalInfoWithdrawConfirmForm />;
}
