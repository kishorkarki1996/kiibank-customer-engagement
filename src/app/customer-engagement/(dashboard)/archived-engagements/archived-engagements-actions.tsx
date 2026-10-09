"use client";

import {
  Check,
  Edit,
  MoreHorizontal,
  Pause,
  Play,
  Trash2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type {
  ArchivedEngagementStatus,
  ArchivedEngagement,
} from "./archived-engagements.types";
import { EngagementAction } from "@/app/customer-engagement/components/engagement.type";

type ArchivedEngagementsActionsProps = {
  engagement: ArchivedEngagement;
  onEdit: (engagement: ArchivedEngagement) => void;
  onAction: (engagement: ArchivedEngagement, action: EngagementAction) => void;
};

function canEdit(status: ArchivedEngagementStatus) {
  return ![
    "Scheduled",
    "Active",
    "Paused",
    "Completed",
    "Expired",
    "Canceled",
  ].includes(status);
}

// function canApprove(status: ArchivedEngagementStatus) {
//   return status === "Pending Approval";
// }

// function canActivate(status: EngagementStatus) {
//   return status === "Draft";
// }

// function canPause(status: EngagementStatus) {
//   return status === "Scheduled" || status === "Active";
// }

// function canResume(status: EngagementStatus) {
//   return status === "Paused";
// }

// function canCancel(status: EngagementStatus) {
//   return !["Completed", "Expired", "Canceled"].includes(status);
// }

// function canDelete(status: EngagementStatus) {
//   return status === "Draft" || status === "Pending Approval";
// }

export function ArchivedEngagementsActions({
  engagement,
  onEdit,
  onAction,
}: ArchivedEngagementsActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <MoreHorizontal className="size-4" />

          <span className="sr-only">Open actions</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        {canEdit(engagement.status) && (
          <DropdownMenuItem onClick={() => onEdit(engagement)}>
            <Edit className="size-4" />
            Edit
          </DropdownMenuItem>
        )}

        {/* {canApprove(engagement.status) && (
          <DropdownMenuItem onClick={() => onAction(engagement, "approve")}>
            <Check className="size-4" />
            Approve
          </DropdownMenuItem>
        )}

        {canActivate(engagement.status) && (
          <DropdownMenuItem onClick={() => onAction(engagement, "activate")}>
            <Play className="size-4" />
            Activate
          </DropdownMenuItem>
        )}

        {canPause(engagement.status) && (
          <DropdownMenuItem onClick={() => onAction(engagement, "pause")}>
            <Pause className="size-4" />
            Pause
          </DropdownMenuItem>
        )}

        {canResume(engagement.status) && (
          <DropdownMenuItem onClick={() => onAction(engagement, "resume")}>
            <Play className="size-4" />
            Resume
          </DropdownMenuItem>
        )}

        {canCancel(engagement.status) && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => onAction(engagement, "cancel")}
            >
              <X className="size-4" />
              Cancel
            </DropdownMenuItem>
          </>
        )}

        {canDelete(engagement.status) && (
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => onAction(engagement, "delete")}
          >
            <Trash2 className="size-4" />
            Delete
          </DropdownMenuItem>
        )} */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
