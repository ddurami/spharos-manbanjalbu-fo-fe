"use client";

import { useEffect } from "react";
import { AuthVerifyMethodForm } from "@/components/auth/AuthVerifyMethodForm";
import { clearWithdrawSession } from "@/lib/withdraw-session";

export function PersonalInfoWithdrawVerifyForm() {
  useEffect(() => {
    clearWithdrawSession();
  }, []);

  return (
    <AuthVerifyMethodForm
      emailHref="/mypage/personal-info/withdraw/email"
      phoneHref="/mypage/personal-info/withdraw/phone"
    />
  );
}
