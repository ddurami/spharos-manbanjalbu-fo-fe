import type { Metadata } from "next";
import { SignupMemberForm } from "@/components/auth/SignupMemberForm";

export const metadata: Metadata = {
  title: "회원정보 입력 | 스타벅스",
};

export default function SignupInfoPage() {
  return <SignupMemberForm />;
}
