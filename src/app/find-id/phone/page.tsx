import type { Metadata } from "next";
import { FindIdPhoneVerifyForm } from "@/components/auth/FindIdPhoneVerifyForm";

export const metadata: Metadata = {
  title: "휴대폰 인증 | 아이디 찾기",
};

export default function FindIdPhonePage() {
  return <FindIdPhoneVerifyForm />;
}
