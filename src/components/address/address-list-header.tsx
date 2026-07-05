import Link from "next/link";

import { Button } from "@/components/ui/button";

const outlineButtonClassName =
  "h-10 shrink-0 rounded-full border-[1.5px] border-primary px-5 text-[17px] tracking-tight text-primary hover:bg-sb-green-soft hover:text-primary";

export function AddressListHeader() {
  return (
    <div className="flex items-center justify-between gap-4">
      <h1 className="text-[36px] font-medium text-foreground">배송지 관리</h1>
      <Link href="/mypage/addresses/new">
        <Button variant="outline" className={outlineButtonClassName}>
          배송지 추가
        </Button>
      </Link>
    </div>
  );
}
