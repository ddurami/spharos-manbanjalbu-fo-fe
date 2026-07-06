import type { Metadata } from "next";
import { Suspense } from "react";
import { FindPasswordResetForm } from "@/components/auth/FindPasswordResetForm";

export const metadata: Metadata = {
  title: "비밀번호 변경 | 스타벅스",
};

export default function FindPasswordResetPage() {
  return (
    <Suspense fallback={null}>
      <FindPasswordResetForm />
    </Suspense>
  );
}
