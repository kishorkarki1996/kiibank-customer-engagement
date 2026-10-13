export type EngagementStatus =
  | "Active"
  | "Draft"
  | "Scheduled"
  | "Paused"
  | "Pending Approval"
  | "Canceled";

export type EngagementPriority = "Critical" | "High" | "Medium" | "Low";

export type EngagementAction =
  | "submit"
  | "approve"
  | "reject"
  | "withdraw"
  | "pause"
  | "resume"
  | "cancel"
  | "delete"
  | "archive";
// | "activate";
