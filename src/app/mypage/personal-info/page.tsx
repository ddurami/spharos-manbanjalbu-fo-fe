import type { Metadata } from "next";
import { PersonalInfoForm } from "@/components/personal-info/PersonalInfoForm";

export const metadata: Metadata = {
  title: "개인정보 관리 | 스타벅스",
};

export default function PersonalInfoPage() {
  return <PersonalInfoForm />;
}
