"use client";

import { ArrowLeft, ArrowRight, Rocket, Save, Send } from "lucide-react";

import { Button } from "@/components/ui/button";

type StepActionsProps = {
  currentStep: number;
  totalSteps: number;

  onBack: () => void;
  onNext: () => void;
  onSaveDraft: () => void;

  onActivate?: () => void;
  onSubmitForApproval?: () => void;

  canActivateDirectly?: boolean;

  isSaving?: boolean;
  isSubmitting?: boolean;

  nextLabel?: string;
};

export function StepActions({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onSaveDraft,
  onActivate,
  onSubmitForApproval,
  canActivateDirectly = false,
  isSaving = false,
  isSubmitting = false,
  nextLabel = "Continue",
}: StepActionsProps) {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="flex flex-col gap-3 border-t bg-muted/30 px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-7">
      {/* Left */}

      <div>
        {!isFirstStep && (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isSaving || isSubmitting}
          >
            <ArrowLeft className="mr-2 size-4" />
            Back
          </Button>
        )}
      </div>

      {/* Right */}

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Button
          type="button"
          variant="outline"
          onClick={onSaveDraft}
          disabled={isSaving || isSubmitting}
        >
          <Save className="mr-2 size-4" />

          {isSaving ? "Saving..." : "Save as Draft"}
        </Button>

        {!isLastStep && (
          <Button
            type="button"
            onClick={onNext}
            disabled={isSaving || isSubmitting}
          >
            {nextLabel}

            <ArrowRight className="ml-2 size-4" />
          </Button>
        )}

        {isLastStep && canActivateDirectly && (
          <Button
            type="button"
            onClick={onActivate}
            disabled={isSaving || isSubmitting}
          >
            <Rocket className="mr-2 size-4" />

            {isSubmitting ? "Activating..." : "Activate Engagement"}
          </Button>
        )}

        {isLastStep && !canActivateDirectly && (
          <Button
            type="button"
            onClick={onSubmitForApproval}
            disabled={isSaving || isSubmitting}
          >
            <Send className="mr-2 size-4" />

            {isSubmitting ? "Submitting..." : "Submit for Approval"}
          </Button>
        )}
      </div>
    </div>
  );
}
