import type { Metadata } from "next";
import { FindPasswordVerifyForm } from "@/components/auth/FindPasswordVerifyForm";

export const metadata: Metadata = {
  title: "비밀번호 찾기 | 스타벅스",
};

export default function FindPasswordPage() {
  return <FindPasswordVerifyForm />;
}
