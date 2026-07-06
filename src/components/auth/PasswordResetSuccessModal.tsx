type PasswordResetSuccessModalProps = {
  open: boolean;
  onConfirm: () => void;
};

export function PasswordResetSuccessModal({
  open,
  onConfirm,
}: PasswordResetSuccessModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="password-reset-success-title"
        className="w-full max-w-[320px] rounded-2xl border border-[#00704A] bg-white px-6 py-8"
      >
        <div
          id="password-reset-success-title"
          className="space-y-2 text-center text-base font-medium text-[#222]"
        >
          <p>비밀번호가 변경되었어요.</p>
          <p>다시 로그인 해 주세요.</p>
        </div>

        <button
          type="button"
          onClick={onConfirm}
          className="mx-auto mt-8 flex min-w-[120px] items-center justify-center rounded-full border border-[#00704A] px-8 py-2.5 text-sm font-medium text-[#00704A] transition-colors hover:bg-[#00704A]/5"
        >
          확인
        </button>
      </div>
    </div>
  );
}
