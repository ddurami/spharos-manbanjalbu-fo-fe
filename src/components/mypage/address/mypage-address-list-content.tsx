"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { MypageAddressCard } from "@/components/mypage/address/mypage-address-card";
import { useAuth } from "@/contexts/auth-context";
import { fetchAddresses, removeAddress } from "@/lib/address/address-service";
import { ApiError } from "@/lib/api/client";
import type { StoredAddress } from "@/lib/address/types";

export function MypageAddressListContent() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const [addresses, setAddresses] = useState<StoredAddress[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadAddresses = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      setAddresses(await fetchAddresses());
    } catch (error) {
      setLoadError(
        error instanceof ApiError
          ? error.message
          : "배송지 목록을 불러오지 못했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady && !isLoggedIn) {
      router.replace("/login");
    }
  }, [isReady, isLoggedIn, router]);

  useEffect(() => {
    if (isReady && isLoggedIn) {
      void loadAddresses();
    }
  }, [isReady, isLoggedIn, loadAddresses]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("선택한 배송지를 삭제하시겠습니까?")) {
      return;
    }

    try {
      const deleted = await removeAddress(id);
      if (deleted) {
        await loadAddresses();
      }
    } catch (error) {
      window.alert(
        error instanceof ApiError
          ? error.message
          : "배송지 삭제 중 오류가 발생했습니다.",
      );
    }
  };

  if (!isReady || !isLoggedIn) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-[1280px] px-6 py-10 lg:px-10 lg:py-14">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-[28px] font-medium text-foreground sm:text-[32px]">
            배송지 관리
          </h1>
          <Link
            href="/mypage/address/new"
            className="inline-flex h-10 shrink-0 items-center justify-center rounded-full border border-sb-green px-6 text-sm font-medium text-sb-green transition-opacity hover:opacity-70"
          >
            배송지 추가
          </Link>
        </div>

        {loadError ? (
          <div className="border border-destructive/30 bg-destructive/5 px-8 py-4 text-sm text-destructive">
            {loadError}
          </div>
        ) : null}

        {isLoading ? (
          <div className="border border-sb-border px-8 py-16 text-center text-base text-sb-text-muted">
            배송지 목록을 불러오는 중...
          </div>
        ) : addresses.length > 0 ? (
          <div className="grid grid-cols-1 border-t border-l border-sb-border md:grid-cols-2">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="border-r border-b border-sb-border"
              >
                <MypageAddressCard address={address} onDelete={handleDelete} />
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-sb-border px-8 py-16 text-center text-base text-sb-text-muted">
            등록된 배송지가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
