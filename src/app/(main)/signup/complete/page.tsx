import type { Metadata } from "next";
import { SignupCompleteForm } from "@/components/auth/SignupCompleteForm";

export const metadata: Metadata = {
  title: "회원가입 완료 | 스타벅스",
};

export default function SignupCompletePage() {
  return <SignupCompleteForm />;
}
