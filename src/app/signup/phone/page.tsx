import type { Metadata } from "next";
import { SignupPhoneVerifyForm } from "@/components/auth/SignupPhoneVerifyForm";

export const metadata: Metadata = {
  title: "휴대폰 인증 | 스타벅스",
};

export default function SignupPhonePage() {
  return <SignupPhoneVerifyForm />;
}
