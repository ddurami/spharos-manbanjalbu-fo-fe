"use client";

import { useEffect, useRef } from "react";

import { embedDaumPostcode, type DaumPostcodeResult } from "@/lib/address/daum-postcode";

type AddressPostcodeLayerProps = {
  open: boolean;
  onClose: () => void;
  onComplete: (result: DaumPostcodeResult) => void;
  onError?: () => void;
};

export function AddressPostcodeLayer({
  open,
  onClose,
  onComplete,
  onError,
}: AddressPostcodeLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const onCompleteRef = useRef(onComplete);
  const onErrorRef = useRef(onError);

  onCloseRef.current = onClose;
  onCompleteRef.current = onComplete;
  onErrorRef.current = onError;

  useEffect(() => {
    if (!open || !containerRef.current) {
      return;
    }

    let cancelled = false;

    embedDaumPostcode(containerRef.current, (result) => {
      onCompleteRef.current(result);
    }).catch(() => {
      if (!cancelled) {
        onErrorRef.current?.();
        onCloseRef.current();
      }
    });

    return () => {
      cancelled = true;
      containerRef.current?.replaceChildren();
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[500px] overflow-hidden rounded-lg bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-label="우편번호 검색"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-sb-border px-4 py-3">
          <p className="text-base font-medium text-foreground">주소 검색</p>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-sb-text-muted transition-opacity hover:text-foreground hover:opacity-70"
          >
            닫기
          </button>
        </div>
        <div ref={containerRef} className="h-[480px] w-full" />
      </div>
    </div>
  );
}
