"use client";

import { useRouter } from "next/navigation";
import { SignupPhoneVerifyForm } from "@/components/auth/SignupPhoneVerifyForm";
import { ApiError } from "@/lib/api/client";
import { verifyAccountForPasswordReset } from "@/lib/api/member";
import { useAuth } from "@/contexts/auth-context";
import { updatePersonalInfoPasswordSession } from "@/lib/personal-info-session";
import type { VerificationConfirmResponse } from "@/types/member";

export function PersonalInfoPasswordPhoneVerifyForm() {
  const router = useRouter();
  const { member } = useAuth();

  async function handleVerified(result: VerificationConfirmResponse) {
    try {
      const verifyResult = await verifyAccountForPasswordReset(
        result.verificationToken,
      );

      if (member?.loginId && verifyResult.loginId !== member.loginId) {
        throw new ApiError("본인 계정만 비밀번호를 변경할 수 있습니다.");
      }

      updatePersonalInfoPasswordSession({
        verificationToken: result.verificationToken,
        loginId: verifyResult.loginId,
      });

      router.push("/mypage/personal-info/password/reset");
    } catch (error) {
      throw error instanceof ApiError
        ? error
        : new ApiError("계정 확인에 실패했습니다.");
    }
  }

  return <SignupPhoneVerifyForm onVerified={handleVerified} />;
}
