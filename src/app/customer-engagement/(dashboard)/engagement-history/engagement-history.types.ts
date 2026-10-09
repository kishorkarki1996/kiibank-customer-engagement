export type EngagementHistoryStatus =
  | "Archived"
  | "Completed"
  | "Expired"
  | "Canceled";

export type EngagementPriority = "Critical" | "High" | "Medium" | "Low";

export type EngagementHistory = {
  id: number;
  dateTime: string;
  name: string;
  category: string;
  channel: string;
  deliveryResult: string;
};
