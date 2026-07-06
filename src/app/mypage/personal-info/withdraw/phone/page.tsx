import type { Metadata } from "next";
import { PersonalInfoWithdrawPhoneVerifyForm } from "@/components/personal-info/PersonalInfoWithdrawPhoneVerifyForm";

export const metadata: Metadata = {
  title: "회원 탈퇴 휴대폰 인증 | 스타벅스",
};

export default function PersonalInfoWithdrawPhonePage() {
  return <PersonalInfoWithdrawPhoneVerifyForm />;
}
