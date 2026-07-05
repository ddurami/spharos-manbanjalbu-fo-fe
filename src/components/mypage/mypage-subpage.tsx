import Link from "next/link";

type MypageSubpageProps = {
  title: string;
  description: string;
};

export function MypageSubpage({ title, description }: MypageSubpageProps) {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <div className="px-[50px] py-[50px] lg:px-[300px]">
        <Link
          href="/mypage"
          className="mb-6 inline-flex text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          ← 마이페이지로 돌아가기
        </Link>
        <h1 className="text-[36px] font-medium text-foreground">{title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        <p className="mt-8 rounded-lg border border-sb-border bg-sb-green-soft px-6 py-5 text-base text-muted-foreground">
          해당 기능은 준비 중입니다.
        </p>
      </div>
    </div>
  );
}
