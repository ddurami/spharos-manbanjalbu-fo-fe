type PersonalInfoWithdrawConfirmModalProps = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isSubmitting?: boolean;
};

export function PersonalInfoWithdrawConfirmModal({
  open,
  onConfirm,
  onCancel,
  isSubmitting = false,
}: PersonalInfoWithdrawConfirmModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="withdraw-confirm-title"
        className="w-full max-w-[360px] rounded-2xl border border-[#00704A] bg-white px-6 py-10"
      >
        <p
          id="withdraw-confirm-title"
          className="text-center text-base font-medium text-[#222]"
        >
          정말로 탈퇴하시겠습니까?
        </p>

        <div className="mx-auto mt-10 flex max-w-[280px] items-center justify-center gap-3">
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="flex min-w-[120px] flex-1 items-center justify-center rounded-full border border-[#00704A] px-6 py-2.5 text-sm font-medium text-[#00704A] transition-colors hover:bg-[#00704A]/5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "처리 중..." : "확인"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex min-w-[120px] flex-1 items-center justify-center rounded-full border border-[#00704A] px-6 py-2.5 text-sm font-medium text-[#00704A] transition-colors hover:bg-[#00704A]/5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
