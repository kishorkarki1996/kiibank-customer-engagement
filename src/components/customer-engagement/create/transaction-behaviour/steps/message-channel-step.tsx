"use client";

import { useState } from "react";

import type { AppSelectOption } from "@/components/common/app-select";
import {
  DeliveryChannelTemplateFields,
  DeliveryOrder,
  FallbackDeliverySection,
  type FallbackDelivery,
} from "@/components/customer-engagement/create/shared/delivery-channel-template";

const messageTemplateOptions: AppSelectOption[] = [
  {
    label: "Transaction Activity Reminder",
    value: "transaction-activity-reminder",
  },
  { label: "Transaction Follow-Up", value: "transaction-follow-up" },
  { label: "Account Funding Reminder", value: "account-funding-reminder" },
  { label: "Money Transfer Update", value: "money-transfer-update" },
  {
    label: "Currency Conversion Message",
    value: "currency-conversion-message",
  },
];

const channelOptions: AppSelectOption[] = [
  { label: "Push Notification", value: "push" },
  { label: "WhatsApp", value: "whatsapp" },
  { label: "Email", value: "email" },
  { label: "SMS", value: "sms" },
  { label: "In-App", value: "in-app" },
];

const templateContent: Record<string, string> = {
  "transaction-activity-reminder": `
    <div class="font-semibold">Transaction Activity Reminder</div>
    <p class="mt-2 text-sm text-muted-foreground">
      Stay updated with your recent KiiBank transaction activity.
    </p>
  `,
  "transaction-follow-up": `
    <div class="font-semibold">Transaction Follow-Up</div>
    <p class="mt-2 text-sm text-muted-foreground">
      We noticed recent transaction activity on your KiiBank account.
    </p>
  `,
  "account-funding-reminder": `
    <div class="font-semibold">Account Funding Reminder</div>
    <p class="mt-2 text-sm text-muted-foreground">
      Fund your KiiBank account to continue using available services.
    </p>
  `,
  "money-transfer-update": `
    <div class="font-semibold">Money Transfer Update</div>
    <p class="mt-2 text-sm text-muted-foreground">
      Here is an update related to your recent money transfer activity.
    </p>
  `,
  "currency-conversion-message": `
    <div class="font-semibold">Currency Conversion</div>
    <p class="mt-2 text-sm text-muted-foreground">
      Manage and convert supported currencies directly from your KiiBank account.
    </p>
  `,
};

export function MessageChannelStep() {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("");
  const [fallbackDeliveries, setFallbackDeliveries] = useState<
    FallbackDelivery[]
  >([]);

  const handleChannelChange = (channel: string) => {
    setSelectedChannel(channel);
    setFallbackDeliveries((deliveries) =>
      deliveries.filter((delivery) => delivery.channel !== channel),
    );
  };

  return (
    <div className="space-y-6">
      <p className="mt-1 text-sm text-muted-foreground">
        Select the message template and delivery channels for this engagement.
      </p>

      <section className="space-y-3 rounded-lg border bg-muted/30 p-4">
        <p className="text-sm font-semibold">Primary Delivery</p>
        <DeliveryChannelTemplateFields
          channelLabel="Channel"
          channel={selectedChannel}
          channelOptions={channelOptions}
          onChannelChange={handleChannelChange}
          template={selectedTemplate}
          onTemplateChange={setSelectedTemplate}
          templateOptions={messageTemplateOptions}
          templateContent={templateContent}
        />
      </section>

      <FallbackDeliverySection
        primaryChannel={selectedChannel}
        deliveries={fallbackDeliveries}
        onChange={setFallbackDeliveries}
        channelOptions={channelOptions}
        templateOptions={messageTemplateOptions}
        templateContent={templateContent}
      />

      {fallbackDeliveries.some((delivery) => delivery.channel) && (
        <DeliveryOrder
          primaryChannel={selectedChannel}
          fallbackDeliveries={fallbackDeliveries}
        />
      )}
    </div>
  );
}
