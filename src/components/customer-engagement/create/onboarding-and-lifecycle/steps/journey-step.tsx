"use client";

import { useMemo, useState } from "react";

import { Clock3, Plus, Trash2 } from "lucide-react";

import { AppSelect } from "@/components/common/app-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { JourneyMessageCondition } from "@/components/customer-engagement/create/shared/journey-message-condition";
import { JourneyExitConditions } from "../journey-exit-conditions";
type JourneyCondition = {
  id: number;
  field: string;
  operator: string;
  value: string;
};

type JourneyStepItem = {
  id: number;
  waitValue: number;
  waitUnit: "hours" | "days" | "weeks" | "months";
  template: string;
  channel: string;
  fallback: string;
  conditionMode: "always" | "conditional";
  conditions: JourneyCondition[];
};

const sendOptions = [
  {
    label: "Immediately after entry",
    value: "immediately",
  },
  {
    label: "After a delay",
    value: "after-delay",
  },
];

const messageTemplateOptions = [
  {
    label: "Welcome to KiiBank",
    value: "welcome-to-kiibank",
  },
  {
    label: "What You Can Do With Your KiiBank Account",
    value: "kiibank-account-features",
  },
  {
    label: "Using Your GBP Account",
    value: "using-gbp-account",
  },
  {
    label: "Sending Money With KiiBank",
    value: "sending-money",
  },
  {
    label: "Discover More KiiBank Features",
    value: "discover-more-features",
  },
];

const channelOptions = [
  {
    label: "Push Notification",
    value: "push",
  },
  {
    label: "WhatsApp",
    value: "whatsapp",
  },
  {
    label: "Email",
    value: "email",
  },
  {
    label: "SMS",
    value: "sms",
  },
  {
    label: "In-App",
    value: "in-app",
  },
];

const fallbackOptions = [
  {
    label: "None",
    value: "none",
  },
  {
    label: "Push Notification",
    value: "push",
  },
  {
    label: "WhatsApp",
    value: "whatsapp",
  },
  {
    label: "Email",
    value: "email",
  },
  {
    label: "SMS",
    value: "sms",
  },
  {
    label: "In-App",
    value: "in-app",
  },
];

const waitUnitOptions = [
  {
    label: "Hours",
    value: "hours",
  },
  {
    label: "Days",
    value: "days",
  },
  {
    label: "Weeks",
    value: "weeks",
  },
  {
    label: "Months",
    value: "months",
  },
];

function convertWaitToDays(value: number, unit: JourneyStepItem["waitUnit"]) {
  switch (unit) {
    case "hours":
      return value / 24;

    case "weeks":
      return value * 7;

    case "months":
      return value * 30;

    case "days":
    default:
      return value;
  }
}

function formatJourneyDay(day: number) {
  if (Number.isInteger(day)) {
    return day;
  }

  return day.toFixed(1);
}

