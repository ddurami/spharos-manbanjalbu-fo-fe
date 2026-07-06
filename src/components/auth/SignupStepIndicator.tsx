type SignupStepIndicatorProps = {
  currentStep: 1 | 2 | 3;
};

const STEPS = [1, 2, 3] as const;

export function SignupStepIndicator({ currentStep }: SignupStepIndicatorProps) {
  return (
    <ol className="flex items-center justify-center gap-3" aria-label="회원가입 진행 단계">
      {STEPS.map((step) => {
        const isActive = step === currentStep;

        return (
          <li key={step}>
            <span
              aria-current={isActive ? "step" : undefined}
              className={`flex size-7 items-center justify-center rounded-full text-sm font-medium ${
                isActive
                  ? "bg-[#222] text-white"
                  : "border border-[#ddd] bg-white text-[#bbb]"
              }`}
            >
              {step}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
