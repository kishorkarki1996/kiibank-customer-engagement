import type { EngagementSummary } from "./engagement-summary-type";

export const onboardingEngagement: EngagementSummary = {
  id: "ENG-001",
  name: "New Customer Welcome Journey",
  category: "Onboarding & Lifecycle",
  trigger: "Customer completes signup",
  audience: "All active customers",
  journeyLength: "14 days",
  journeySteps: 5,
  entry: "Once per customer",
  communicationPreferences: "Enforced",
  owner: "Customer Engagement Team",
};

export const transactionEngagement: EngagementSummary = {
  id: "ENG-002",
  name: "Dormant GBP→XAF Customers",
  category: "Transaction Behaviour",
  owner: "Customer Engagement Team",
  audience: "UK / GBP + XAF / Active Customers",
  conditions: "Previous GBP→XAF activity + 30-day inactivity",
  execution: "Daily",
  channels: ["Push Notification", "WhatsApp"],
  frequency: "Once every 30 days/customer",
  exitCondition: "Successful GBP→XAF transaction",
  conversionWindow: "7 days",
};

export const engagementSummaries: EngagementSummary[] = [
  onboardingEngagement,
  transactionEngagement,
];
