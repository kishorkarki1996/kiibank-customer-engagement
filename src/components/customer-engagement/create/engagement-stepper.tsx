import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export type EngagementStep = {
  id: string;
  label: string;
};

type EngagementStepperProps = {
  steps: EngagementStep[];
  currentStep: number;
  onStepChange: (step: number) => void;
};

export function EngagementStepper({
  steps,
  currentStep,
  onStepChange,
}: EngagementStepperProps) {
  return (
    <aside>
      <div className="sticky top-24 space-y-1">
        {steps.map((step, index) => {
          const completed = index < currentStep;
          const active = index === currentStep;
          const disabled = index > currentStep;

          return (
            <button
              key={step.id}
              type="button"
              disabled={disabled}
              onClick={() => {
                if (completed) {
                  onStepChange(index);
                }
              }}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm",
                active && "bg-background font-semibold shadow-sm",
                completed && "hover:bg-background",
                disabled && "cursor-not-allowed text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "grid size-6 shrink-0 place-items-center rounded-full border text-xs",
                  completed &&
                    "border-primary bg-primary text-primary-foreground",
                  active && "border-primary text-primary",
                )}
              >
                {completed ? <Check className="size-3.5" /> : index + 1}
              </span>

              {step.label}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
