import { Badge } from "@/components/ui/badge";
import { EngagementPriority } from "../(dashboard)/engagements/onboarding-lifecycle/onboarding-lifecycle.types";

type EngagementPriorityBadgeProps = {
  priority: EngagementPriority;
};

const priorityStyles: Record<EngagementPriority, string> = {
  Critical: "border-red-200 bg-red-50 text-red-700",
  High: "border-orange-200 bg-orange-50 text-orange-700",
  Medium: "border-amber-200 bg-amber-50 text-amber-700",
  Low: "border-slate-200 bg-slate-50 text-slate-600",
};

export function EngagementPriorityBadge({
  priority,
}: EngagementPriorityBadgeProps) {
  return (
    <Badge variant="outline" className={priorityStyles[priority]}>
      {priority}
    </Badge>
  );
}
