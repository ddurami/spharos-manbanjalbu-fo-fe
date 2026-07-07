"use client";

import { useEffect } from "react";
import { AuthVerifyMethodForm } from "@/components/auth/AuthVerifyMethodForm";
import { clearFindPasswordSession } from "@/lib/find-password-session";

export function FindPasswordVerifyForm() {
  useEffect(() => {
    clearFindPasswordSession();
  }, []);

  return (
    <AuthVerifyMethodForm
      emailHref="/find-password/email"
      phoneHref="/find-password/phone"
    />
  );
}
