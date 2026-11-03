export type EngagementCategory =
  | "Onboarding & Lifecycle"
  | "Transaction Behaviour";

type BaseEngagementSummary = {
  id: string;
  name: string;
  owner: string;
};

export type OnboardingEngagementSummary = BaseEngagementSummary & {
  category: "Onboarding & Lifecycle";
  trigger: string;
  audience: string;
  journeyLength: string;
  journeySteps: number;
  entry: string;
  communicationPreferences: string;
};

export type TransactionBehaviourEngagementSummary = BaseEngagementSummary & {
  category: "Transaction Behaviour";
  audience: string;
  conditions: string;
  execution: string;
  channels: string[];
  frequency: string;
  exitCondition: string;
  conversionWindow: string;
};

export type EngagementSummary =
  | OnboardingEngagementSummary
  | TransactionBehaviourEngagementSummary;
