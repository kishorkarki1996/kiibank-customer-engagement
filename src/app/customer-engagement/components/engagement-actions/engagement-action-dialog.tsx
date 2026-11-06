"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type {
  ActionRequest,
  EngagementAction,
} from "./engagement-action.types";

type EngagementActionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  engagementId: string;
  engagementName: string;
  action: EngagementAction | null;

  onConfirm: (request: ActionRequest) => void;
};

const actionContent: Record<
  EngagementAction,
  {
    title: string;
    description: string;
    confirmLabel: string;
    destructive?: boolean;
    requiresReason?: boolean;
  }
> = {
  edit: {
    title: "Edit Engagement",
    description: "Are you sure you want to edit this engagement?",
    confirmLabel: "Continue",
  },

  approve: {
    title: "Approve Engagement",
    description: "Are you sure you want to approve this engagement?",
    confirmLabel: "Approve",
  },

  pause: {
    title: "Pause Engagement",
    description:
      "This will temporarily stop the engagement. You can resume it later.",
    confirmLabel: "Pause",
    requiresReason: true,
  },

  resume: {
    title: "Resume Engagement",
    description: "Are you sure you want to resume this engagement?",
    confirmLabel: "Resume",
  },

  cancel: {
    title: "Cancel Engagement",
    description:
      "This will permanently stop the engagement. It cannot be resumed after cancellation.",
    confirmLabel: "Cancel Engagement",
    destructive: true,
    requiresReason: true,
  },

  delete: {
    title: "Delete Engagement",
    description:
      "This will permanently delete the engagement configuration. This action cannot be undone.",
    confirmLabel: "Delete",
    destructive: true,
  },
  activate: {
    title: "Activate Engagement",
    description: "Are you sure you want to activate this engagement?",
    confirmLabel: "Activate",
  },
};

export function EngagementActionDialog({
  open,
  onOpenChange,
  engagementId,
  engagementName,
  action,
  onConfirm,
}: EngagementActionDialogProps) {
  const [reason, setReason] = useState("");

  if (!action) {
    return null;
  }

  const content = actionContent[action];

  const handleClose = () => {
    setReason("");
    onOpenChange(false);
  };

  const handleConfirm = () => {
    if (content.requiresReason && !reason.trim()) {
      return;
    }

    onConfirm({
      engagementId,
      action,
      reason: reason.trim() || undefined,
    });

    setReason("");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          handleClose();
          return;
        }

        onOpenChange(nextOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{content.title}</DialogTitle>

          <DialogDescription>{content.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium">{engagementName}</p>

            <p className="mt-1 text-xs text-muted-foreground">{engagementId}</p>
          </div>

          {content.requiresReason && (
            <div className="space-y-2">
              <Label htmlFor="engagement-action-reason">Reason</Label>

              <Textarea
                id="engagement-action-reason"
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                placeholder={`Enter reason for ${content.confirmLabel.toLowerCase()}...`}
                className="min-h-24 resize-none"
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose}>
            Back
          </Button>

          <Button
            type="button"
            variant={content.destructive ? "destructive" : "default"}
            disabled={content.requiresReason && !reason.trim()}
            onClick={handleConfirm}
          >
            {content.confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
