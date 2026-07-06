import type { Metadata } from "next";
import { PersonalInfoPasswordEmailVerifyForm } from "@/components/personal-info/PersonalInfoPasswordEmailVerifyForm";

export const metadata: Metadata = {
  title: "이메일 인증 | 스타벅스",
};

export default function PersonalInfoPasswordEmailPage() {
  return <PersonalInfoPasswordEmailVerifyForm />;
}
