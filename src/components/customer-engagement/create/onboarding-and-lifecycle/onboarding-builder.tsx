"use client";

import { useState } from "react";
import { CheckCircle2, Rocket, Send } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { EngagementStepper } from "../engagement-stepper";
import { StepActions } from "../step-actions";
import { StepHeader } from "../step-header";

import { BasicInformationStep } from "./steps/basic-information";
import { AudienceStep } from "./steps/audience";
import { EntryTriggerStep } from "./steps/entry-trigger";
import { JourneyStep } from "./steps/journey-step";
import { CommunicationControlsStep } from "./steps/communication-control-step";
import { PreviewStep } from "./steps/preview-step";
import { TestStep } from "./steps/test-step";
import { ReviewActivateStep } from "./steps/review-activate-step";

const steps = [
  {
    id: "basic-information",
    label: "Basic information",
  },
  {
    id: "audience",
    label: "Customer audience",
  },
  {
    id: "entry-trigger",
    label: "Entry trigger",
  },
  {
    id: "journey",
    label: "Build journey",
  },
  {
    id: "communication-controls",
    label: "Communication controls",
  },
  {
    id: "preview-journey",
    label: "Preview Journey",
  },
  {
    id: "test",
    label: "Test",
  },
  {
    id: "review-activate",
    label: "Review & Activate",
  },
];

