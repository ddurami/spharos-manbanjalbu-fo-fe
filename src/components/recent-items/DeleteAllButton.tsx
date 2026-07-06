"use client";

interface DeleteAllButtonProps {
  onDeleteAll: () => void;
  disabled?: boolean;
}

export function DeleteAllButton({
  onDeleteAll,
  disabled = false,
}: DeleteAllButtonProps) {
  return (
    <div className="ml-auto w-fit">
      <button
        type="button"
        onClick={onDeleteAll}
        disabled={disabled}
        className="text-[16px] font-normal text-[#121212] transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40"
      >
        전체삭제
      </button>
    </div>
  );
}
