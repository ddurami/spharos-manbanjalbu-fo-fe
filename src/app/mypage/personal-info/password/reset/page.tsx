import type { Metadata } from "next";
import { Suspense } from "react";
import { PersonalInfoPasswordResetForm } from "@/components/personal-info/PersonalInfoPasswordResetForm";

export const metadata: Metadata = {
  title: "비밀번호 변경 | 스타벅스",
};

export default function PersonalInfoPasswordResetPage() {
  return (
    <Suspense fallback={null}>
      <PersonalInfoPasswordResetForm />
    </Suspense>
  );
}
