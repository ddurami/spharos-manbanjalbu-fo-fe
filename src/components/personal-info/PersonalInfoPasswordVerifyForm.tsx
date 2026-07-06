"use client";

import { useEffect } from "react";
import { AuthVerifyMethodForm } from "@/components/auth/AuthVerifyMethodForm";
import { clearPersonalInfoPasswordSession } from "@/lib/personal-info-session";

export function PersonalInfoPasswordVerifyForm() {
  useEffect(() => {
    clearPersonalInfoPasswordSession();
  }, []);

  return (
    <AuthVerifyMethodForm
      emailHref="/mypage/personal-info/password/email"
      phoneHref="/mypage/personal-info/password/phone"
    />
  );
}
