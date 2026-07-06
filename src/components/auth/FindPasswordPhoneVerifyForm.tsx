"use client";

import { useRouter } from "next/navigation";
import { SignupPhoneVerifyForm } from "@/components/auth/SignupPhoneVerifyForm";
import { ApiError } from "@/lib/api/client";
import { verifyAccountForPasswordReset } from "@/lib/api/member";
import { updateFindPasswordSession } from "@/lib/find-password-session";
import type { VerificationConfirmResponse } from "@/types/member";

export function FindPasswordPhoneVerifyForm() {
  const router = useRouter();

  async function handleVerified(result: VerificationConfirmResponse) {
    try {
      const verifyResult = await verifyAccountForPasswordReset(
        result.verificationToken,
      );

      updateFindPasswordSession({
        verificationToken: result.verificationToken,
        loginId: verifyResult.loginId,
      });

      router.push(
        `/find-password/reset?loginId=${encodeURIComponent(verifyResult.loginId)}`,
      );
    } catch (error) {
      throw error instanceof ApiError
        ? error
        : new ApiError("계정 확인에 실패했습니다.");
    }
  }

  return <SignupPhoneVerifyForm onVerified={handleVerified} />;
}
