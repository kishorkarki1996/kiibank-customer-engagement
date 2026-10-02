"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { AppMultiSelect } from "@/components/common/app-multi-select";
import { AppSelect } from "@/components/common/app-select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

const messageTemplateOptions = [
  {
    label: "Transaction Activity Reminder",
    value: "transaction-activity-reminder",
  },
  {
    label: "Transaction Follow-Up",
    value: "transaction-follow-up",
  },
  {
    label: "Account Funding Reminder",
    value: "account-funding-reminder",
  },
  {
    label: "Money Transfer Update",
    value: "money-transfer-update",
  },
  {
    label: "Currency Conversion Message",
    value: "currency-conversion-message",
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

const templateContent: Record<string, string> = {
  "transaction-activity-reminder": `
    <div class="font-semibold">
      Transaction Activity Reminder
    </div>

    <p class="mt-2 text-sm text-muted-foreground">
      Stay updated with your recent KiiBank transaction activity.
    </p>
  `,

  "transaction-follow-up": `
    <div class="font-semibold">
      Transaction Follow-Up
    </div>

    <p class="mt-2 text-sm text-muted-foreground">
      We noticed recent transaction activity on your KiiBank account.
    </p>
  `,

  "account-funding-reminder": `
    <div class="font-semibold">
      Account Funding Reminder
    </div>

    <p class="mt-2 text-sm text-muted-foreground">
      Fund your KiiBank account to continue using available services.
    </p>
  `,

  "money-transfer-update": `
    <div class="font-semibold">
      Money Transfer Update
    </div>

    <p class="mt-2 text-sm text-muted-foreground">
      Here is an update related to your recent money transfer activity.
    </p>
  `,

  "currency-conversion-message": `
    <div class="font-semibold">
      Currency Conversion
    </div>

    <p class="mt-2 text-sm text-muted-foreground">
      Manage and convert supported currencies directly from your KiiBank account.
    </p>
  `,
};

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
        align="center"
        side="bottom"
        className="w-[420px] max-w-[calc(100vw-2rem)] px-0"
      >
        <div className="space-y-3 ">
          <p className="font-medium px-6">Template preview</p>
          <Separator />
          <div
            className="prose prose-sm max-w-none dark:prose-invert px-6"
            dangerouslySetInnerHTML={{
              __html: templateContent[template] ?? "",
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
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
      <p className="text-sm text-foreground">
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

export function MessageChannelStep() {
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const [selectedChannel, setSelectedChannel] = useState("");

  const [fallbackChannels, setFallbackChannels] = useState<string[]>([]);

  const handleChannelChange = (value: string) => {
    setSelectedChannel(value);

    const selectedLabel = getChannelLabel(value);

    /**
     * Primary channel cannot also
     * remain as a fallback.
     */
    setFallbackChannels((currentFallbacks) =>
      currentFallbacks.filter((channel) => channel !== selectedLabel),
    );
  };

  return (
    <div className="space-y-6">
      <p className="mt-1 text-sm text-muted-foreground">
        Select the message template and delivery channels for this engagement.
      </p>

      <div className="grid gap-5 md:grid-cols-3">
        {/* Message Template */}

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Message Template
              <span className="ml-1 text-destructive">*</span>
            </span>

            {selectedTemplate && (
              <TemplatePreviewPopover template={selectedTemplate} />
            )}
          </div>

          <AppSelect
            value={selectedTemplate}
            onValueChange={setSelectedTemplate}
            options={messageTemplateOptions}
            placeholder="Select message template"
          />
        </div>

        {/* Channel */}

        <AppSelect
          label="Channel"
          value={selectedChannel}
          onValueChange={handleChannelChange}
          options={channelOptions}
          placeholder="Select channel"
          required
        />

        {/* Fallback */}

        <AppMultiSelect
          label="Fallback Channel"
          items={getFallbackItems(selectedChannel)}
          value={fallbackChannels}
          setValue={setFallbackChannels}
          placeholder="Select fallback channels"
        />
      </div>

      {/* Channel Order */}

      {fallbackChannels.length > 0 && (
        <ChannelOrder channel={selectedChannel} fallback={fallbackChannels} />
      )}
    </div>
  );
}
