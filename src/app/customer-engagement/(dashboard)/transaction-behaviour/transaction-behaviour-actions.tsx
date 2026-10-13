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

import type {
  EngagementAction,
  EngagementStatus,
} from "@/app/customer-engagement/components/engagement.type";

import type { TransactionBehaviourEngagement } from "./transaction-behaviour.types";

type TransactionBehaviourActionsProps = {
  engagement: TransactionBehaviourEngagement;
  onEdit: (engagement: TransactionBehaviourEngagement) => void;
  onAction: (
    engagement: TransactionBehaviourEngagement,
    action: EngagementAction,
  ) => void;
};

function canEdit(status: EngagementStatus) {
  return status === "Draft";
}

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
  return status === "Scheduled" || status === "Active";
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

export function TransactionBehaviourActions({
  engagement,
  onEdit,
  onAction,
}: TransactionBehaviourActionsProps) {
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
