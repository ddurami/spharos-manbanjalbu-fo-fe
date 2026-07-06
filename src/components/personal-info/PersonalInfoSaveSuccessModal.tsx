type PersonalInfoSaveSuccessModalProps = {
  open: boolean;
  onConfirm: () => void;
};

export function PersonalInfoSaveSuccessModal({
  open,
  onConfirm,
}: PersonalInfoSaveSuccessModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="personal-info-save-success-title"
        className="w-full max-w-[360px] rounded-2xl border border-[#00704A] bg-white px-6 py-10"
      >
        <p
          id="personal-info-save-success-title"
          className="text-center text-base font-medium text-[#222]"
        >
          정상적으로 정보가 수정되었습니다.
        </p>

        <button
          type="button"
          onClick={onConfirm}
          className="mx-auto mt-10 flex min-w-[120px] items-center justify-center rounded-full border border-[#00704A] px-8 py-2.5 text-sm font-medium text-[#00704A] transition-colors hover:bg-[#00704A]/5"
        >
          확인
        </button>
      </div>
    </div>
  );
}
