"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  Info,
  Mail,
  MessageCircleMore,
  Send,
  Smartphone,
} from "lucide-react";

import { AppSelect } from "@/components/common/app-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Channel = "push" | "whatsapp" | "email" | "in-app" | "sms";

type JourneyMessage = {
  id: string;
  step: number;
  template: string;
};

const journeyMessages: JourneyMessage[] = [
  {
    id: "step-1",
    step: 1,
    template: "Welcome to KiiBank",
  },
  {
    id: "step-2",
    step: 2,
    template: "What You Can Do With KiiBank",
  },
  {
    id: "step-3",
    step: 3,
    template: "Using Your GBP Account",
  },
  {
    id: "step-4",
    step: 4,
    template: "Sending Money With KiiBank",
  },
  {
    id: "step-5",
    step: 5,
    template: "Discover More Features",
  },
];

const channels: {
  label: string;
  value: Channel;
}[] = [
  {
    label: "Push",
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
    label: "In-App",
    value: "in-app",
  },
  {
    label: "SMS",
    value: "sms",
  },
];

export function TestStep() {
  const [selectedJourneyId, setSelectedJourneyId] = useState(
    journeyMessages[0].id,
  );

  const [selectedChannel, setSelectedChannel] = useState<Channel>("push");

  const [recipient, setRecipient] = useState("");

  const [isSending, setIsSending] = useState(false);

  const [sent, setSent] = useState(false);

  const selectedJourney = useMemo(
    () =>
      journeyMessages.find((item) => item.id === selectedJourneyId) ??
      journeyMessages[0],
    [selectedJourneyId],
  );

  const journeyOptions = journeyMessages.map((item) => ({
    label: `Journey Step ${item.step} — ${item.template}`,
    value: item.id,
  }));

  const handleJourneyChange = (value: string) => {
    setSelectedJourneyId(value);
    setSent(false);
  };

  const handleChannelChange = (value: string) => {
    setSelectedChannel(value as Channel);
    setRecipient("");
    setSent(false);
  };

  const handleSendTest = async () => {
    if (!recipient.trim()) {
      return;
    }

    setIsSending(true);
    setSent(false);

    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSending(false);
    setSent(true);
  };

  return (
    <div className="space-y-6">
      {/* Journey message */}

      <section className="rounded-xl border bg-background p-5">
        <div>
          <h3 className="text-sm font-semibold">Select Journey Message</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Choose the message you want to preview and test.
          </p>
        </div>

        <div className="mt-5 max-w-xl">
          <AppSelect
            label="Journey Message"
            value={selectedJourneyId}
            onValueChange={handleJourneyChange}
            options={journeyOptions}
            placeholder="Select journey message"
          />
        </div>
      </section>

      {/* Preview */}

      <section className="overflow-hidden rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-sm font-semibold">Channel Message Preview</h3>

              <p className="mt-1 text-xs text-muted-foreground">
                Preview how this journey message may appear across different
                communication channels.
              </p>
            </div>

            <Tabs value={selectedChannel} onValueChange={handleChannelChange}>
              <TabsList className="h-auto flex-wrap bg-muted/50">
                {channels.map((channel) => (
                  <TabsTrigger
                    key={channel.value}
                    value={channel.value}
                    className="px-3 data-[state=active]:bg-background"
                  >
                    {channel.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="bg-muted/20 p-5 md:p-8">
          <div className="mx-auto flex min-h-[420px] max-w-md items-center justify-center rounded-[28px] border bg-background p-4 shadow-sm sm:p-6">
            <ChannelPreview
              channel={selectedChannel}
              journey={selectedJourney}
            />
          </div>
        </div>
      </section>

      {/* Send Test */}

      <section className="rounded-xl border bg-background p-5">
        <div>
          <h3 className="text-sm font-semibold">Send Test</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Send the selected journey message through the currently previewed
            channel.
          </p>
        </div>

        <div className="mt-5 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="test-recipient">
              Test Recipient
              <span className="ml-1 text-destructive">*</span>
            </Label>

            <Input
              id="test-recipient"
              value={recipient}
              onChange={(event) => {
                setRecipient(event.target.value);

                setSent(false);
              }}
              placeholder={getRecipientPlaceholder(selectedChannel)}
            />

            <p className="text-xs text-muted-foreground">
              {getRecipientHelper(selectedChannel)}
            </p>
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={handleSendTest}
              disabled={!recipient.trim() || isSending}
            >
              <Send className="mr-2 size-4" />

              {isSending
                ? "Sending..."
                : `Send Test ${getChannelLabel(selectedChannel)}`}
            </Button>
          </div>

          {sent && (
            <div className="rounded-lg border bg-muted/30 px-4 py-3">
              <p className="text-sm font-medium">Test message sent</p>

              <p className="mt-1 text-xs text-muted-foreground">
                {selectedJourney.template} was sent through{" "}
                {getChannelLabel(selectedChannel)} to {recipient}.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Safety note */}

      <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
        <Info className="mt-0.5 size-4 shrink-0 text-primary" />

        <div>
          <p className="text-sm font-medium">
            Test activity is isolated from production
          </p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            The test recipient will not be enrolled in the journey. Test sends
            must not affect production engagement history, audience counts,
            conversion statistics, or reporting.
          </p>
        </div>
      </div>
    </div>
  );
}

function ChannelPreview({
  channel,
  journey,
}: {
  channel: Channel;
  journey: JourneyMessage;
}) {
  switch (channel) {
    case "push":
      return <PushPreview journey={journey} />;

    case "whatsapp":
      return <WhatsAppPreview journey={journey} />;

    case "email":
      return <EmailPreview journey={journey} />;

    case "in-app":
      return <InAppPreview journey={journey} />;

    case "sms":
      return <SmsPreview journey={journey} />;
  }
}

function PushPreview({ journey }: { journey: JourneyMessage }) {
  return (
    <div className="w-full rounded-2xl border bg-muted/30 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <span className="text-[10px] font-bold">K</span>
          </div>

          <span className="text-xs font-medium text-primary">KiiBank</span>
        </div>

        <span className="text-[11px] text-muted-foreground">Just now</span>
      </div>

      <div className="mt-3">
        <p className="text-sm font-semibold">{journey.template}</p>

        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          Welcome Arthur. Your KiiBank multi-currency account is ready. Discover
          simple and secure ways to manage and move your money.
        </p>

        <Button type="button" size="sm" className="mt-4">
          Explore KiiBank
        </Button>
      </div>
    </div>
  );
}

function WhatsAppPreview({ journey }: { journey: JourneyMessage }) {
  return (
    <div className="w-full rounded-2xl border bg-emerald-50/60 p-4">
      <div className="mb-4 flex items-center gap-2 border-b pb-3">
        <div className="flex size-8 items-center justify-center rounded-full bg-emerald-100">
          <MessageCircleMore className="size-4 text-emerald-700" />
        </div>

        <div>
          <p className="text-xs font-semibold">KiiBank</p>

          <p className="text-[10px] text-muted-foreground">Business account</p>
        </div>
      </div>

      <div className="ml-auto max-w-[90%] rounded-xl rounded-tr-sm border bg-white p-3 shadow-sm">
        <p className="text-xs leading-5">
          <span className="font-semibold">{journey.template}</span>
          <br />
          <br />
          Welcome Arthur. Your KiiBank account is ready. Discover simple and
          secure ways to manage and move your money.
        </p>

        <div className="mt-2 flex items-center justify-end gap-1">
          <span className="text-[10px] text-muted-foreground">10:42</span>

          <span className="text-[10px] text-primary">✓✓</span>
        </div>
      </div>
    </div>
  );
}

function EmailPreview({ journey }: { journey: JourneyMessage }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border bg-background shadow-sm">
      <div className="border-b bg-muted/20 px-4 py-3">
        <div className="flex items-start gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
            <Mail className="size-4 text-primary" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium">KiiBank</p>

            <p className="truncate text-[10px] text-muted-foreground">
              hello@kiibank.com
            </p>
          </div>

          <span className="text-[10px] text-muted-foreground">Just now</span>
        </div>

        <p className="mt-3 text-sm font-semibold">{journey.template}</p>
      </div>

      <div className="p-5">
        <p className="text-sm font-semibold text-primary">KiiBank</p>

        <h4 className="mt-5 text-lg font-semibold">{journey.template}</h4>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Welcome Arthur. Your KiiBank multi-currency account is ready. Discover
          simple and secure ways to manage and move your money.
        </p>

        <Button type="button" size="sm" className="mt-5">
          Explore KiiBank
        </Button>
      </div>
    </div>
  );
}

function InAppPreview({ journey }: { journey: JourneyMessage }) {
  return (
    <div className="w-full rounded-2xl border bg-background p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Bell className="size-5 text-primary" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-semibold">{journey.template}</p>

            <span className="shrink-0 text-[10px] text-muted-foreground">
              Now
            </span>
          </div>

          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Welcome Arthur. Your KiiBank account is ready. Discover simple and
            secure ways to manage and move your money.
          </p>

          <Button type="button" variant="outline" size="sm" className="mt-4">
            View Account
          </Button>
        </div>
      </div>
    </div>
  );
}

function SmsPreview({ journey }: { journey: JourneyMessage }) {
  return (
    <div className="w-full rounded-2xl border bg-sky-50/50 p-4">
      <div className="mb-4 flex items-center justify-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
          <Smartphone className="size-4 text-primary" />
        </div>

        <div>
          <p className="text-xs font-semibold">KiiBank</p>

          <p className="text-[10px] text-muted-foreground">SMS</p>
        </div>
      </div>

      <div className="max-w-[90%] rounded-2xl rounded-bl-sm border bg-background px-4 py-3 shadow-sm">
        <p className="text-xs leading-5">
          {journey.template}. Welcome Arthur. Your KiiBank account is ready.
          Discover simple and secure ways to manage and move your money.
        </p>
      </div>

      <p className="mt-2 text-center text-[10px] text-muted-foreground">
        Delivered just now
      </p>
    </div>
  );
}

function getRecipientPlaceholder(channel: Channel) {
  switch (channel) {
    case "email":
      return "Enter test email address";

    case "whatsapp":
    case "sms":
      return "Enter test phone number";

    case "push":
    case "in-app":
      return "Enter test customer identifier";
  }
}

function getRecipientHelper(channel: Channel) {
  switch (channel) {
    case "email":
      return "Enter the email address that should receive the test email.";

    case "whatsapp":
      return "Enter a WhatsApp-enabled test phone number.";

    case "sms":
      return "Enter a valid test phone number.";

    case "push":
      return "Enter a test customer with an eligible device.";

    case "in-app":
      return "Enter a test customer account.";
  }
}

function getChannelLabel(channel: Channel) {
  return channels.find((item) => item.value === channel)?.label ?? channel;
}
