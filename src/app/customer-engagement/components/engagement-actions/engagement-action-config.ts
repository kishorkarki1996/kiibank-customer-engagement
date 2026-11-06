import type {
  EngagementAction,
  EngagementStatus,
  ActionPermission,
} from "./engagement-action.types";

export const actionConfig: Record<
  EngagementAction,
  {
    label: string;
    description: string;
    requiresReason: boolean;
    requiresConfirmation: boolean;
    variant: "default" | "destructive";
  }
> = {
  edit: {
    label: "Edit",
    description: "Edit this engagement configuration.",
    requiresReason: false,
    requiresConfirmation: false,
    variant: "default",
  },
  approve: {
    label: "Approve",
    description: "Approve and schedule this engagement?",
    requiresReason: false,
    requiresConfirmation: true,
    variant: "default",
  },
  activate: {
    label: "Activate",
    description: "Activate and schedule this engagement?",
    requiresReason: false,
    requiresConfirmation: true,
    variant: "default",
  },
  pause: {
    label: "Pause",
    description: "Temporarily pause this engagement?",
    requiresReason: true,
    requiresConfirmation: true,
    variant: "default",
  },
  resume: {
    label: "Resume",
    description: "Resume this engagement?",
    requiresReason: true,
    requiresConfirmation: true,
    variant: "default",
  },
  cancel: {
    label: "Cancel",
    description: "Permanently cancel this engagement? This cannot be undone.",
    requiresReason: true,
    requiresConfirmation: true,
    variant: "destructive",
  },
  delete: {
    label: "Delete",
    description:
      "Permanently delete this engagement configuration? The audit log will be retained.",
    requiresReason: false,
    requiresConfirmation: true,
    variant: "destructive",
  },
};

export function getAvailableActions(
  status: EngagementStatus,
  permissions: ActionPermission,
): EngagementAction[] {
  const actions: EngagementAction[] = [];

  if (status === "Draft" || status === "Pending Approval") {
    actions.push("edit");

    if (status === "Draft") {
      actions.push("activate");
    } else {
      actions.push("approve");
    }

    actions.push("delete");
  }

  if (status === "Scheduled" || status === "Active") {
    actions.push("pause");
  }

  if (status === "Paused") {
    actions.push("resume");
  }

  if (
    status === "Draft" ||
    status === "Pending Approval" ||
    status === "Scheduled" ||
    status === "Active" ||
    status === "Paused"
  ) {
    actions.push("cancel");
  }

  return actions.filter((action) => permissions[action]);
}
