export type ArchivedEngagementStatus =
  | "Archived"
  | "Completed"
  | "Expired"
  | "Canceled";

export type EngagementPriority = "Critical" | "High" | "Medium" | "Low";

export type ArchivedEngagement = {
  id: number;
  engagementId: string;
  name: string;
  category: string;
  type: string;
  status: ArchivedEngagementStatus;
  owner: string;
  priority: EngagementPriority;
  startDate: string;
  endDate: string;
  nextExecution: string;
  lastExecution: string;
  lastUpdated: string;
};
