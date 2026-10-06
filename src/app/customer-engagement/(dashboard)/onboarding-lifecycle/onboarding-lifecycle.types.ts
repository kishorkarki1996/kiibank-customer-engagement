export type EngagementStatus =
  | "Active"
  | "Draft"
  | "Scheduled"
  | "Paused"
  | "Pending Approval"
  | "Completed"
  | "Expired"
  | "Canceled";

export type EngagementPriority =
  | "Critical"
  | "High"
  | "Medium"
  | "Low";

export type OnboardingLifecycleEngagement = {
  id: number;
  engagementId: string;
  name: string;
  type: string;
  status: EngagementStatus;
  owner: string;
  priority: EngagementPriority;
  startDate: string;
  endDate: string;
  nextExecution: string;
  lastExecution: string;
  lastUpdated: string;
};