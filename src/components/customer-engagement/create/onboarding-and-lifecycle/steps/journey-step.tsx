"use client";

import { useMemo, useState } from "react";

import { Clock3, Plus, Trash2 } from "lucide-react";

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
  fallback: string;
  conditionMode: "always" | "conditional";
  conditionBlocks: JourneyConditionBlock[];
};

const getActionOptions = (stepIndex: number) => {
  if (stepIndex === 0) {
    return [
      {
        label: "Immediately after entry",
        value: "immediately",
      },
      {
        label: "After a delay",
        value: "after-delay",
      },
    ];
  }

  return [
    {
      label: "Send immediately after previous journey",
      value: "immediately",
    },
    {
      label: "After a delay",
      value: "after-delay",
    },
  ];
};
const actionOptions = [
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
    <div class="font-semibold">Welcome to KiiBank</div>
    <p class="mt-2 text-sm text-muted-foreground">
      Your KiiBank multi-currency account is ready.
      Discover simple and secure ways to manage and move your money.
    </p>
  `,

  "kiibank-account-features": `
    <div class="font-semibold">
      What You Can Do With Your KiiBank Account
    </div>
    <p class="mt-2 text-sm text-muted-foreground">
      Explore the features available to help you manage your money
      across currencies.
    </p>
  `,

  "using-gbp-account": `
    <strong class="font-semibold">Using Your GBP Account</strong>
    <p class="mt-2 text-sm text-muted-foreground">
      Learn how to use your GBP account to receive and manage money.
    </p>
  `,

  "sending-money": `
    <strong class="font-semibold">Sending Money With KiiBank</strong>
    <p class="mt-2 text-sm text-muted-foreground">
      Send money securely to your saved recipients using KiiBank.
    </p>
  `,

  "discover-more-features": `
    <strong class="font-semibold">Discover More KiiBank Features</strong>
    <p class="mt-2 text-sm text-muted-foreground">
      Discover more ways to manage your money with KiiBank.
    </p>
  `,
};

function getTemplateLabel(template: string) {
  return (
    messageTemplateOptions.find((option) => option.value === template)?.label ??
    "Message Template"
  );
}

function getFallbackOptions(selectedChannel: string) {
  return channelOptions.filter((option) => option.value !== selectedChannel);
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
    (step) => step.action === "after-delay" && step.waitValue > 0,
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
  const initialActionOptions = [
    { label: "Send immediately after entry", value: "immediately" },
    { label: "After a delay", value: "after-delay" },
  ];

  const subsequentActionOptions = [
    {
      label: "Send immediately after previous journey",
      value: "immediately",
    },
    { label: "After a delay", value: "after-delay" },
  ];
  const [initialAction, setInitialAction] = useState("immediately");

  const [initialWaitValue, setInitialWaitValue] = useState(1);

  const [initialWaitUnit, setInitialWaitUnit] = useState<WaitUnit>("days");

  const [initialTemplate, setInitialTemplate] = useState("");

  const [initialChannel, setInitialChannel] = useState("");

  const [initialFallback, setInitialFallback] = useState("");

  const [journeySteps, setJourneySteps] = useState<JourneyStepItem[]>([]);

  const isInitialDelayed = initialAction === "after-delay";

  const initialJourneyTiming = isInitialDelayed
    ? `${formatWait(initialWaitValue, initialWaitUnit)} after signup`
    : "Immediately after signup";

  const initialFallbackOptions = useMemo(
    () => getFallbackOptions(initialChannel),
    [initialChannel],
  );

  const handleInitialChannelChange = (value: string) => {
    setInitialChannel(value);

    if (initialFallback === value) {
      setInitialFallback("");
    }
  };

  const addJourneyStep = () => {
    setJourneySteps((steps) => [
      ...steps,
      {
        id: Date.now(),
        action: "immediately",
        waitValue: 1,
        waitUnit: "days",
        template: "",
        channel: "",
        fallback: "",
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
      ...(step.fallback === value ? { fallback: "" } : {}),
    });
  };

  const removeJourneyStep = (id: number) => {
    setJourneySteps((steps) => steps.filter((step) => step.id !== id));
  };

  const getJourneyTiming = (index: number) => {
    const currentStep = journeySteps[index];

    if (currentStep.action === "immediately") {
      return "Immediately after previous journey";
    }

    const previousSteps = journeySteps.slice(0, index + 1);

    const stepsForTiming = [
      ...(isInitialDelayed
        ? [
            {
              action: "after-delay",
              waitValue: initialWaitValue,
              waitUnit: initialWaitUnit,
            } as JourneyStepItem,
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
          {/* Action */}
          <div className="grid gap-5 md:grid-cols-2">
            <AppSelect
              label="Action Type"
              value={initialAction}
              onValueChange={setInitialAction}
              placeholder="Select"
              options={actionOptions}
            />

            {isInitialDelayed && (
              <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
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

                <div className="space-y-2">
                  <Label>
                    Wait Unit <span className="text-destructive">*</span>
                  </Label>

                  <AppSelect
                    value={initialWaitUnit}
                    onValueChange={(value) =>
                      setInitialWaitUnit(value as WaitUnit)
                    }
                    options={waitUnitOptions}
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

            <AppSelect
              label="Fallback Channel"
              value={initialFallback}
              onValueChange={setInitialFallback}
              placeholder="Select fallback channel"
              options={initialFallbackOptions}
            />
          </div>

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
        const fallbackOptions = getFallbackOptions(step.channel);

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
              {/* Action */}
              <div className="grid gap-5 md:grid-cols-2">
                <AppSelect
                  label="Action"
                  value={step.action}
                  onValueChange={(value) =>
                    updateJourneyStep(step.id, {
                      action: value,
                    })
                  }
                  options={
                    index === 1 ? initialActionOptions : subsequentActionOptions
                  }
                />
                {step.action === "after-delay" && (
                  <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
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

                    <div className="space-y-2">
                      <Label>
                        Wait Unit <span className="text-destructive">*</span>
                      </Label>

                      <AppSelect
                        value={step.waitUnit}
                        onValueChange={(value) =>
                          updateJourneyStep(step.id, {
                            waitUnit: value as WaitUnit,
                          })
                        }
                        options={waitUnitOptions}
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

                <AppSelect
                  label="Fallback Channel"
                  value={step.fallback}
                  onValueChange={(value) =>
                    updateJourneyStep(step.id, {
                      fallback: value,
                    })
                  }
                  placeholder="Select fallback channel"
                  options={fallbackOptions}
                />
              </div>

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

      <Button type="button" variant="outline" onClick={addJourneyStep}>
        <Plus className="mr-2 size-4" />
        Add Journey Step
      </Button>
    </div>
  );
}
