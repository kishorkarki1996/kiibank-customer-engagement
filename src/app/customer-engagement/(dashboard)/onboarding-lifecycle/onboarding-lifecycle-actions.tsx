"use client";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { OnboardingLifecycleEngagement } from "./onboarding-lifecycle.types";

import type {
  EngagementAction,
  EngagementStatus,
  ActionPermission,
} from "@/app/customer-engagement/components/engagement-actions/engagement-action.types";

type OnboardingLifecycleActionsProps = {
  engagement: OnboardingLifecycleEngagement;

  onEdit: (engagement: OnboardingLifecycleEngagement) => void;

  onAction: (
    engagement: OnboardingLifecycleEngagement,
    action: EngagementAction,
  ) => void;

  permissions?: ActionPermission;
};

// Development-only permissions.
// Replace these with the logged-in user's actual permissions.
const defaultPermissions: ActionPermission = {
  edit: true,
  approve: true,
  activate: true,
  pause: true,
  resume: true,
  cancel: true,
  delete: true,
};

function canEdit(status: EngagementStatus) {
  return status === "Draft" || status === "Pending Approval";
}

function canApprove(status: EngagementStatus) {
  return status === "Pending Approval";
}

function canActivate(status: EngagementStatus) {
  return status === "Draft";
}

function canPause(status: EngagementStatus) {
  return status === "Active" || status === "Scheduled";
}

function canResume(status: EngagementStatus) {
  return status === "Paused";
}

function canCancel(status: EngagementStatus) {
  return (
    status === "Draft" ||
    status === "Pending Approval" ||
    status === "Scheduled" ||
    status === "Active" ||
    status === "Paused"
  );
}

function canDelete(status: EngagementStatus) {
  return status === "Draft" || status === "Pending Approval";
}

export function OnboardingLifecycleActions({
  engagement,
  onEdit,
  onAction,
  permissions = defaultPermissions,
}: OnboardingLifecycleActionsProps) {
  const status = engagement.status;

  const showEdit = canEdit(status) && permissions.edit;
  const showApprove = canApprove(status) && permissions.approve;
  const showActivate = canActivate(status) && permissions.activate;
  const showPause = canPause(status) && permissions.pause;
  const showResume = canResume(status) && permissions.resume;
  const showCancel = canCancel(status) && permissions.cancel;
  const showDelete = canDelete(status) && permissions.delete;

  const hasAvailableActions =
    showEdit ||
    showApprove ||
    showActivate ||
    showPause ||
    showResume ||
    showCancel ||
    showDelete;

  const hasDestructiveActions = showCancel || showDelete;

  if (!hasAvailableActions) {
    return (
      <Button variant="ghost" size="icon" className="size-8" disabled>
        <MoreHorizontal className="size-4" />
        <span className="sr-only">No available actions</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <MoreHorizontal className="size-4" />
          <span className="sr-only">Open actions</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52">
        {showEdit && (
          <DropdownMenuItem onClick={() => onEdit(engagement)}>
            Edit
          </DropdownMenuItem>
        )}

        {showApprove && (
          <DropdownMenuItem onClick={() => onAction(engagement, "approve")}>
            Approve
          </DropdownMenuItem>
        )}

        {showActivate && (
          <DropdownMenuItem onClick={() => onAction(engagement, "activate")}>
            Activate
          </DropdownMenuItem>
        )}

        {showPause && (
          <DropdownMenuItem onClick={() => onAction(engagement, "pause")}>
            Pause
          </DropdownMenuItem>
        )}

        {showResume && (
          <DropdownMenuItem onClick={() => onAction(engagement, "resume")}>
            Resume
          </DropdownMenuItem>
        )}

        {hasDestructiveActions && <DropdownMenuSeparator />}

        {showCancel && (
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => onAction(engagement, "cancel")}
          >
            Cancel
          </DropdownMenuItem>
        )}

        {showDelete && (
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => onAction(engagement, "delete")}
          >
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
