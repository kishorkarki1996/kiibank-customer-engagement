"use client";

import { useState } from "react";

import { EngagementStepper } from "../engagement-stepper";
import { StepActions } from "../step-actions";
import { StepHeader } from "../step-header";
import { BasicInformationStep } from "./steps/basic-information";
import { AudienceStep } from "./steps/audience";

const steps = [
  {
    id: "basic-information",
    label: "Basic information",
  },
  {
    id: "audience",
    label: "Audience",
  },
  {
    id: "entry-trigger",
    label: "Entry trigger",
  },
  {
    id: "journey",
    label: "Journey",
  },
  {
    id: "review",
    label: "Review",
  },
];

export function OnboardingBuilder() {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
  };

  const back = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  return (
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

          {/* {currentStep === 2 && (
            <EntryTriggerStep />
          )}

          {currentStep === 3 && (
            <JourneyStep />
          )}

          {currentStep === 4 && (
            <ReviewStep />
          )} */}
        </div>

        <StepActions
          currentStep={currentStep}
          totalSteps={steps.length}
          onBack={back}
          onNext={next}
        />
      </section>
    </div>
  );
}
