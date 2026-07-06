import type { Metadata } from "next";
import { Suspense } from "react";
import { FindIdResultForm } from "@/components/auth/FindIdResultForm";

export const metadata: Metadata = {
  title: "아이디 찾기 결과 | 스타벅스",
};

export default function FindIdResultPage() {
  return (
    <Suspense fallback={null}>
      <FindIdResultForm />
    </Suspense>
  );
}
