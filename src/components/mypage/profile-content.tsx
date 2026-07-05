"use client";

import Link from "next/link";

import { useMemberProfile } from "@/hooks/use-member-profile";
import { maskName } from "@/lib/mypage/mask-name";

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-sb-border py-4 sm:flex-row sm:items-center sm:gap-6">
      <span className="w-28 shrink-0 text-sm text-muted-foreground">{label}</span>
      <span className="text-base text-foreground">{value}</span>
    </div>
  );
}

export function ProfileContent() {
  const { profile, isLoading, error } = useMemberProfile();

  if (isLoading) {
    return (
      <p className="py-12 text-center text-muted-foreground">불러오는 중...</p>
    );
  }

  if (error || !profile) {
    return (
      <p className="py-12 text-center text-destructive">
        {error ?? "회원 정보를 불러오지 못했습니다."}
      </p>
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-white">
      <div className="px-[50px] py-[50px] lg:px-[300px]">
        <Link
          href="/mypage"
          className="mb-6 inline-flex text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          ← 마이페이지로 돌아가기
        </Link>
        <h1 className="text-[36px] font-medium text-foreground">개인정보 관리</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {maskName(profile.name)}님의 회원 정보입니다.
        </p>

        <div className="mt-10 border-t border-sb-border">
          <ProfileField label="이름" value={maskName(profile.name)} />
          <ProfileField label="아이디" value={profile.memberId} />
          <ProfileField label="이메일" value={profile.email} />
          <ProfileField label="휴대폰" value={profile.phone} />
          <ProfileField label="가입일" value={profile.joinedAt.replace(/-/g, ".")} />
        </div>
      </div>
    </div>
  );
}
