"use client";

import { tableFeatures, type ColumnDef } from "@tanstack/react-table";

import type { ArchivedEngagement } from "./archived-engagements.types";
import { dataTableFeatures } from "@/app/customer-engagement/components/data-table/data-table.features";
import { EngagementStatusBadge } from "@/app/customer-engagement/components/engagement-status-badge";
import { EngagementPriorityBadge } from "@/app/customer-engagement/components/engagement-priority-badge";
import { EngagementAction } from "@/app/customer-engagement/components/engagement.type";
import { Button } from "@/components/ui/button";
import { ArchivedEngagementsActions } from "./archived-engagements-actions";
import { Eye } from "lucide-react";
type GetColumnsProps = {
  onView: (engagement: ArchivedEngagement) => void;

  onEdit: (engagement: ArchivedEngagement) => void;

  onAction: (engagement: ArchivedEngagement, action: EngagementAction) => void;
};
export function getOnboardingLifecycleColumns({
  onView,
  onEdit,
  onAction,
}: GetColumnsProps): ColumnDef<
  typeof dataTableFeatures,
  ArchivedEngagement,
  unknown
>[] {
  return [
    {
      id: "sn",
      header: "SN.",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "engagementId",
      header: "Engagement ID",
    },
    {
      accessorKey: "name",
      header: "Engagement Name",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "type",
      header: "Engagement Type",
    },
    // {
    //   accessorKey: "status",
    //   header: "Status",
    //   cell: ({ row }) => <EngagementStatusBadge status={row.original.status} />,
    // },
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
      accessorKey: "lastUpdated",
      header: "Last Updated",
    },
    // {
    //   id: "actions",
    //   header: "Action",
    //   cell: ({ row }) => (
    //     <ArchivedEngagementsActions
    //       engagement={row.original}
    //       onEdit={onEdit}
    //       onAction={onAction}
    //     />
    //   ),
    // },
  ];
}
