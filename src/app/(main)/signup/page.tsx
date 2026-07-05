import type { Metadata } from "next";
import { SignupVerifyForm } from "@/components/auth/SignupVerifyForm";

export const metadata: Metadata = {
  title: "회원가입 | 스타벅스",
};

export default function SignupPage() {
  return <SignupVerifyForm />;
}
