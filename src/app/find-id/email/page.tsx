import type { Metadata } from "next";
import { FindIdEmailVerifyForm } from "@/components/auth/FindIdEmailVerifyForm";

export const metadata: Metadata = {
  title: "이메일 인증 | 아이디 찾기",
};

export default function FindIdEmailPage() {
  return <FindIdEmailVerifyForm />;
}