export function JourneyStep() {
  const [initialConditionMode, setInitialConditionMode] = useState<
    "always" | "conditional"
  >("always");

  const [initialConditions, setInitialConditions] = useState<
    JourneyCondition[]
  >([]);
  const [send, setSend] = useState("immediately");

  const [initialWaitValue, setInitialWaitValue] = useState(1);

  const [initialWaitUnit, setInitialWaitUnit] =
    useState<JourneyStepItem["waitUnit"]>("days");

  const [initialTemplate, setInitialTemplate] = useState("welcome-to-kiibank");

  const [initialChannel, setInitialChannel] = useState("push");

  const [initialFallback, setInitialFallback] = useState("none");

  const [journeySteps, setJourneySteps] = useState<JourneyStepItem[]>([]);

  const isInitialDelayed = send === "after-delay";

  const initialJourneyDay = isInitialDelayed
    ? convertWaitToDays(initialWaitValue, initialWaitUnit)
    : 0;

  const addJourneyStep = () => {
    setJourneySteps((steps) => [
      ...steps,
      {
        id: Date.now(),
        waitValue: 1,
        waitUnit: "days",
        template: "",
        channel: "email",
        fallback: "none",
        conditionMode: "always",
        conditions: [],
      },
    ]);
  };

  const updateJourneyStep = (id: number, updates: Partial<JourneyStepItem>) => {
    setJourneySteps((steps) =>
      steps.map((step) =>
        step.id === id
          ? {
              ...step,
              ...updates,
            }
          : step,
      ),
    );
  };

  const removeJourneyStep = (id: number) => {
    setJourneySteps((steps) => steps.filter((step) => step.id !== id));
  };

  const journeyTiming = useMemo(() => {
    let accumulatedDays = isInitialDelayed
      ? convertWaitToDays(initialWaitValue, initialWaitUnit)
      : 0;

    return journeySteps.map((step) => {
      accumulatedDays += convertWaitToDays(step.waitValue, step.waitUnit);

      return {
        id: step.id,
        day: accumulatedDays,
      };
    });
  }, [journeySteps, isInitialDelayed, initialWaitValue, initialWaitUnit]);

  const getJourneyDay = (id: number) => {
    return journeyTiming.find((item) => item.id === id)?.day;
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <p className="font-semibold">Journey Step 1</p>
        </div>

        <div className="space-y-5 p-5">
          <div className="grid gap-5 md:grid-cols-2">
            <AppSelect
              label="Send"
              value={send}
              onValueChange={setSend}
              placeholder="Select"
              options={sendOptions}
            />

            {isInitialDelayed && (
              <div className="space-y-2">
                <Label>
                  Wait
                  <span className="ml-1 text-destructive">*</span>
                </Label>

                <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
                  <Input
                    type="number"
                    min={1}
                    value={initialWaitValue}
                    onChange={(event) =>
                      setInitialWaitValue(Number(event.target.value) || 0)
                    }
                  />

                  <AppSelect
                    value={initialWaitUnit}
                    onValueChange={(value) =>
                      setInitialWaitUnit(value as JourneyStepItem["waitUnit"])
                    }
                    options={waitUnitOptions}
                  />
                </div>
              </div>
            )}
          </div>

          {isInitialDelayed && (
            <div className="rounded-lg border bg-muted/30 px-4 py-3">
              <p className="text-xs text-muted-foreground">Journey timing</p>

              <p className="mt-1 text-sm font-medium">
                Day {formatJourneyDay(initialJourneyDay)} after signup
              </p>
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2">
            <AppSelect
              label="Message Template"
              value={initialTemplate}
              onValueChange={setInitialTemplate}
              placeholder="Select Template"
              options={messageTemplateOptions}
              required
            />

            <AppSelect
              label="Channel"
              value={initialChannel}
              onValueChange={setInitialChannel}
              placeholder="Select channel"
              options={channelOptions}
              required
            />

            <AppSelect
              label="Fallback Channel"
              value={initialFallback}
              onValueChange={setInitialFallback}
              placeholder="Select fallback"
              options={fallbackOptions}
            />
          </div>
          <JourneyMessageCondition
            mode={initialConditionMode}
            onModeChange={setInitialConditionMode}
            conditions={initialConditions}
            onConditionsChange={setInitialConditions}
          />
        </div>
      </div>

      {journeySteps.map((step, index) => {
        const journeyDay = getJourneyDay(step.id);

        return (
          <div key={step.id} className="rounded-xl border bg-background">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <div>
                <p className="font-semibold">Journey Step {index + 2}</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Relative to the previous journey step
                </p>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeJourneyStep(step.id)}
                aria-label={`Remove journey step ${index + 2}`}
              >
                <Trash2 className="size-4 text-muted-foreground" />
              </Button>
            </div>

            <div className="space-y-5 p-5">
              <div className="space-y-2">
                <Label>
                  Wait
                  <span className="ml-1 text-destructive">*</span>
                </Label>

                <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
                  <Input
                    type="number"
                    min={1}
                    value={step.waitValue}
                    onChange={(event) =>
                      updateJourneyStep(step.id, {
                        waitValue: Number(event.target.value) || 0,
                      })
                    }
                  />

                  <AppSelect
                    value={step.waitUnit}
                    onValueChange={(value) =>
                      updateJourneyStep(step.id, {
                        waitUnit: value as JourneyStepItem["waitUnit"],
                      })
                    }
                    options={waitUnitOptions}
                  />
                </div>
              </div>

              <div className="rounded-lg border bg-muted/30 px-4 py-3">
                <div className="flex items-start gap-2">
                  <Clock3 className="mt-0.5 size-4 text-muted-foreground" />

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Journey timing
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {journeyDay !== undefined
                        ? `Day ${formatJourneyDay(journeyDay)} after signup`
                        : "Calculated automatically"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <AppSelect
                  label="Then Send"
                  value={step.template}
                  onValueChange={(value) =>
                    updateJourneyStep(step.id, {
                      template: value,
                    })
                  }
                  placeholder="Select message template"
                  options={messageTemplateOptions}
                  required
                />

                <AppSelect
                  label="Channel"
                  value={step.channel}
                  onValueChange={(value) =>
                    updateJourneyStep(step.id, {
                      channel: value,
                    })
                  }
                  placeholder="Select channel"
                  options={channelOptions}
                  required
                />

                <AppSelect
                  label="Fallback"
                  value={step.fallback}
                  onValueChange={(value) =>
                    updateJourneyStep(step.id, {
                      fallback: value,
                    })
                  }
                  placeholder="Select fallback"
                  options={fallbackOptions}
                />
              </div>
            </div>
          </div>
        );
      })}

      <Button type="button" variant="outline" onClick={addJourneyStep}>
        <Plus className="mr-2 size-4" />
        Add Journey Step
      </Button>

      <JourneyExitConditions />
    </div>
  );
}
