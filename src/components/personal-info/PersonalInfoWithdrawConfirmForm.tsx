"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PersonalInfoWithdrawConfirmModal } from "@/components/personal-info/PersonalInfoWithdrawConfirmModal";
import { PersonalInfoWithdrawSuccessModal } from "@/components/personal-info/PersonalInfoWithdrawSuccessModal";
import { ApiError } from "@/lib/api/client";
import { withdrawMember } from "@/lib/api/profile";
import { clearPersonalInfoDraft } from "@/lib/personal-info-session";
import {
  clearWithdrawSession,
  getWithdrawSession,
} from "@/lib/withdraw-session";
import { useAuth } from "@/contexts/auth-context";

export function PersonalInfoWithdrawConfirmForm() {
  const router = useRouter();
  const { logout } = useAuth();
  const [verificationToken, setVerificationToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const session = getWithdrawSession();
    if (!session.verificationToken) {
      router.replace("/mypage/personal-info/withdraw");
      return;
    }

    setVerificationToken(session.verificationToken);
  }, [router]);

  async function handleConfirm() {
    if (!verificationToken || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await withdrawMember({ verificationToken });
      clearWithdrawSession();
      clearPersonalInfoDraft();
      logout();
      setShowConfirmModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      setErrorMessage(
        error instanceof ApiError
          ? error.message
          : "회원 탈퇴에 실패했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCancel() {
    clearWithdrawSession();
    router.push("/mypage/personal-info");
  }

  function handleSuccessConfirm() {
    setShowSuccessModal(false);
    router.replace("/login");
  }

  if (!verificationToken) {
    return null;
  }

  return (
    <>
      <div className="mx-auto w-full max-w-[460px] px-4 py-16">
        {errorMessage && (
          <p className="text-center text-sm text-red-500" role="alert">
            {errorMessage}
          </p>
        )}
      </div>

      <PersonalInfoWithdrawConfirmModal
        open={showConfirmModal}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />

      <PersonalInfoWithdrawSuccessModal
        open={showSuccessModal}
        onConfirm={handleSuccessConfirm}
      />
    </>
  );
}
