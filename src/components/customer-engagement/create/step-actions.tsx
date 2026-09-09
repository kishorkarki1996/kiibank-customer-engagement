"use client";

import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

type StepActionsProps = {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  nextLabel?: string;
  submitLabel?: string;
};

export function StepActions({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onSubmit,
  isSubmitting = false,
  nextLabel = "Continue",
  submitLabel = "Activate engagement",
}: StepActionsProps) {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="flex items-center justify-between border-t bg-muted/30 px-5 py-4 md:px-7">
      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        disabled={isFirstStep || isSubmitting}
      >
        <ArrowLeft className="mr-2 size-4" />
        Back
      </Button>

      {isLastStep ? (
        <Button type="button" onClick={onSubmit} disabled={isSubmitting}>
          <Sparkles className="mr-2 size-4" />

          {isSubmitting ? "Activating..." : submitLabel}
        </Button>
      ) : (
        <Button type="button" onClick={onNext} disabled={isSubmitting}>
          {nextLabel}
          <ArrowRight className="ml-2 size-4" />
        </Button>
      )}
    </div>
  );
}
