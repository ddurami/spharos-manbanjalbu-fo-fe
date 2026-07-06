type DuplicateIdModalProps = {
  open: boolean;
  onClose: () => void;
};

export function DuplicateIdModal({ open, onClose }: DuplicateIdModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="duplicate-id-title"
        className="w-full max-w-[320px] rounded-2xl border border-[#00704A] bg-white px-6 py-8"
      >
        <p
          id="duplicate-id-title"
          className="text-center text-base font-medium text-[#222]"
        >
          이미 가입되어 있는 ID 입니다.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mx-auto mt-8 flex min-w-[120px] items-center justify-center rounded-full border border-[#00704A] px-8 py-2.5 text-sm font-medium text-[#00704A] transition-colors hover:bg-[#00704A]/5"
        >
          확인
        </button>
      </div>
    </div>
  );
}
