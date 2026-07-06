import type { Metadata } from "next";
import { FindPasswordPhoneVerifyForm } from "@/components/auth/FindPasswordPhoneVerifyForm";

export const metadata: Metadata = {
  title: "휴대폰 인증 | 비밀번호 찾기",
};

export default function FindPasswordPhonePage() {
  return <FindPasswordPhoneVerifyForm />;
}
