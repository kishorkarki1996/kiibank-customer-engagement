import { ChannelFlow, SummaryRow } from "./engagement-summary-row";

import type {
  EngagementSummary,
  OnboardingEngagementSummary,
  TransactionBehaviourEngagementSummary,
} from "./engagement-summary-type";

type Props = {
  engagement: EngagementSummary;
};

export function EngagementSummaryContent({ engagement }: Props) {
  return (
    <section className="overflow-hidden rounded-xl border bg-background">
      <div className="divide-y">
        {engagement.category === "Onboarding & Lifecycle" ? (
          <OnboardingSummary engagement={engagement} />
        ) : (
          <TransactionBehaviourSummary engagement={engagement} />
        )}
      </div>
    </section>
  );
}

function OnboardingSummary({
  engagement,
}: {
  engagement: OnboardingEngagementSummary;
}) {
  return (
    <>
      <SummaryRow label="Name" value={engagement.name} />

      <SummaryRow label="Category" value={engagement.category} />

      <SummaryRow label="Trigger" value={engagement.trigger} />

      <SummaryRow label="Audience" value={engagement.audience} />

      <SummaryRow label="Journey Length" value={engagement.journeyLength} />

      <SummaryRow label="Journey Steps" value={engagement.journeySteps} />

      <SummaryRow label="Entry" value={engagement.entry} />

      <SummaryRow
        label="Communication Preferences"
        value={engagement.communicationPreferences}
      />

      <SummaryRow label="Owner" value={engagement.owner} />
    </>
  );
}

function TransactionBehaviourSummary({
  engagement,
}: {
  engagement: TransactionBehaviourEngagementSummary;
}) {
  return (
    <>
      <SummaryRow label="Engagement Name" value={engagement.name} />

      <SummaryRow label="Category" value={engagement.category} />

      <SummaryRow label="Owner" value={engagement.owner} />

      <SummaryRow label="Audience" value={engagement.audience} />

      <SummaryRow label="Conditions" value={engagement.conditions} />

      <SummaryRow label="Execution" value={engagement.execution} />

      <SummaryRow label="Channel">
        <ChannelFlow channels={engagement.channels} />
      </SummaryRow>

      <SummaryRow label="Frequency" value={engagement.frequency} />

      <SummaryRow label="Exit Condition" value={engagement.exitCondition} />

      <SummaryRow
        label="Conversion Window"
        value={engagement.conversionWindow}
      />
    </>
  );
}
