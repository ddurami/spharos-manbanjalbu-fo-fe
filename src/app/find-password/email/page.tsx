import type { Metadata } from "next";
import { FindPasswordEmailVerifyForm } from "@/components/auth/FindPasswordEmailVerifyForm";

export const metadata: Metadata = {
  title: "이메일 인증 | 비밀번호 찾기",
};

export default function FindPasswordEmailPage() {
  return <FindPasswordEmailVerifyForm />;
}
