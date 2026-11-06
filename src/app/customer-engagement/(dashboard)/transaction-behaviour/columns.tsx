"use client";

import { tableFeatures, type ColumnDef } from "@tanstack/react-table";

import type { TransactionBehaviourEngagement } from "./transaction-behaviour.types";
import { dataTableFeatures } from "@/app/customer-engagement/components/data-table/data-table.features";
import { EngagementStatusBadge } from "@/app/customer-engagement/components/engagement-status-badge";
import { EngagementPriorityBadge } from "@/app/customer-engagement/components/engagement-priority-badge";
import type { EngagementAction } from "@/app/customer-engagement/components/engagement-actions/engagement-action.types";
import { Button } from "@/components/ui/button";
import { TransactionBehaviourActions } from "./transaction-behaviour-actions";
type GetColumnsProps = {
  onView: (engagement: TransactionBehaviourEngagement) => void;

  onEdit: (engagement: TransactionBehaviourEngagement) => void;

  onAction: (
    engagement: TransactionBehaviourEngagement,
    action: EngagementAction,
  ) => void;
};
export function getTransactionBehaviourColumns({
  onView,
  onEdit,
  onAction,
}: GetColumnsProps): ColumnDef<
  typeof dataTableFeatures,
  TransactionBehaviourEngagement,
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
          variant="secondary"
          size="sm"
          className="bg-sidebar text-sidebar-foreground hover:bg-sidebar/90"
          onClick={() => onView(row.original)}
        >
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
        <TransactionBehaviourActions
          engagement={row.original}
          onEdit={onEdit}
          onAction={onAction}
        />
      ),
    },
  ];
}
