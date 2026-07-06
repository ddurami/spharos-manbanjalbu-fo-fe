import Link from "next/link";

import { formatAddressListLine } from "@/lib/address/format-address";
import type { StoredAddress } from "@/lib/address/types";

type MypageAddressCardProps = {
  address: StoredAddress;
  onDelete: (id: string) => void;
};

export function MypageAddressCard({ address, onDelete }: MypageAddressCardProps) {
  const title = address.nickname
    ? `${address.recipient} (${address.nickname})`
    : address.recipient;

  return (
    <article className="flex h-full flex-col gap-4 p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-medium text-foreground">{title}</h2>
          {address.isDefault ? (
            <span className="inline-flex h-6 items-center rounded-full border border-sb-green px-2.5 text-xs font-medium text-sb-green">
              기본
            </span>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-3 text-sm text-sb-text-muted">
          <Link
            href={`/mypage/address/${address.id}/edit`}
            className="transition-opacity hover:text-foreground hover:opacity-70"
          >
            수정
          </Link>
          {!address.isDefault ? (
            <>
              <span aria-hidden>|</span>
              <button
                type="button"
                onClick={() => onDelete(address.id)}
                className="transition-opacity hover:text-foreground hover:opacity-70"
              >
                삭제
              </button>
            </>
          ) : null}
        </div>
      </div>

      <div className="space-y-2 text-sm leading-relaxed text-sb-text-secondary">
        <p>{formatAddressListLine(address)}</p>
        <p>{address.phone1}</p>
      </div>
    </article>
  );
}
