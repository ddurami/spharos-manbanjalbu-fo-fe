"use client";

import { useEffect } from "react";
import { AuthVerifyMethodForm } from "@/components/auth/AuthVerifyMethodForm";
import { clearFindIdSession, updateFindIdSession } from "@/lib/find-id-session";

export function FindIdVerifyForm() {
  useEffect(() => {
    clearFindIdSession();
  }, []);

  return (
    <AuthVerifyMethodForm
      emailHref="/find-id/email"
      phoneHref="/find-id/phone"
      onMethodSelect={(method) => updateFindIdSession({ verifyMethod: method })}
    />
  );
}
