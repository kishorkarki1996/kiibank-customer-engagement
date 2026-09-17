"use client";

import { useMemo, useState } from "react";
import { Clock3, Plus, Trash2 } from "lucide-react";

import { AppSelect } from "@/components/common/app-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  JourneyConditionBlock,
  JourneyMessageCondition,
} from "@/components/customer-engagement/create/shared/journey-message-condition";

import { JourneyExitConditions } from "../journey-exit-conditions";

type JourneyStepItem = {
  id: number;
  waitValue: number;
  waitUnit: "hours" | "days" | "weeks" | "months";
  template: string;
  channel: string;
  fallback: string;
  conditionMode: "always" | "conditional";
  conditionBlocks: JourneyConditionBlock[];
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

function getChannelLabel(channel: string) {
  return (
    channelOptions.find((option) => option.value === channel)?.label ??
    "Not selected"
  );
}

function getTemplateLabel(template: string) {
  return (
    messageTemplateOptions.find((option) => option.value === template)?.label ??
    "Selected template"
  );
}

function getFallbackOptions(selectedChannel: string) {
  return channelOptions.filter((option) => option.value !== selectedChannel);
}

type TemplatePreviewProps = {
  template: string;
  channel: string;
  fallbackChannel: string;
};

function TemplatePreview({
  template,
  channel,
  fallbackChannel,
}: TemplatePreviewProps) {
  if (!template) {
    return null;
  }

  const templateLabel = getTemplateLabel(template);
  const selectedChannelLabel = getChannelLabel(channel);
  const fallbackChannelLabel = getChannelLabel(fallbackChannel);

  return (
    <div className="rounded-lg border bg-muted/20">
      <div className="border-b px-4 py-3">
        <p className="text-sm font-medium">Message Preview</p>

        <p className="mt-0.5 text-xs text-muted-foreground">
          Preview how the selected template will appear on each channel.
        </p>
      </div>

      <Tabs defaultValue="selected-channel" className="w-full">
        <div className="border-b px-4 pt-3">
          <TabsList className="h-9">
            <TabsTrigger value="selected-channel">
              {selectedChannelLabel}
            </TabsTrigger>

            <TabsTrigger value="fallback-channel">
              {fallbackChannelLabel === "Not selected"
                ? "Fallback Channel"
                : fallbackChannelLabel}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="selected-channel" className="m-0 p-4">
          <div className="rounded-lg border bg-background">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div>
                <p className="text-sm font-medium">{templateLabel}</p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  {selectedChannelLabel}
                </p>
              </div>

              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                {selectedChannelLabel}
              </span>
            </div>

            <div className="space-y-3 p-4">
              <div className="space-y-2">
                <div className="h-3 w-2/3 rounded bg-muted" />
                <div className="h-3 w-full rounded bg-muted" />
                <div className="h-3 w-5/6 rounded bg-muted" />
              </div>

              <div className="rounded-md bg-muted/50 p-3">
                <p className="text-xs text-muted-foreground">{templateLabel}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="fallback-channel" className="m-0 p-4">
          {!fallbackChannel ? (
            <div className="flex min-h-32 items-center justify-center rounded-lg border border-dashed bg-background px-4 text-center">
              <div>
                <p className="text-sm font-medium">
                  No fallback channel selected
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Select a fallback channel to preview the message.
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border bg-background">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <div>
                  <p className="text-sm font-medium">{templateLabel}</p>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {fallbackChannelLabel}
                  </p>
                </div>

                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  {fallbackChannelLabel}
                </span>
              </div>

              <div className="space-y-3 p-4">
                <div className="space-y-2">
                  <div className="h-3 w-2/3 rounded bg-muted" />
                  <div className="h-3 w-full rounded bg-muted" />
                  <div className="h-3 w-5/6 rounded bg-muted" />
                </div>

                <div className="rounded-md bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">
                    {templateLabel}
                  </p>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function JourneyStep() {
  const [conditionBlocks, setConditionBlocks] = useState<
    JourneyConditionBlock[]
  >([]);

  const [mode, setMode] = useState<"always" | "conditional">("always");

  const [action, setAction] = useState("immediately");

  const [initialWaitValue, setInitialWaitValue] = useState(1);

  const [initialWaitUnit, setInitialWaitUnit] =
    useState<JourneyStepItem["waitUnit"]>("days");

  const [initialTemplate, setInitialTemplate] = useState("");

  const [initialChannel, setInitialChannel] = useState("");

  const [initialFallback, setInitialFallback] = useState("");

  const [journeySteps, setJourneySteps] = useState<JourneyStepItem[]>([]);

  const isInitialDelayed = action === "after-delay";

  const initialJourneyDay = isInitialDelayed
    ? convertWaitToDays(initialWaitValue, initialWaitUnit)
    : 0;

  /**
   * Fallback options for Journey Step 1.
   *
   * The currently selected channel can never be used
   * as its own fallback channel.
   */
  const initialFallbackOptions = useMemo(
    () => getFallbackOptions(initialChannel),
    [initialChannel],
  );

  /**
   * When the primary channel changes, make sure the
   * fallback channel is still valid.
   */
  const handleInitialChannelChange = (value: string) => {
    setInitialChannel(value);

    if (initialFallback === value) {
      setInitialFallback("");
    }
  };

  /**
   * Add a new journey step.
   *
   * New journeys intentionally start with:
   * - Empty template
   * - Empty channel
   * - Empty fallback channel
   * - Always send
   *
   * Nothing is preselected.
   */
  const addJourneyStep = () => {
    setJourneySteps((steps) => [
      ...steps,
      {
        id: Date.now(),
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

  /**
   * Change a journey's channel.
   *
   * If the newly selected channel is the same as the
   * fallback channel, clear the fallback channel.
   */
  const handleJourneyChannelChange = (step: JourneyStepItem, value: string) => {
    updateJourneyStep(step.id, {
      channel: value,
      ...(step.fallback === value ? { fallback: "" } : {}),
    });
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
      {/* Journey Step 1 */}
      <div className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <p className="font-semibold">Journey Step 1</p>
        </div>

        <div className="space-y-5 p-5">
          <div className="grid gap-5 md:grid-cols-2">
            <AppSelect
              label="Action Type"
              value={action}
              onValueChange={setAction}
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

          <div className="grid gap-5 md:grid-cols-3">
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

          {initialTemplate && (
            <TemplatePreview
              template={initialTemplate}
              channel={initialChannel}
              fallbackChannel={initialFallback}
            />
          )}

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
        const journeyDay = getJourneyDay(step.id);

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

              <div className="grid gap-5 md:grid-cols-3">
                <AppSelect
                  label="Message Template"
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

              {step.template && (
                <TemplatePreview
                  template={step.template}
                  channel={step.channel}
                  fallbackChannel={step.fallback}
                />
              )}

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
