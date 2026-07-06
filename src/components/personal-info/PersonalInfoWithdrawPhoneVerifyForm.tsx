"use client";

import { useRouter } from "next/navigation";
import { SignupPhoneVerifyForm } from "@/components/auth/SignupPhoneVerifyForm";
import { updateWithdrawSession } from "@/lib/withdraw-session";
import type { VerificationConfirmResponse } from "@/types/member";

export function PersonalInfoWithdrawPhoneVerifyForm() {
  const router = useRouter();

  async function handleVerified(result: VerificationConfirmResponse) {
    updateWithdrawSession({
      verificationToken: result.verificationToken,
    });
    router.push("/mypage/personal-info/withdraw/confirm");
  }

  return <SignupPhoneVerifyForm onVerified={handleVerified} />;
}
