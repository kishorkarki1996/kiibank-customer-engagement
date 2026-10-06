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

type EngagementSummaryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EngagementSummaryDialog({
  open,
  onOpenChange,
}: EngagementSummaryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Engagement Summary</DialogTitle>

          <DialogDescription>
            Read-only summary of the engagement.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <div className="text-xs text-muted-foreground">Engagement Name</div>

            <div className="text-sm font-medium">
              New Customer Welcome Journey
            </div>
          </div>

          <div>
            <div className="text-xs text-muted-foreground">Engagement ID</div>

            <div className="text-sm font-medium">ENG-2026-00124</div>
          </div>

          <div>
            <div className="text-xs text-muted-foreground">Status</div>

            <div className="text-sm font-medium">Active</div>
          </div>

          <div>
            <div className="text-xs text-muted-foreground">Owner</div>

            <div className="text-sm font-medium">John Kamau</div>
          </div>

          <div>
            <div className="text-xs text-muted-foreground">Priority</div>

            <div className="text-sm font-medium">High</div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
