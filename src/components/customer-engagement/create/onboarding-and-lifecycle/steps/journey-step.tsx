"use client";

import { useState } from "react";
import { ArrowRight, Clock3, Plus, Trash2 } from "lucide-react";

import { AppMultiSelect } from "@/components/common/app-multi-select";
import { AppSelect } from "@/components/common/app-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  JourneyConditionBlock,
  JourneyMessageCondition,
} from "@/components/customer-engagement/create/shared/journey-message-condition";

type WaitUnit = "hours" | "days" | "weeks" | "months";

type JourneyStepItem = {
  id: number;
  action: string;
  waitValue: number;
  waitUnit: WaitUnit;
  template: string;
  channel: string;
  fallback: string[];
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

const templateContent: Record<string, string> = {
  "welcome-to-kiibank": `
    <div class="font-semibold">
      Welcome to KiiBank
    </div>

    <p class="mt-2 text-sm text-muted-foreground">
      Your KiiBank multi-currency account is ready.
      Discover simple and secure ways to manage and
      move your money.
    </p>
  `,

  "kiibank-account-features": `
    <div class="font-semibold">
      What You Can Do With Your KiiBank Account
    </div>

    <p class="mt-2 text-sm text-muted-foreground">
      Explore the features available to help you
      manage your money across currencies.
    </p>
  `,

  "using-gbp-account": `
    <strong class="font-semibold">
      Using Your GBP Account
    </strong>

    <p class="mt-2 text-sm text-muted-foreground">
      Learn how to use your GBP account to receive
      and manage money.
    </p>
  `,

  "sending-money": `
    <strong class="font-semibold">
      Sending Money With KiiBank
    </strong>

    <p class="mt-2 text-sm text-muted-foreground">
      Send money securely to your saved recipients
      using KiiBank.
    </p>
  `,

  "discover-more-features": `
    <strong class="font-semibold">
      Discover More KiiBank Features
    </strong>

    <p class="mt-2 text-sm text-muted-foreground">
      Discover more ways to manage your money with
      KiiBank.
    </p>
  `,
};

function getTemplateLabel(template: string) {
  return (
    messageTemplateOptions.find((option) => option.value === template)?.label ??
    "Message Template"
  );
}

function getChannelLabel(value: string) {
  return (
    channelOptions.find((option) => option.value === value)?.label ?? value
  );
}

function getFallbackItems(selectedChannel: string) {
  const selectedChannelLabel = getChannelLabel(selectedChannel);

  return channelOptions
    .map((option) => option.label)
    .filter((label) => label !== selectedChannelLabel);
}

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

function TemplatePreviewPopover({ template }: { template: string }) {
  if (!template) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="text-sm font-medium text-primary hover:underline"
        >
          View
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        side="bottom"
        className="w-[420px] max-w-[calc(100vw-2rem)]"
      >
        <div className="space-y-3">
          <div className="border-b pb-3">
            <p className="font-semibold">Template preview</p>

            <p className="mt-1 text-xs text-muted-foreground">
              {getTemplateLabel(template)}
            </p>
          </div>

          <div
            className="prose prose-sm max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{
              __html: templateContent[template] ?? "",
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
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

function ChannelOrder({
  channel,
  fallback,
}: {
  channel: string;
  fallback: string[];
}) {
  if (!channel || fallback.length === 0) {
    return null;
  }

  const primaryChannel = getChannelLabel(channel);

  const channels = [primaryChannel, ...fallback];

  return (
    <div className="rounded-lg border bg-muted/30 px-4 py-4">
      <p className="mt-1 text-sm text-foreground">
        KiiBank will try each fallback channel in the order selected.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {channels.map((channelName, index) => (
          <div
            key={`${channelName}-${index}`}
            className="flex items-center gap-2"
          >
            <div className="min-w-[120px] rounded-lg border bg-background px-3 py-2">
              <p className="text-xs font-medium tracking-wide text-muted-foreground">
                {index === 0 ? "Primary" : `Fallback ${index}`}
              </p>

              <p className="mt-0.5 truncate text-sm font-medium">
                {channelName}
              </p>
            </div>

            {index < channels.length - 1 && (
              <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
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

  const [initialFallback, setInitialFallback] = useState<string[]>([]);

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

    const selectedLabel = getChannelLabel(value);

    setInitialFallback((fallbackChannels) =>
      fallbackChannels.filter((channel) => channel !== selectedLabel),
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
    const selectedLabel = getChannelLabel(value);

    updateJourneyStep(step.id, {
      channel: value,

      fallback: step.fallback.filter((channel) => channel !== selectedLabel),
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

          {/* Message / Channel / Fallback */}

          <div className="grid gap-5 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>
                  Message Template <span className="text-destructive">*</span>
                </Label>

                {initialTemplate && (
                  <TemplatePreviewPopover template={initialTemplate} />
                )}
              </div>

              <AppSelect
                value={initialTemplate}
                onValueChange={setInitialTemplate}
                placeholder="Select Template"
                options={messageTemplateOptions}
              />
            </div>

            <AppSelect
              label="Channel"
              value={initialChannel}
              onValueChange={handleInitialChannelChange}
              placeholder="Select channel"
              options={channelOptions}
              required
            />

            <AppMultiSelect
              label="Fallback Channel"
              items={getFallbackItems(initialChannel)}
              value={initialFallback}
              setValue={setInitialFallback}
              placeholder="Select fallback channels"
            />
          </div>

          {/* Channel Order */}

          {initialFallback.length > 0 && (
            <ChannelOrder channel={initialChannel} fallback={initialFallback} />
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
        const fallbackItems = getFallbackItems(step.channel);

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
                  <Clock3 className="mt-0.5 size-4 text-muted-foreground" />

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

              {/* Message / Channel / Fallback */}

              <div className="grid gap-5 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>
                      Message Template{" "}
                      <span className="text-destructive">*</span>
                    </Label>

                    {step.template && (
                      <TemplatePreviewPopover template={step.template} />
                    )}
                  </div>

                  <AppSelect
                    value={step.template}
                    onValueChange={(value) =>
                      updateJourneyStep(step.id, {
                        template: value,
                      })
                    }
                    placeholder="Select message template"
                    options={messageTemplateOptions}
                  />
                </div>

                <AppSelect
                  label="Channel"
                  value={step.channel}
                  onValueChange={(value) =>
                    handleJourneyChannelChange(step, value)
                  }
                  placeholder="Select channel"
                  options={channelOptions}
                  required
                />

                <AppMultiSelect
                  label="Fallback Channel"
                  items={fallbackItems}
                  value={step.fallback}
                  setValue={(value) => {
                    const nextValue =
                      typeof value === "function"
                        ? value(step.fallback)
                        : value;

                    updateJourneyStep(step.id, {
                      fallback: nextValue,
                    });
                  }}
                  placeholder="Select fallback channels"
                />
              </div>

              {/* Channel Order */}

              {step.fallback.length > 0 && (
                <ChannelOrder channel={step.channel} fallback={step.fallback} />
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
