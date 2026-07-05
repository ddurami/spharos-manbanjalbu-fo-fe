"use client";

import Link from "next/link";

import { formatAddressLine } from "@/lib/address/format-address";
import type { ShippingAddress } from "@/lib/address/types";
import { cn } from "@/lib/utils";

type AddressCardProps = {
  address: ShippingAddress;
  onDelete?: (id: string) => void;
  className?: string;
};

export function AddressCard({ address, onDelete, className }: AddressCardProps) {
  return (
    <article className={cn("flex flex-col gap-3 py-8", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-medium text-foreground">
            {address.recipient} ({address.nickname})
          </h2>
          {address.isDefault ? (
            <span className="rounded border border-primary px-2 py-0.5 text-xs text-primary">
              기본
            </span>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-2 text-sm text-sb-text-muted">
          <Link
            href={`/mypage/addresses/${address.id}/edit`}
            className="transition-colors hover:text-primary"
          >
            수정
          </Link>
          {!address.isDefault ? (
            <>
              <span aria-hidden className="text-sb-border">
                |
              </span>
              <button
                type="button"
                className="transition-colors hover:text-primary"
                onClick={() => onDelete?.(address.id)}
              >
                삭제
              </button>
            </>
          ) : null}
        </div>
      </div>

      <p className="text-base leading-relaxed text-sb-text-secondary">
        {formatAddressLine(address)}
      </p>
      <p className="text-base text-sb-text-muted">{address.phone}</p>
    </article>
  );
}
