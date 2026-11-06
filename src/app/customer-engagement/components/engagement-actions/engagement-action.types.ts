export type EngagementStatus =
  | "Draft"
  | "Pending Approval"
  | "Scheduled"
  | "Active"
  | "Paused"
  | "Canceled";

export type EngagementAction =
  | "edit"
  | "approve"
  | "activate"
  | "pause"
  | "resume"
  | "cancel"
  | "delete";

export type ActionPermission = {
  edit: boolean;
  approve: boolean;
  activate: boolean;
  pause: boolean;
  resume: boolean;
  cancel: boolean;
  delete: boolean;
};

export type ActionRequest = {
  engagementId: string;
  action: EngagementAction;
  reason?: string;
};

export type VerificationMethod = "authenticator" | "sms" | "email";

export type VerificationRequest = {
  engagementId: string;
  action: EngagementAction;
  method: VerificationMethod;
  code: string;
};
