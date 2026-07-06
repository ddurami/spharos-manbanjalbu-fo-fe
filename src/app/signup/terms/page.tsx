import type { Metadata } from "next";
import { SignupTermsForm } from "@/components/auth/SignupTermsForm";

export const metadata: Metadata = {
  title: "약관 동의 | 스타벅스",
};

export default function SignupTermsPage() {
  return <SignupTermsForm />;
}
