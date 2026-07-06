type MypageWelcomeProps = {
  name: string;
};

export function MypageWelcome({ name }: MypageWelcomeProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[28px] font-medium leading-tight text-foreground sm:text-[32px]">
        {name.trim()}님
      </p>
      <p className="text-[28px] font-bold leading-tight text-foreground sm:text-[32px]">
        환영합니다!
      </p>
    </div>
  );
}
