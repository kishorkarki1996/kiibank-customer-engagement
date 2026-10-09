export type ActivityAuditLogStatus =
  | "Archived"
  | "Completed"
  | "Expired"
  | "Canceled";

export type ActivityAuditLogPriority = "Critical" | "High" | "Medium" | "Low";

export type ActivityAuditLog = {
  id: number;
  engagementId: string;
  engagementName: string;
  category: string;
  user: string;
  dateTime: string;
  action: string;
  previousValue: string;
  newValue: string;
};
