"use client";

import { XIcon } from "lucide-react";

interface ShareAlertProps {
  open: boolean;
  onClose: () => void;
  shareUrl?: string;
  shareTitle?: string;
}

function KakaoShareButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex size-[100px] items-center justify-center rounded-full bg-[#FEE500] transition-opacity hover:opacity-90"
      aria-label="카카오톡 공유"
    >
      <span className="relative flex size-[52px] items-center justify-center rounded-[18px] bg-[#3B1E1E] after:absolute after:-bottom-[6px] after:left-1/2 after:size-3 after:-translate-x-1/2 after:rotate-45 after:bg-[#3B1E1E] after:content-['']">
        <span className="relative z-10 text-[13px] font-bold tracking-tight text-[#FEE500]">
          TALK
        </span>
      </span>
    </button>
  );
}

function UrlShareButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex size-[100px] items-center justify-center rounded-full bg-[#555555] text-[22px] font-bold text-white transition-opacity hover:opacity-90"
      aria-label="URL 복사"
    >
      URL
    </button>
  );
}

export function ShareAlert({
  open,
  onClose,
  shareUrl,
  shareTitle,
}: ShareAlertProps) {
  if (!open) return null;

  const url = shareUrl ?? (typeof window !== "undefined" ? window.location.href : "");
  const title = shareTitle ?? "스타벅스 상품";

  const handleUrlCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // 클립보드 API 미지원 환경
    }
  };

  const handleKakaoShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // 사용자 취소 등
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-[#000000]/15"
        aria-label="알림 닫기"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-alert-title"
        className="relative w-[480px] border border-[#00A864] bg-white px-10 pt-14 pb-12"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-0 right-0 flex size-10 items-center justify-center bg-[#00A864] text-white transition-colors hover:bg-[#009658]"
          aria-label="닫기"
        >
          <XIcon className="size-5" strokeWidth={2.5} />
        </button>

        <h2
          id="share-alert-title"
          className="text-center text-[18px] font-medium text-[#121212]"
        >
          상품 공유하기
        </h2>

        <div className="mt-10 flex items-center justify-center gap-10">
          <KakaoShareButton onClick={handleKakaoShare} />
          <UrlShareButton onClick={handleUrlCopy} />
        </div>
      </div>
    </div>
  );
}