export function OnboardingBuilder() {
  const [currentStep, setCurrentStep] = useState(0);

  const [isSaving, setIsSaving] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [activateOpen, setActivateOpen] = useState(false);

  const [approvalOpen, setApprovalOpen] = useState(false);

  const [activationSuccessOpen, setActivationSuccessOpen] = useState(false);

  const [approvalSuccessOpen, setApprovalSuccessOpen] = useState(false);

  /**
   * Temporary permission simulation.
   *
   * true:
   * Save as Draft + Activate Engagement
   *
   * false:
   * Save as Draft + Submit for Approval
   */
  const canActivateDirectly = true;

  const next = () => {
    setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
  };

  const back = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);

    try {
      /**
       * TODO:
       * Save the current engagement configuration.
       *
       * This should work from every step.
       */

      await new Promise((resolve) => setTimeout(resolve, 700));

      console.log("Engagement saved as draft");
    } finally {
      setIsSaving(false);
    }
  };

  const confirmActivate = async () => {
    setIsSubmitting(true);

    try {
      /**
       * TODO:
       *
       * 1. Validate engagement
       * 2. Call activation API / server action
       * 3. Change status to Active
       * 4. Store activatedBy
       * 5. Store activatedAt
       */

      await new Promise((resolve) => setTimeout(resolve, 900));

      setActivateOpen(false);

      setActivationSuccessOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmSubmitForApproval = async () => {
    setIsSubmitting(true);

    try {
      /**
       * TODO:
       *
       * 1. Validate engagement
       * 2. Save latest configuration
       * 3. Change status to Pending Approval
       * 4. Create approval request
       * 5. Notify approver(s)
       */

      await new Promise((resolve) => setTimeout(resolve, 900));

      setApprovalOpen(false);

      setApprovalSuccessOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:px-6 lg:grid-cols-[230px_minmax(0,1fr)]">
        <EngagementStepper
          steps={steps}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />

        <section className="overflow-hidden rounded-xl border bg-background">
          <StepHeader currentStep={currentStep} steps={steps} />

          <div className="p-5 md:p-7">
            {currentStep === 0 && <BasicInformationStep />}

            {currentStep === 1 && <AudienceStep />}

            {currentStep === 2 && <EntryTriggerStep />}

            {currentStep === 3 && <JourneyStep />}

            {currentStep === 4 && <CommunicationControlsStep />}

            {currentStep === 5 && <PreviewStep />}

            {currentStep === 6 && <TestStep />}

            {currentStep === 7 && <ReviewActivateStep />}
          </div>

          <StepActions
            currentStep={currentStep}
            totalSteps={steps.length}
            onBack={back}
            onNext={next}
            onSaveDraft={handleSaveDraft}
            onActivate={() => setActivateOpen(true)}
            onSubmitForApproval={() => setApprovalOpen(true)}
            canActivateDirectly={canActivateDirectly}
            isSaving={isSaving}
            isSubmitting={isSubmitting}
          />
        </section>
      </div>

      {/* ---------------------------------------------------- */}
      {/* Activate Engagement Confirmation                    */}
      {/* ---------------------------------------------------- */}

      <AlertDialog open={activateOpen} onOpenChange={setActivateOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Activate engagement?</AlertDialogTitle>

            <AlertDialogDescription>
              Once activated, eligible customers can begin entering this journey
              based on the configured audience and entry trigger.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={(event) => {
                /**
                 * Prevent AlertDialog from closing
                 * automatically so the loading state
                 * remains visible.
                 */
                event.preventDefault();

                confirmActivate();
              }}
              disabled={isSubmitting}
            >
              <Rocket className="mr-2 size-4" />

              {isSubmitting ? "Activating..." : "Activate Engagement"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ---------------------------------------------------- */}
      {/* Submit For Approval Confirmation                    */}
      {/* ---------------------------------------------------- */}

      <AlertDialog open={approvalOpen} onOpenChange={setApprovalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Send className="size-5" />
            </div>

            <AlertDialogTitle>Submit engagement for approval?</AlertDialogTitle>

            <AlertDialogDescription>
              This engagement will be sent to an authorised approver for review.
              It will not become active until it has been approved.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />

              <div>
                <p className="text-sm font-medium">Ready for approval</p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  The current engagement configuration will be submitted for
                  review.
                </p>
              </div>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();

                confirmSubmitForApproval();
              }}
              disabled={isSubmitting}
            >
              <Send className="mr-2 size-4" />

              {isSubmitting ? "Submitting..." : "Submit for Approval"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ---------------------------------------------------- */}
      {/* Activation Success                                  */}
      {/* ---------------------------------------------------- */}

      <Dialog
        open={activationSuccessOpen}
        onOpenChange={setActivationSuccessOpen}
      >
        <DialogContent showCloseButton={false}>
          <div className="flex flex-col items-center py-4 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="size-6" />
            </div>

            <h2 className="mt-4 text-lg font-semibold">Engagement activated</h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              New Customer Welcome Journey is now active. Eligible customers can
              begin entering the journey according to the configured trigger and
              audience rules.
            </p>

            <Button
              type="button"
              className="mt-6"
              onClick={() => {
                setActivationSuccessOpen(false);

                /**
                 * TODO:
                 *
                 * router.push(
                 *   "/customer-engagement/engagements"
                 * );
                 *
                 * Or preferably:
                 *
                 * router.push(
                 *   "/customer-engagement/engagements/[id]"
                 * );
                 */
              }}
            >
              View Engagement
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ---------------------------------------------------- */}
      {/* Approval Submission Success                         */}
      {/* ---------------------------------------------------- */}

      <Dialog open={approvalSuccessOpen} onOpenChange={setApprovalSuccessOpen}>
        <DialogContent showCloseButton={false}>
          <div className="flex flex-col items-center py-4 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="size-6" />
            </div>

            <h2 className="mt-4 text-lg font-semibold">
              Submitted for approval
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              New Customer Welcome Journey has been submitted successfully. An
              authorised approver can now review the engagement before it
              becomes active.
            </p>

            <Button
              type="button"
              className="mt-6"
              onClick={() => {
                setApprovalSuccessOpen(false);

                /**
                 * TODO:
                 *
                 * router.push(
                 *   "/customer-engagement/engagements"
                 * );
                 *
                 * Or open the engagement detail page
                 * showing Pending Approval status.
                 */
              }}
            >
              View Engagement
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
