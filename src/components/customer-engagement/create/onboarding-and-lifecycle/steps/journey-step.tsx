"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { AppSelect } from "@/components/common/app-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  JourneyConditionBlock,
  JourneyMessageCondition,
} from "@/components/customer-engagement/create/shared/journey-message-condition";
import {
  channelOptions,
  DeliveryChannelTemplateFields,
  DeliveryOrder,
  FallbackDeliverySection,
  type FallbackDelivery,
} from "@/components/customer-engagement/create/shared/delivery-channel-template";

type WaitUnit = "hours" | "days" | "weeks" | "months";

type JourneyStepItem = {
  id: number;
  action: string;
  waitValue: number;
  waitUnit: WaitUnit;
  template: string;
  channel: string;
  fallback: FallbackDelivery[];
  conditionMode: "always" | "conditional";
  conditionBlocks: JourneyConditionBlock[];
};

const actionOptions = [
  {
    label: "Immediately after entry",
    value: "immediately",
  },
  {
    label: "Delayed Notification",
    value: "delayed-notification",
  },
];

const subsequentActionOptions = [
  {
    label: "Immediately after entry",
    value: "immediately",
  },
  {
    label: "After a delay",
    value: "after-delay",
  },
];

const forcedDelayedActionOptions = [
  {
    label: "Delayed Notification",
    value: "delayed-notification",
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

function isDelayedAction(action: string) {
  return action === "after-delay" || action === "delayed-notification";
}

function formatWait(value: number, unit: WaitUnit) {
  const unitLabels: Record<WaitUnit, string> = {
    hours: "hour",
    days: "day",
    weeks: "week",
    months: "month",
  };

  const label = unitLabels[unit];

  return `${value} ${value === 1 ? label : `${label}s`}`;
}

function formatJourneyTiming(steps: JourneyStepItem[]) {
  const activeSteps = steps.filter(
    (step) => isDelayedAction(step.action) && step.waitValue > 0,
  );

  if (activeSteps.length === 0) {
    return "Immediately after signup";
  }

  const totals: Record<WaitUnit, number> = {
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
  };

  activeSteps.forEach((step) => {
    totals[step.waitUnit] += step.waitValue;
  });

  const parts: string[] = [];

  if (totals.months > 0) {
    parts.push(`${totals.months} ${totals.months === 1 ? "month" : "months"}`);
  }

  if (totals.weeks > 0) {
    parts.push(`${totals.weeks} ${totals.weeks === 1 ? "week" : "weeks"}`);
  }

  if (totals.days > 0) {
    parts.push(`${totals.days} ${totals.days === 1 ? "day" : "days"}`);
  }

  if (totals.hours > 0) {
    parts.push(`${totals.hours} ${totals.hours === 1 ? "hour" : "hours"}`);
  }

  return `${parts.join(", ")} after signup`;
}

export function JourneyStep() {
  const [conditionBlocks, setConditionBlocks] = useState<
    JourneyConditionBlock[]
  >([]);

  const [mode, setMode] = useState<"always" | "conditional">("always");

  const [initialAction, setInitialAction] = useState("immediately");

  const [initialWaitValue, setInitialWaitValue] = useState(1);

  const [initialWaitUnit, setInitialWaitUnit] = useState<WaitUnit>("days");

  const [initialTemplate, setInitialTemplate] = useState("");

  const [initialChannel, setInitialChannel] = useState("");

  const [initialFallback, setInitialFallback] = useState<FallbackDelivery[]>(
    [],
  );

  const [journeySteps, setJourneySteps] = useState<JourneyStepItem[]>([]);

  const isInitialDelayed = initialAction === "delayed-notification";

  const initialJourneyTiming = isInitialDelayed
    ? `${formatWait(initialWaitValue, initialWaitUnit)} after signup`
    : "Immediately after signup";

  /*
   * --------------------------------------------------
   * Effective Send Logic
   * --------------------------------------------------
   *
   * Journey Step 2:
   * depends on Journey Step 1.
   *
   * Journey Step 3:
   * depends on the EFFECTIVE action of Journey Step 2.
   *
   * Journey Step 4:
   * depends on the EFFECTIVE action of Journey Step 3.
   *
   * This allows Delayed Notification to cascade.
   */

  const getEffectiveAction = (index: number): string => {
    const step = journeySteps[index];

    if (!step) {
      return "immediately";
    }

    /*
     * First generated journey step = Journey Step 2.
     * Its previous step is Journey Step 1.
     */
    if (index === 0) {
      if (isDelayedAction(initialAction)) {
        return "delayed-notification";
      }

      return step.action;
    }

    /*
     * Journey Step 3+ checks the effective
     * action of the immediately preceding step.
     */
    const previousEffectiveAction = getEffectiveAction(index - 1);

    if (isDelayedAction(previousEffectiveAction)) {
      return "delayed-notification";
    }

    return step.action;
  };

  const isSendLocked = (index: number) => {
    /*
     * Journey Step 2
     */
    if (index === 0) {
      return isDelayedAction(initialAction);
    }

    /*
     * Journey Step 3+
     */
    const previousEffectiveAction = getEffectiveAction(index - 1);

    return isDelayedAction(previousEffectiveAction);
  };

  const handleInitialChannelChange = (value: string) => {
    setInitialChannel(value);
    setInitialFallback((deliveries) =>
      deliveries.filter((delivery) => delivery.channel !== value),
    );
  };

  const addJourneyStep = () => {
    /*
     * Important:
     *
     * Store the user's own action as
     * "immediately".
     *
     * Do NOT permanently store the inherited
     * delayed value.
     *
     * The effective action is calculated
     * dynamically using getEffectiveAction().
     *
     * This means if an earlier journey is changed
     * back to Immediate, later steps unlock
     * correctly.
     */
    setJourneySteps((steps) => [
      ...steps,
      {
        id: Date.now(),
        action: "immediately",
        waitValue: 1,
        waitUnit: "days",
        template: "",
        channel: "",
        fallback: [],
        conditionMode: "always",
        conditionBlocks: [],
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

  const handleJourneyChannelChange = (step: JourneyStepItem, value: string) => {
    updateJourneyStep(step.id, {
      channel: value,
      fallback: step.fallback.filter((delivery) => delivery.channel !== value),
    });
  };

  const removeJourneyStep = (id: number) => {
    setJourneySteps((steps) => steps.filter((step) => step.id !== id));
  };

  const getJourneyTiming = (index: number) => {
    const effectiveAction = getEffectiveAction(index);

    if (effectiveAction === "immediately") {
      return "Immediately after entry";
    }

    /*
     * Build timing using EFFECTIVE actions,
     * not only stored actions.
     */
    const previousSteps = journeySteps
      .slice(0, index + 1)
      .map((step, stepIndex) => ({
        ...step,

        action: getEffectiveAction(stepIndex),
      }));

    const stepsForTiming: JourneyStepItem[] = [
      ...(isInitialDelayed
        ? [
            {
              id: 0,
              action: "delayed-notification",
              waitValue: initialWaitValue,
              waitUnit: initialWaitUnit,
              template: "",
              channel: "",
              fallback: [],
              conditionMode: "always" as const,
              conditionBlocks: [],
            },
          ]
        : []),

      ...previousSteps,
    ];

    return formatJourneyTiming(stepsForTiming);
  };

  return (
    <div className="space-y-6">
      {/* Journey Step 1 */}

      <div className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <p className="font-semibold">Journey Step 1</p>
        </div>

        <div className="space-y-5 p-5">
          {/* Send */}

          <div className="grid gap-5">
            <AppSelect
              label="Send"
              value={initialAction}
              onValueChange={setInitialAction}
              placeholder="Select"
              options={actionOptions}
              required
            />

            {isInitialDelayed && (
              <div className="grid gap-2 bg-muted/60 p-4 rounded-lg">
                <p className="font-semibold text-foreground">Wait</p>
                <div className="grid gap-3 grid-cols-2">
                  <div className="space-y-2">
                    <Label>
                      Wait Value <span className="text-destructive">*</span>
                    </Label>

                    <Input
                      type="number"
                      min={1}
                      value={initialWaitValue}
                      onChange={(event) =>
                        setInitialWaitValue(Number(event.target.value) || 0)
                      }
                    />
                  </div>

                  <AppSelect
                    label="Wait Unit"
                    value={initialWaitUnit}
                    onValueChange={(value) =>
                      setInitialWaitUnit(value as WaitUnit)
                    }
                    options={waitUnitOptions}
                    required
                  />
                </div>
              </div>
            )}
          </div>

          {/* Journey Timing */}

          <div className="rounded-lg border bg-muted/30 px-4 py-3">
            <p className="text-xs text-muted-foreground">Journey timing</p>

            <p className="mt-1 text-sm font-medium">{initialJourneyTiming}</p>
          </div>

          <div>
            <p className="mt-1 mb-2 text-sm text-muted-foreground">
              Select the message template and delivery channels for this
              engagement.
            </p>
            <section className="space-y-3 bg-muted/30 p-4 rounded-lg border">
              <p className="text-sm font-semibold">Primary Delivery</p>
              <DeliveryChannelTemplateFields
                channelLabel="Channel"
                channel={initialChannel}
                channelOptions={channelOptions}
                onChannelChange={handleInitialChannelChange}
                template={initialTemplate}
                onTemplateChange={setInitialTemplate}
              />
            </section>
          </div>

          <FallbackDeliverySection
            primaryChannel={initialChannel}
            deliveries={initialFallback}
            onChange={setInitialFallback}
          />

          {initialFallback.some((delivery) => delivery.channel) && (
            <DeliveryOrder
              primaryChannel={initialChannel}
              fallbackDeliveries={initialFallback}
            />
          )}

          {/* Message Condition */}

          <JourneyMessageCondition
            mode={mode}
            onModeChange={setMode}
            conditionBlocks={conditionBlocks}
            onConditionBlocksChange={setConditionBlocks}
          />
        </div>
      </div>

      {/* Subsequent Journey Steps */}

      {journeySteps.map((step, index) => {
        const sendLocked = isSendLocked(index);

        /*
         * The displayed Send value is based
         * on the effective journey state.
         */
        const displayedAction = getEffectiveAction(index);

        const showDelayFields = isDelayedAction(displayedAction);

        return (
          <div key={step.id} className="rounded-xl border bg-background">
            {/* Header */}

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
              {/* Send */}

              <div className="grid gap-5 ">
                <AppSelect
                  label="Send"
                  value={displayedAction}
                  onValueChange={(value) =>
                    updateJourneyStep(step.id, {
                      action: value,
                    })
                  }
                  options={
                    sendLocked
                      ? forcedDelayedActionOptions
                      : subsequentActionOptions
                  }
                  disabled={sendLocked}
                  required
                />

                {/* Delay configuration */}

                {showDelayFields && (
                  <div className="grid gap-2 bg-muted/60 p-4 rounded-lg">
                    <p className="font-semibold text-foreground">Wait</p>
                    <div className="grid gap-3 grid-cols-2">
                      <div className="space-y-2">
                        <Label>
                          Wait Value <span className="text-destructive">*</span>
                        </Label>

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
                      </div>

                      <AppSelect
                        label="Wait Unit"
                        value={step.waitUnit}
                        onValueChange={(value) =>
                          updateJourneyStep(step.id, {
                            waitUnit: value as WaitUnit,
                          })
                        }
                        options={waitUnitOptions}
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Journey Timing */}

              <div className="rounded-lg border bg-muted/30 px-4 py-3">
                <div className="flex items-start gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Journey timing
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {getJourneyTiming(index)}
                    </p>
                  </div>
                </div>
              </div>

              <section className="space-y-3 rounded-lg border bg-muted/30 p-4">
                <p className="text-sm font-semibold">Primary Delivery</p>
                <DeliveryChannelTemplateFields
                  channelLabel="Channel"
                  channel={step.channel}
                  channelOptions={channelOptions}
                  onChannelChange={(value) =>
                    handleJourneyChannelChange(step, value)
                  }
                  template={step.template}
                  onTemplateChange={(template) =>
                    updateJourneyStep(step.id, { template })
                  }
                />
              </section>

              <FallbackDeliverySection
                primaryChannel={step.channel}
                deliveries={step.fallback}
                onChange={(fallback) =>
                  updateJourneyStep(step.id, { fallback })
                }
              />

              {step.fallback.some((delivery) => delivery.channel) && (
                <DeliveryOrder
                  primaryChannel={step.channel}
                  fallbackDeliveries={step.fallback}
                />
              )}

              {/* Message Condition */}

              <JourneyMessageCondition
                mode={step.conditionMode}
                onModeChange={(value) =>
                  updateJourneyStep(step.id, {
                    conditionMode: value,
                  })
                }
                conditionBlocks={step.conditionBlocks}
                onConditionBlocksChange={(blocks) =>
                  updateJourneyStep(step.id, {
                    conditionBlocks: blocks,
                  })
                }
              />
            </div>
          </div>
        );
      })}

      {/* Add Journey */}

      <Button type="button" variant="outline" onClick={addJourneyStep}>
        <Plus className="mr-2 size-4" />
        Add Journey Step
      </Button>
    </div>
  );
}
