"use client";

import { tableFeatures, type ColumnDef } from "@tanstack/react-table";

import type { OnboardingLifecycleEngagement } from "./onboarding-lifecycle.types";
import { dataTableFeatures } from "@/app/customer-engagement/components/data-table/data-table.features";
import { EngagementStatusBadge } from "@/app/customer-engagement/components/engagement-status-badge";
import { EngagementPriorityBadge } from "@/app/customer-engagement/components/engagement-priority-badge";
import { EngagementAction } from "@/app/customer-engagement/components/engagement.type";
import { Button } from "@/components/ui/button";
import { OnboardingLifecycleActions } from "./onboarding-lifecycle-actions";
import { Eye } from "lucide-react";
type GetColumnsProps = {
  onView: (engagement: OnboardingLifecycleEngagement) => void;

  onEdit: (engagement: OnboardingLifecycleEngagement) => void;

  onAction: (
    engagement: OnboardingLifecycleEngagement,
    action: EngagementAction,
  ) => void;
};
export function getOnboardingLifecycleColumns({
  onView,
  onEdit,
  onAction,
}: GetColumnsProps): ColumnDef<
  typeof dataTableFeatures,
  OnboardingLifecycleEngagement,
  unknown
>[] {
  return [
    {
      accessorKey: "engagementId",
      header: "Engagement ID",
    },
    {
      accessorKey: "name",
      header: "Engagement Name",
    },
    {
      accessorKey: "type",
      header: "Engagement Type",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <EngagementStatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "owner",
      header: "Owner",
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => (
        <EngagementPriorityBadge priority={row.original.priority} />
      ),
    },
    {
      id: "summary",
      header: "View Summary",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          onClick={() => onView(row.original)}
        >
          <Eye className="size-4" />
          View
        </Button>
      ),
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
    },
    {
      accessorKey: "endDate",
      header: "End Date",
    },
    {
      accessorKey: "nextExecution",
      header: "Next Execution",
    },
    {
      accessorKey: "lastExecution",
      header: "Last Execution",
    },
    {
      accessorKey: "lastUpdated",
      header: "Last Updated",
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <OnboardingLifecycleActions
          engagement={row.original}
          onEdit={onEdit}
          onAction={onAction}
        />
      ),
    },
  ];
}
