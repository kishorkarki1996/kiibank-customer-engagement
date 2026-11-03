import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { EngagementSummary } from "./engagement-summary-type";
import { EngagementSummaryContent } from "./engagement-summary-content";
import { Button } from "@/components/ui/button";

type EngagementSummaryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  engagement: EngagementSummary | null;
};

export function EngagementSummaryDialog({
  open,
  onOpenChange,
  engagement,
}: EngagementSummaryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[80vh] flex-col overflow-hidden sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Engagement Summary</DialogTitle>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {engagement && <EngagementSummaryContent engagement={engagement} />}
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
