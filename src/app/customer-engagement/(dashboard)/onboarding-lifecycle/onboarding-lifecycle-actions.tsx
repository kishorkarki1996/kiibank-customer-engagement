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
} from "@/app/customer-engagement/components/engagement.type";

type OnboardingLifecycleActionsProps = {
  engagement: OnboardingLifecycleEngagement;
  onEdit: (engagement: OnboardingLifecycleEngagement) => void;
  onAction: (
    engagement: OnboardingLifecycleEngagement,
    action: EngagementAction,
  ) => void;
};

function canEdit(status: EngagementStatus) {
  return status === "Draft";
}

// function canSubmit(status: EngagementStatus) {
//   return status === "Draft";
// }

function canApprove(status: EngagementStatus) {
  return status === "Pending Approval";
}

function canReject(status: EngagementStatus) {
  return status === "Pending Approval";
}

function canWithdraw(status: EngagementStatus) {
  return status === "Pending Approval";
}

function canPause(status: EngagementStatus) {
  return status === "Active" || status === "Scheduled";
}

function canResume(status: EngagementStatus) {
  return status === "Paused";
}

function canCancel(status: EngagementStatus) {
  return status === "Scheduled" || status === "Active" || status === "Paused";
}

function canDelete(status: EngagementStatus) {
  return status === "Draft";
}

function canArchive(status: EngagementStatus) {
  return status === "Canceled";
}

export function OnboardingLifecycleActions({
  engagement,
  onEdit,
  onAction,
}: OnboardingLifecycleActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <MoreHorizontal className="size-4" />

          <span className="sr-only">Open actions</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52">
        {canEdit(engagement.status) && (
          <DropdownMenuItem onClick={() => onEdit(engagement)}>
            Edit
          </DropdownMenuItem>
        )}

        {/* {canSubmit(engagement.status) && (
          <DropdownMenuItem onClick={() => onAction(engagement, "submit")}>
            Submit for Approval
          </DropdownMenuItem>
        )} */}

        {canApprove(engagement.status) && (
          <DropdownMenuItem onClick={() => onAction(engagement, "approve")}>
            Approve
          </DropdownMenuItem>
        )}

        {canReject(engagement.status) && (
          <DropdownMenuItem onClick={() => onAction(engagement, "reject")}>
            Reject
          </DropdownMenuItem>
        )}

        {canWithdraw(engagement.status) && (
          <DropdownMenuItem onClick={() => onAction(engagement, "withdraw")}>
            Withdraw
          </DropdownMenuItem>
        )}

        {canPause(engagement.status) && (
          <DropdownMenuItem onClick={() => onAction(engagement, "pause")}>
            Pause
          </DropdownMenuItem>
        )}

        {canResume(engagement.status) && (
          <DropdownMenuItem onClick={() => onAction(engagement, "resume")}>
            Resume
          </DropdownMenuItem>
        )}

        {canArchive(engagement.status) && (
          <DropdownMenuItem onClick={() => onAction(engagement, "archive")}>
            Archive
          </DropdownMenuItem>
        )}

        {(canCancel(engagement.status) || canDelete(engagement.status)) && (
          <DropdownMenuSeparator />
        )}

        {canCancel(engagement.status) && (
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => onAction(engagement, "cancel")}
          >
            Cancel
          </DropdownMenuItem>
        )}

        {canDelete(engagement.status) && (
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
