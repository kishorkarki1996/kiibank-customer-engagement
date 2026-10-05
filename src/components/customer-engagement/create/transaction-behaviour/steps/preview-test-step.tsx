"use client";

import { useState } from "react";
import { ArrowRight, Loader2, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import {
  TemplatePreview,
  type TemplateVariant,
} from "@/components/customer-engagement/create/shared/template-preview";
import ConditionPreviewBlock from "../../shared/condition-preview-block";

type PreviewChannel = TemplateVariant;

const configuration = {
  engagementName: "Dormant GBP→XAF Customers",

  category: "Transaction Behaviour",

  baseAudience: "UK active customers with GBP + XAF accounts",

  behaviour: [
    "Previously completed GBP→XAF transaction",
    "No successful GBP→XAF transaction within 30 days",
  ],

  execution: "Daily evaluation",

  message: "Transaction Activity Reminder",
  channels: ["push", "whatsapp"] as PreviewChannel[],

  frequency: "Maximum once every 30 days",

  exitCondition: "Successful GBP→XAF transaction",

  conversion: "Successful GBP→XAF transaction within 7 days",

  estimatedQualifiedCustomers: 3969,

  messageTemplate: "Dormant GBP→XAF Reminder",

  htmlContent: `
    <div>
      <h2 style="font-size:18px;font-weight:600;margin-bottom:8px;">
        Complete your GBP→XAF transfer
      </h2>

      <p style="font-size:14px;line-height:1.6;">
        It's been a while since your last GBP→XAF transfer.
        Open KiiBank to send or convert money when you're ready.
      </p>
    </div>
  `,
};

const channelLabels: Record<PreviewChannel, string> = {
  push: "Push Notification",
  whatsapp: "WhatsApp",
  email: "Email",
  sms: "SMS",
  "in-app": "In-App",
};

export function PreviewTestStep() {
  const [selectedChannel, setSelectedChannel] = useState<PreviewChannel>(
    configuration.channels[0],
  );

  const [recipient, setRecipient] = useState("");

  const [isSending, setIsSending] = useState(false);

  const handleChannelChange = (channel: TemplateVariant) => {
    setSelectedChannel(channel);

    /**
     * Different channels require different
     * recipient information.
     */
    setRecipient("");
  };

  const handleSendTest = async () => {
    if (!recipient.trim()) {
      return;
    }

    setIsSending(true);

    try {
      /**
       * Replace with actual test-message API.
       */
      await new Promise((resolve) => setTimeout(resolve, 900));

      toast.success(
        `${channelLabels[selectedChannel]} test sent successfully.`,
      );

      setRecipient("");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Heading */}

      <div>
        {/* <h3 className="text-lg font-semibold">{configuration.engagementName}</h3> */}

        <p className="mt-1 text-sm text-muted-foreground">
          Review the complete engagement configuration and test the message
          before continuing.
        </p>
      </div>

      {/* Configuration Summary */}

      <section className="overflow-hidden rounded-xl border bg-background">
        <ConfigurationRow
          label="Engagement Name"
          value={configuration.engagementName}
        />
        <ConfigurationRow label="Category" value={configuration.category} />

        <ConfigurationRow
          label="Base Audience"
          value={configuration.baseAudience}
        />

        <ConfigurationRow label="Behaviour & Rules">
          <ConditionPreviewBlock />
        </ConfigurationRow>

        <ConfigurationRow label="Execution" value={configuration.execution} />
        <ConfigurationRow label="Message" value={configuration.message} />

        <ConfigurationRow label="Channel">
          <ChannelFlow channels={configuration.channels} />
        </ConfigurationRow>

        <ConfigurationRow label="Frequency" value={configuration.frequency} />

        <ConfigurationRow label="Exit" value={configuration.exitCondition} />

        <ConfigurationRow label="Conversion" value={configuration.conversion} />

        <ConfigurationRow label="Estimated Qualified Customers" last>
          <span className="text-lg font-semibold text-primary">
            {configuration.estimatedQualifiedCustomers.toLocaleString()}
          </span>
        </ConfigurationRow>
      </section>

      {/* Message Preview */}

      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold">Message Preview</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Review how the configured message will appear across the selected
            delivery channels.
          </p>
        </div>

        <TemplatePreview
          title={configuration.messageTemplate}
          description="Message template preview"
          channels={configuration.channels}
          variant={selectedChannel}
          onVariantChange={handleChannelChange}
          htmlContent={configuration.htmlContent}
        />
      </section>

      {/* Test Message */}

      <section className="space-y-5 rounded-xl border bg-background p-5">
        <div>
          <h3 className="text-sm font-semibold">Send Test</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Send a test using the currently selected preview channel.
          </p>
        </div>

        <div className="max-w-xl space-y-2">
          <Label htmlFor="test-recipient">
            {getRecipientLabel(selectedChannel)}
            <span className="ml-1 text-destructive">*</span>
          </Label>

          <Input
            id="test-recipient"
            type={getRecipientInputType(selectedChannel)}
            value={recipient}
            onChange={(event) => setRecipient(event.target.value)}
            placeholder={getRecipientPlaceholder(selectedChannel)}
          />

          <p className="text-xs leading-5 text-muted-foreground">
            Test delivery does not affect audience eligibility, frequency
            controls, exit conditions, or conversion tracking.
          </p>
        </div>

        <Button
          type="button"
          disabled={!recipient.trim() || isSending}
          onClick={handleSendTest}
        >
          {isSending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 size-4" />
              Send Test {channelLabels[selectedChannel]}
            </>
          )}
        </Button>
      </section>
    </div>
  );
}

