"use client";

import { useRouter } from "next/navigation";
import { SignupEmailVerifyForm } from "@/components/auth/SignupEmailVerifyForm";
import { ApiError } from "@/lib/api/client";
import { verifyAccountForPasswordReset } from "@/lib/api/member";
import { updateFindPasswordSession } from "@/lib/find-password-session";
import type { VerificationConfirmResponse } from "@/types/member";

export function FindIdEmailVerifyForm() {
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
        `/find-id/result?loginId=${encodeURIComponent(verifyResult.loginId)}`,
      );
    } catch (error) {
      throw error instanceof ApiError
        ? error
        : new ApiError("아이디 조회에 실패했습니다.");
    }
  }

  return <SignupEmailVerifyForm onVerified={handleVerified} />;
}
