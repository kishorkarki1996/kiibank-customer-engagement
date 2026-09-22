import { Badge } from "@/components/ui/badge";
import { EngagementStatus } from "../(dashboard)/engagements/onboarding-lifecycle/onboarding-lifecycle.types";

type EngagementStatusBadgeProps = {
  status: EngagementStatus;
};

const statusStyles: Record<EngagementStatus, string> = {
  Active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Draft: "border-slate-200 bg-slate-50 text-slate-600",
  Scheduled: "border-sky-200 bg-sky-50 text-sky-700",
  Paused: "border-amber-200 bg-amber-50 text-amber-700",
  "Pending Approval": "border-purple-200 bg-purple-50 text-purple-700",
  Completed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Expired: "border-slate-200 bg-slate-50 text-slate-600",
  Canceled: "border-red-200 bg-red-50 text-red-700",
};

export function EngagementStatusBadge({ status }: EngagementStatusBadgeProps) {
  return (
    <Badge variant="outline" className={statusStyles[status]}>
      {status}
    </Badge>
  );
}
