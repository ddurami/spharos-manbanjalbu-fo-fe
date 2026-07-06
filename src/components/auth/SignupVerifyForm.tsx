"use client";

import { AuthVerifyMethodForm } from "@/components/auth/AuthVerifyMethodForm";
import { updateSignupSession } from "@/lib/signup-session";

export function SignupVerifyForm() {
  return (
    <AuthVerifyMethodForm
      emailHref="/signup/email"
      phoneHref="/signup/phone"
      onMethodSelect={(method) => updateSignupSession({ verifyMethod: method })}
    />
  );
}
