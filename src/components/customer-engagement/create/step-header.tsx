import { EngagementStep } from "./engagement-stepper";

type StepHeaderProps = {
  currentStep: number;
  steps: EngagementStep[];
  descriptions?: Record<string, string>;
};

export function StepHeader({
  currentStep,
  steps,
  descriptions,
}: StepHeaderProps) {
  const step = steps[currentStep];

  return (
    <div className="border-b px-5 py-5 md:px-7">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
        Step {currentStep + 1} of {steps.length}
      </p>

      <h1 className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">
        {step.label}
      </h1>

      {descriptions?.[step.id] && (
        <p className="mt-1 text-sm text-muted-foreground">
          {descriptions[step.id]}
        </p>
      )}
    </div>
  );
}
