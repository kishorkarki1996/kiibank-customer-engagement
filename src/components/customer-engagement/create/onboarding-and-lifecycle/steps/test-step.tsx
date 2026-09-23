"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Info, Send } from "lucide-react";

import { AppSelect } from "@/components/common/app-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  TemplatePreview,
  type TemplateVariant,
} from "../../shared/template-preview";

import { channelLabels, journeyData } from "../data/journey-preview-data";

export function TestStep() {
  const [selectedJourneyId, setSelectedJourneyId] = useState(
    String(journeyData[0].id),
  );

  const [recipient, setRecipient] = useState("");

  const [isSending, setIsSending] = useState(false);

  const [sent, setSent] = useState(false);

  const selectedJourney = useMemo(() => {
    return (
      journeyData.find((step) => String(step.id) === selectedJourneyId) ??
      journeyData[0]
    );
  }, [selectedJourneyId]);

  const journeyOptions = useMemo(
    () =>
      journeyData.map((step) => ({
        label: `Journey Step ${step.id} — ${step.message}`,
        value: String(step.id),
      })),
    [],
  );

  const handleJourneyChange = (value: string) => {
    setSelectedJourneyId(value);

    setRecipient("");
    setSent(false);
  };

  const handleSendTest = async () => {
    if (!recipient.trim()) {
      return;
    }

    setIsSending(true);
    setSent(false);

    try {
      /**
       * TODO:
       *
       * Replace this with your dedicated test-send
       * API/server action.
       *
       * await sendJourneyTest({
       *   journeyStepId: selectedJourney.id,
       *   channel: selectedJourney.channel,
       *   recipient,
       * });
       */

      await new Promise((resolve) => setTimeout(resolve, 900));

      setSent(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Select Journey Message */}

      <section className="space-y-5 rounded-xl border bg-background p-5">
        <div>
          <h3 className="text-sm font-semibold">Select Journey Message</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Choose the journey message you want to preview and send to a test
            recipient.
          </p>
        </div>

        <div className="max-w-xl">
          <AppSelect
            label="Journey Message"
            value={selectedJourneyId}
            onValueChange={handleJourneyChange}
            options={journeyOptions}
            placeholder="Select journey message"
            required
          />
        </div>

        {/* Selected Journey Information */}

        <div className="grid gap-3 rounded-lg bg-muted p-4 sm:grid-cols-3">
          <JourneyInfo label="Timing" value={selectedJourney.timing} />

          <JourneyInfo
            label="Channel"
            value={channelLabels[selectedJourney.channel]}
          />

          <JourneyInfo label="Condition" value={selectedJourney.condition} />
        </div>
      </section>

      {/* Preview */}

      <TemplatePreview
        title={selectedJourney.message}
        description={`Preview for ${channelLabels[selectedJourney.channel]}`}
        channels={selectedJourney.channel}
        variant={selectedJourney.channel}
        htmlContent={selectedJourney.htmlContent}
      />

      {/* Send Test */}

      <section className="space-y-5 rounded-xl border bg-background p-5">
        <div>
          <h3 className="text-sm font-semibold">Send Test</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Send the selected journey message through its configured channel.
          </p>
        </div>

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
            placeholder={getRecipientPlaceholder(selectedJourney.channel)}
          />

          <p className="text-xs text-muted-foreground">
            {getRecipientHelper(selectedJourney.channel)}
          </p>
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            onClick={handleSendTest}
            disabled={!recipient.trim() || isSending}
            variant={"secondary"}
          >
            {isSending
              ? "Sending..."
              : `Send Test ${channelLabels[selectedJourney.channel]}`}
          </Button>
        </div>

        {sent && (
          <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-4">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />

            <div>
              <p className="text-sm font-medium">Test message sent</p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {selectedJourney.message} was sent through{" "}
                {channelLabels[selectedJourney.channel]} to {recipient}.
              </p>
            </div>
          </div>
        )}

        {/* Safety */}

        <div className="flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <Info className="mt-0.5 size-4 shrink-0 text-primary" />

          <div>
            <p className="text-sm font-medium">
              Test sends are isolated from production
            </p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Test recipients are not enrolled in the journey. Audience
              eligibility, entry rules, message conditions, duplicate protection
              and re-entry rules are not evaluated for test sends.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function JourneyInfo({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>

      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}

function getRecipientPlaceholder(channel: TemplateVariant) {
  switch (channel) {
    case "email":
      return "Enter test email address";

    case "sms":
    case "whatsapp":
      return "Enter test phone number";

    case "push":
    case "in-app":
      return "Enter test customer identifier";
  }
}

function getRecipientHelper(channel: TemplateVariant) {
  switch (channel) {
    case "email":
      return "Enter the email address that should receive the test email.";

    case "whatsapp":
      return "Enter a WhatsApp-enabled test phone number.";

    case "sms":
      return "Enter a valid test phone number.";

    case "push":
      return "Enter a test customer with an eligible device for push notifications.";

    case "in-app":
      return "Enter a test customer account for the in-app message.";
  }
}
