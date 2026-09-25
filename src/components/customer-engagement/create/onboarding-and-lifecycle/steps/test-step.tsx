"use client";

import { useEffect, useMemo, useState } from "react";

import { CheckCircle2, Info } from "lucide-react";

import { AppSelect } from "@/components/common/app-select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  TemplatePreview,
  type TemplateVariant,
} from "../../shared/template-preview";

import {
  channelLabels,
  journeyData,
  type JourneyPreviewItem,
} from "../data/journey-preview-data";

export function TestStep() {
  const [selectedJourneyId, setSelectedJourneyId] = useState(
    String(journeyData[0].id),
  );

  const [selectedChannel, setSelectedChannel] = useState<TemplateVariant>(
    journeyData[0].channel,
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

  /**
   * Primary + fallback channels.
   *
   * Their order is also the configured
   * delivery order.
   */
  const availableChannels = useMemo<TemplateVariant[]>(
    () => [selectedJourney.channel, ...selectedJourney.fallbackChannels],
    [selectedJourney],
  );

  const journeyOptions = useMemo(
    () =>
      journeyData.map((step) => ({
        label: `Journey Step ${step.id} — ${step.message}`,
        value: String(step.id),
      })),
    [],
  );

  /**
   * When journey message changes:
   *
   * - Reset preview to primary channel
   * - Clear previous recipient
   * - Clear previous success state
   */
  useEffect(() => {
    setSelectedChannel(selectedJourney.channel);

    setRecipient("");
    setSent(false);
  }, [selectedJourney]);

  const handleJourneyChange = (value: string) => {
    setSelectedJourneyId(value);
  };

  /**
   * TemplatePreview controls which
   * configured channel is being viewed/tested.
   */
  const handleChannelChange = (channel: TemplateVariant) => {
    setSelectedChannel(channel);

    /**
     * The recipient type could change from:
     *
     * Email -> Phone
     * Phone -> Customer ID
     *
     * So clear stale recipient data.
     */
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
       * Replace with dedicated
       * test-send API/server action.
       *
       * await sendJourneyTest({
       *   journeyStepId:
       *     selectedJourney.id,
       *
       *   channel:
       *     selectedChannel,
       *
       *   recipient,
       * });
       *
       * This should NOT execute
       * production journey logic.
       */

      await new Promise((resolve) => setTimeout(resolve, 900));

      setSent(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ------------------------------------ */}
      {/* Journey Message                     */}
      {/* ------------------------------------ */}

      <section className="space-y-5 rounded-xl border bg-background p-5">
        <div>
          <h3 className="text-sm font-semibold">Select Journey Message</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Select the journey message that you want to preview and test.
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

        {/* -------------------------------- */}
        {/* Journey Configuration           */}
        {/* -------------------------------- */}

        <JourneyInformation journey={selectedJourney} />
      </section>

      {/* ------------------------------------ */}
      {/* Preview                             */}
      {/* ------------------------------------ */}

      <TemplatePreview
        title={selectedJourney.message}
        description="Preview the message across its configured channels."
        channels={availableChannels}
        variant={selectedChannel}
        onVariantChange={handleChannelChange}
        htmlContent={selectedJourney.htmlContent}
      />

      {/* ------------------------------------ */}
      {/* Send Test                           */}
      {/* ------------------------------------ */}

      <section className="space-y-5 rounded-xl border bg-background p-5">
        <div>
          <h3 className="text-sm font-semibold">Send Test</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Send the selected journey message through{" "}
            <span className="font-medium text-foreground">
              {channelLabels[selectedChannel]}
            </span>
            .
          </p>
        </div>

        {/* Recipient */}

        <TestRecipientField
          channel={selectedChannel}
          value={recipient}
          onChange={(value) => {
            setRecipient(value);
            setSent(false);
          }}
        />

        {/* Send */}

        <div className="flex justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={handleSendTest}
            disabled={!recipient.trim() || isSending}
          >
            {isSending
              ? "Sending..."
              : `Send Test ${channelLabels[selectedChannel]}`}
          </Button>
        </div>

        {/* Success */}

        {sent && (
          <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-4">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />

            <div>
              <p className="text-sm font-medium">Test message sent</p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {selectedJourney.message} was sent through{" "}
                {channelLabels[selectedChannel]} to {recipient}.
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

/**
 * ------------------------------------------
 * Journey Information
 * ------------------------------------------
 */

function JourneyInformation({ journey }: { journey: JourneyPreviewItem }) {
  return (
    <div className="grid gap-5 rounded-lg bg-muted p-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Send */}

      <div>
        <InfoLabel>Send</InfoLabel>

        <div className="mt-1">
          <p className="text-sm font-medium">{getSendLabel(journey)}</p>

          {journey.send === "delayed-notification" &&
            journey.waitValue &&
            journey.waitUnit && (
              <p className="mt-1 text-xs text-muted-foreground">
                {formatWait(journey.waitValue, journey.waitUnit)}
              </p>
            )}
        </div>
      </div>

      {/* Channel */}

      <div>
        <InfoLabel>Channel</InfoLabel>

        <div className="mt-1">
          <Badge variant="outline" className="bg-background">
            {channelLabels[journey.channel]}
          </Badge>
        </div>
      </div>

      {/* Fallback */}

      <div>
        <InfoLabel>Fallback Channel</InfoLabel>

        <div className="mt-1 flex flex-wrap gap-1.5">
          {journey.fallbackChannels.length > 0 ? (
            journey.fallbackChannels.map((channel) => (
              <Badge key={channel} variant="outline" className="bg-background">
                {channelLabels[channel]}
              </Badge>
            ))
          ) : (
            <span className="text-sm font-medium">None</span>
          )}
        </div>
      </div>

      {/* Condition */}

      <div>
        <InfoLabel>Step Condition</InfoLabel>

        <p className="mt-1 text-sm font-medium">
          {journey.conditionMode === "always" ? "Always send" : "Has condition"}
        </p>
      </div>
    </div>
  );
}

function InfoLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-muted-foreground">{children}</p>;
}

/**
 * ------------------------------------------
 * Test Recipient
 * ------------------------------------------
 */

function TestRecipientField({
  channel,
  value,
  onChange,
}: {
  channel: TemplateVariant;
  value: string;
  onChange: (value: string) => void;
}) {
  const config = getRecipientConfig(channel);

  return (
    <div className="space-y-2">
      <Label htmlFor="test-recipient">
        {config.label}

        <span className="ml-1 text-destructive">*</span>
      </Label>

      <Input
        id="test-recipient"
        type={config.type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={config.placeholder}
      />

      <p className="text-xs text-muted-foreground">{config.helper}</p>
    </div>
  );
}

function getRecipientConfig(channel: TemplateVariant): {
  label: string;
  type: "text" | "email" | "tel";
  placeholder: string;
  helper: string;
} {
  switch (channel) {
    case "email":
      return {
        label: "Test Email Address",
        type: "email",
        placeholder: "name@example.com",
        helper: "Enter the email address that should receive the test email.",
      };

    case "whatsapp":
      return {
        label: "WhatsApp Number",
        type: "tel",
        placeholder: "+44 7700 900123",
        helper: "Enter a WhatsApp-enabled phone number.",
      };

    case "sms":
      return {
        label: "Test Phone Number",
        type: "tel",
        placeholder: "+44 7700 900123",
        helper: "Enter a valid phone number that can receive SMS.",
      };

    case "push":
      return {
        label: "Test Customer",
        type: "text",
        placeholder: "Enter customer ID or account",
        helper: "Enter a test customer with an eligible registered device.",
      };

    case "in-app":
      return {
        label: "Test Customer",
        type: "text",
        placeholder: "Enter customer ID or account",
        helper:
          "Enter the customer account that should receive the in-app message.",
      };
  }
}

/**
 * ------------------------------------------
 * Helpers
 * ------------------------------------------
 */

function getSendLabel(journey: JourneyPreviewItem) {
  if (journey.send === "delayed-notification") {
    return "Delayed Notification";
  }

  return "Immediately after entry";
}

function formatWait(
  value: number,
  unit: "hours" | "days" | "weeks" | "months",
) {
  const labels = {
    hours: "hour",
    days: "day",
    weeks: "week",
    months: "month",
  };

  const label = labels[unit];

  return `${value} ${value === 1 ? label : `${label}s`}`;
}
