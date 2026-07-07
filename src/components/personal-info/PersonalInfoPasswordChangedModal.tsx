type PersonalInfoPasswordChangedModalProps = {
  open: boolean;
  onConfirm: () => void;
};

export function PersonalInfoPasswordChangedModal({
  open,
  onConfirm,
}: PersonalInfoPasswordChangedModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="personal-info-password-changed-title"
        className="w-full max-w-[360px] rounded-2xl border border-[#00704A] bg-white px-6 py-8"
      >
        <div
          id="personal-info-password-changed-title"
          className="space-y-2 text-center text-base font-medium text-[#222]"
        >
          <p>비밀번호가 변경되었습니다.</p>
          <p>
            개인정보 관리 &gt; &quot;개인정보 수정&quot;을 눌러주세요.
          </p>
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
