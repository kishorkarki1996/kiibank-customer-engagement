"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { EngagementAction } from "./engagement.type";

type EngagementActionConfirmationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: EngagementAction | null;
  engagementName?: string;
  onConfirm: () => void;
};

const actionContent: Record<
  EngagementAction,
  {
    title: string;
    description: string;
    confirmLabel: string;
    destructive?: boolean;
  }
> = {
  submit: {
    title: "Submit Engagement",
    description:
      "Are you sure you want to submit this engagement for approval?",
    confirmLabel: "Submit for Approval",
  },

  approve: {
    title: "Approve Engagement",
    description: "Are you sure you want to approve this engagement?",
    confirmLabel: "Approve",
  },

  reject: {
    title: "Reject Engagement",
    description: "Are you sure you want to reject this engagement?",
    confirmLabel: "Reject",
    destructive: true,
  },

  withdraw: {
    title: "Withdraw Engagement",
    description:
      "Are you sure you want to withdraw this engagement from the approval process?",
    confirmLabel: "Withdraw",
  },

  pause: {
    title: "Pause Engagement",
    description: "Are you sure you want to pause this engagement?",
    confirmLabel: "Pause",
  },

  resume: {
    title: "Resume Engagement",
    description: "Are you sure you want to resume this engagement?",
    confirmLabel: "Resume",
  },

  cancel: {
    title: "Cancel Engagement",
    description:
      "Are you sure you want to cancel this engagement? This will stop it from running.",
    confirmLabel: "Cancel Engagement",
    destructive: true,
  },

  delete: {
    title: "Delete Engagement",
    description:
      "Are you sure you want to delete this engagement? This action cannot be undone.",
    confirmLabel: "Delete",
    destructive: true,
  },

  archive: {
    title: "Archive Engagement",
    description: "Are you sure you want to archive this engagement?",
    confirmLabel: "Archive",
  },
};

export function EngagementActionConfirmationDialog({
  open,
  onOpenChange,
  action,
  engagementName,
  onConfirm,
}: EngagementActionConfirmationDialogProps) {
  if (!action) {
    return null;
  }

  const content = actionContent[action];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{content.title}</DialogTitle>

          <DialogDescription>{content.description}</DialogDescription>
        </DialogHeader>

        {/* {engagementName && (
          <div className="rounded-md border bg-muted/40 p-3">
            <div className="text-sm font-medium">{engagementName}</div>
          </div>
        )} */}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Discard
          </Button>

          <Button
            variant={content.destructive ? "destructive" : "default"}
            onClick={onConfirm}
          >
            {content.confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
