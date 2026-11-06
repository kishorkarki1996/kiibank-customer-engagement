"use client";

import { ArrowRight, Eye, GripVertical, Plus, Trash2 } from "lucide-react";

import type { AppSelectOption } from "@/components/common/app-select";
import { AppSelect } from "@/components/common/app-select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const messageTemplateOptions: AppSelectOption[] = [
  { label: "Welcome to KiiBank", value: "welcome-to-kiibank" },
  {
    label: "What You Can Do With Your KiiBank Account",
    value: "kiibank-account-features",
  },
  { label: "Using Your GBP Account", value: "using-gbp-account" },
  { label: "Sending Money With KiiBank", value: "sending-money" },
  { label: "Discover More KiiBank Features", value: "discover-more-features" },
];

export const channelOptions: AppSelectOption[] = [
  { label: "Push Notification", value: "push" },
  { label: "WhatsApp", value: "whatsapp" },
  { label: "Email", value: "email" },
  { label: "SMS", value: "sms" },
  { label: "In-App", value: "in-app" },
];

export type FallbackDelivery = {
  id: string;
  channel: string;
  template: string;
};

const templateContent: Record<string, string> = {
  "welcome-to-kiibank": `
    <div class="font-semibold">Welcome to KiiBank</div>
    <p class="mt-2 text-sm text-muted-foreground">
      Your KiiBank multi-currency account is ready.
      Discover simple and secure ways to manage and move your money.
    </p>
  `,
  "kiibank-account-features": `
    <div class="font-semibold">What You Can Do With Your KiiBank Account</div>
    <p class="mt-2 text-sm text-muted-foreground">
      Explore the features available to help you manage your money across currencies.
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

function TemplatePreview({
  template,
  content,
}: {
  template: string;
  content: Record<string, string>;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" size="sm" disabled={!template}>
          View
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        className="w-[420px] max-w-[calc(100vw-2rem)]"
      >
        <div className="space-y-3">
          <div className="border-b pb-3">
            <p className="font-semibold text-sm">Template preview</p>
          </div>
          <div
            className="prose prose-sm max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{
              __html: content[template] ?? "",
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

type DeliveryChannelTemplateFieldsProps = {
  channelLabel: string;
  channel: string;
  channelOptions: AppSelectOption[];
  onChannelChange: (value: string) => void;
  template: string;
  onTemplateChange: (value: string) => void;
  templateOptions?: AppSelectOption[];
  templateContent?: Record<string, string>;
};

export function DeliveryChannelTemplateFields({
  channelLabel,
  channel,
  channelOptions: availableChannels,
  onChannelChange,
  template,
  onTemplateChange,
  templateOptions = messageTemplateOptions,
  templateContent: previewContent = templateContent,
}: DeliveryChannelTemplateFieldsProps) {
  return (
    <div className="grid min-w-0 flex-1 gap-4 md:grid-cols-2">
      <AppSelect
        label={channelLabel}
        value={channel}
        onValueChange={onChannelChange}
        placeholder="Select channel"
        options={availableChannels}
        required
      />
      {channel && (
        <div className="space-y-2">
          <Label>
            Message Template <span className="text-destructive">*</span>
          </Label>
          <div className="flex items-center gap-2">
            <div className="min-w-0 flex-1">
              <AppSelect
                value={template}
                onValueChange={onTemplateChange}
                placeholder="Select message template"
                options={templateOptions}
              />
            </div>
            <TemplatePreview template={template} content={previewContent} />
          </div>
        </div>
      )}
    </div>
  );
}

function getDeliveryChannelLabel(channel: string) {
  return channelOptions.find((option) => option.value === channel)?.label ?? channel;
}

function getFallbackOptions(
  primaryChannel: string,
  deliveries: FallbackDelivery[],
  currentId: string,
  availableChannels: AppSelectOption[],
) {
  const selectedChannels = deliveries
    .filter((delivery) => delivery.id !== currentId)
    .map((delivery) => delivery.channel);
  const currentChannel = deliveries.find(
    (delivery) => delivery.id === currentId,
  )?.channel;

  return availableChannels.filter(
    (option) =>
      option.value !== primaryChannel &&
      (option.value === currentChannel ||
        !selectedChannels.includes(option.value)),
  );
}

function reorderFallbackDeliveries(
  deliveries: FallbackDelivery[],
  sourceId: string,
  targetId: string,
) {
  const sourceIndex = deliveries.findIndex(
    (delivery) => delivery.id === sourceId,
  );
  const targetIndex = deliveries.findIndex(
    (delivery) => delivery.id === targetId,
  );

  if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) {
    return deliveries;
  }

  const reordered = [...deliveries];
  const [delivery] = reordered.splice(sourceIndex, 1);
  reordered.splice(targetIndex, 0, delivery);
  return reordered;
}

type FallbackDeliverySectionProps = {
  primaryChannel: string;
  deliveries: FallbackDelivery[];
  onChange: (deliveries: FallbackDelivery[]) => void;
  channelOptions?: AppSelectOption[];
  templateOptions?: AppSelectOption[];
  templateContent?: Record<string, string>;
};

export function FallbackDeliverySection({
  primaryChannel,
  deliveries,
  onChange,
  channelOptions: availableChannels = channelOptions,
  templateOptions = messageTemplateOptions,
  templateContent,
}: FallbackDeliverySectionProps) {
  const addDelivery = () => {
    onChange([
      ...deliveries,
      { id: crypto.randomUUID(), channel: "", template: "" },
    ]);
  };

  const updateDelivery = (
    id: string,
    updates: Partial<Omit<FallbackDelivery, "id">>,
  ) => {
    onChange(
      deliveries.map((delivery) =>
        delivery.id === id ? { ...delivery, ...updates } : delivery,
      ),
    );
  };

  const removeDelivery = (id: string) => {
    onChange(deliveries.filter((delivery) => delivery.id !== id));
  };

  return (
    <section className="space-y-3 rounded-lg border bg-muted/30 p-4">
      <div>
        <p className="text-sm font-semibold">Fallback Delivery</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Fallback channels are attempted in order if the previous channel
          cannot deliver the message.
        </p>
      </div>

      <div className="space-y-2">
        {deliveries.map((delivery) => (
          <div
            key={delivery.id}
            className="flex items-stretch gap-3 rounded-lg border bg-background p-3"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              onChange(
                reorderFallbackDeliveries(
                  deliveries,
                  event.dataTransfer.getData("text/plain"),
                  delivery.id,
                ),
              );
            }}
          >
            <button
              type="button"
              draggable
              aria-label="Drag to reorder fallback delivery"
              className="cursor-grab text-muted-foreground active:cursor-grabbing"
              onDragStart={(event) => {
                event.dataTransfer.effectAllowed = "move";
                event.dataTransfer.setData("text/plain", delivery.id);
              }}
            >
              <GripVertical className="size-4" />
            </button>

            <DeliveryChannelTemplateFields
              channelLabel="Fallback Channel"
              channel={delivery.channel}
              channelOptions={getFallbackOptions(
                primaryChannel,
                deliveries,
                delivery.id,
                availableChannels,
              )}
              onChannelChange={(channel) =>
                updateDelivery(delivery.id, { channel })
              }
              template={delivery.template}
              onTemplateChange={(template) =>
                updateDelivery(delivery.id, { template })
              }
              templateOptions={templateOptions}
              templateContent={templateContent}
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0 self-end"
              onClick={() => removeDelivery(delivery.id)}
              aria-label="Remove fallback delivery"
            >
              <Trash2 className="size-4 text-muted-foreground" />
            </Button>
          </div>
        ))}
      </div>

      <Button type="button" variant="outline" onClick={addDelivery}>
        <Plus className="size-4" />
        Add Fallback Channel
      </Button>
    </section>
  );
}

export function DeliveryOrder({
  primaryChannel,
  fallbackDeliveries,
}: {
  primaryChannel: string;
  fallbackDeliveries: FallbackDelivery[];
}) {
  const deliveries = [
    ...(primaryChannel
      ? [{ label: "Primary Delivery", channel: primaryChannel }]
      : []),
    ...fallbackDeliveries
      .filter((delivery) => delivery.channel)
      .map((delivery) => ({
        label: "Fallback Channel",
        channel: delivery.channel,
      })),
  ];

  if (deliveries.length === 0) {
    return null;
  }

  return (
    <section className="space-y-3 rounded-lg border bg-muted/30 p-4">
      <div>
        <p className="text-sm font-semibold">Delivery Order</p>
        <p className="mt-1 text-xs text-muted-foreground">
          KiiBank will try each fallback channel in the order selected.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {deliveries.map((delivery, index) => (
          <div
            key={`${delivery.label}-${delivery.channel}-${index}`}
            className="flex items-center gap-2"
          >
            <div className="min-w-[120px] rounded-lg border bg-background px-3 py-2">
              <p className="text-xs font-medium tracking-wide text-muted-foreground">
                {delivery.label}
              </p>
              <p className="mt-0.5 truncate text-sm font-medium">
                {getDeliveryChannelLabel(delivery.channel)}
              </p>
            </div>
            {index < deliveries.length - 1 && (
              <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
