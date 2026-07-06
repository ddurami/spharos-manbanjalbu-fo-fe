import type { Metadata } from "next";
import { SignupEmailVerifyForm } from "@/components/auth/SignupEmailVerifyForm";

export const metadata: Metadata = {
  title: "이메일 인증 | 스타벅스",
};

export default function SignupEmailPage() {
  return <SignupEmailVerifyForm />;
}