function ConfigurationRow({
  label,
  value,
  children,
  last = false,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={`grid gap-2 px-5 py-4 md:grid-cols-[220px_minmax(0,1fr)] ${
        last ? "" : "border-b"
      }`}
    >
      <p className="text-sm font-medium text-muted-foreground">{label}</p>

      <div className="min-w-0 text-sm">{children ?? value}</div>
    </div>
  );
}

function ConditionList({ conditions }: { conditions: string[] }) {
  return (
    <div className="space-y-2">
      {conditions.map((condition, index) => (
        <div key={condition} className="flex items-start gap-3">
          {index > 0 ? (
            <Badge variant="outline" className="mt-0.5 shrink-0 bg-background">
              AND
            </Badge>
          ) : (
            <div className="w-[49px] shrink-0" />
          )}

          <p className="leading-6">{condition}</p>
        </div>
      ))}
    </div>
  );
}

function ChannelFlow({ channels }: { channels: PreviewChannel[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {channels.map((channel, index) => (
        <div key={channel} className="flex items-center gap-2">
          <Badge variant="outline" className="bg-background">
            {channelLabels[channel]}
          </Badge>

          {index < channels.length - 1 && (
            <ArrowRight className="size-4 text-muted-foreground" />
          )}
        </div>
      ))}
    </div>
  );
}

function getRecipientLabel(channel: PreviewChannel) {
  switch (channel) {
    case "email":
      return "Test Email Address";

    case "whatsapp":
      return "WhatsApp Number";

    case "sms":
      return "Test Phone Number";

    case "push":
    case "in-app":
      return "Test Customer";

    default:
      return "Test Recipient";
  }
}

function getRecipientPlaceholder(channel: PreviewChannel) {
  switch (channel) {
    case "email":
      return "name@example.com";

    case "whatsapp":
      return "Enter WhatsApp number";

    case "sms":
      return "Enter phone number";

    case "push":
    case "in-app":
      return "Enter customer ID or account number";

    default:
      return "Enter recipient";
  }
}

function getRecipientInputType(channel: PreviewChannel) {
  switch (channel) {
    case "email":
      return "email";

    case "whatsapp":
    case "sms":
      return "tel";

    default:
      return "text";
  }
}
