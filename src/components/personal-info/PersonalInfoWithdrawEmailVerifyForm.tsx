"use client";

import { useRouter } from "next/navigation";
import { SignupEmailVerifyForm } from "@/components/auth/SignupEmailVerifyForm";
import { updateWithdrawSession } from "@/lib/withdraw-session";
import type { VerificationConfirmResponse } from "@/types/member";

export function PersonalInfoWithdrawEmailVerifyForm() {
  const router = useRouter();

  async function handleVerified(result: VerificationConfirmResponse) {
    updateWithdrawSession({
      verificationToken: result.verificationToken,
    });
    router.push("/mypage/personal-info/withdraw/confirm");
  }

  return <SignupEmailVerifyForm onVerified={handleVerified} />;
}
