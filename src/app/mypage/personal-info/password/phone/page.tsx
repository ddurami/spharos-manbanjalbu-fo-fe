import type { Metadata } from "next";
import { PersonalInfoPasswordPhoneVerifyForm } from "@/components/personal-info/PersonalInfoPasswordPhoneVerifyForm";

export const metadata: Metadata = {
  title: "휴대폰 인증 | 스타벅스",
};

export default function PersonalInfoPasswordPhonePage() {
  return <PersonalInfoPasswordPhoneVerifyForm />;
}
