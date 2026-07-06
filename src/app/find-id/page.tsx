import type { Metadata } from "next";
import { FindIdVerifyForm } from "@/components/auth/FindIdVerifyForm";

export const metadata: Metadata = {
  title: "아이디 찾기 | 스타벅스",
};

export default function FindIdPage() {
  return <FindIdVerifyForm />;
}
