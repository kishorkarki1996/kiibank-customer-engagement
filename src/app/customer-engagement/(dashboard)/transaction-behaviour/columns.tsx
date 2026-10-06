"use client";

import { tableFeatures, type ColumnDef } from "@tanstack/react-table";

import type { TransactionBehaviourEngagement } from "./transaction-behaviour.types";
import { dataTableFeatures } from "@/app/customer-engagement/components/data-table/data-table.features";
import { EngagementStatusBadge } from "@/app/customer-engagement/components/engagement-status-badge";
import { EngagementPriorityBadge } from "@/app/customer-engagement/components/engagement-priority-badge";
import { EngagementAction } from "@/app/customer-engagement/components/engagement.type";
import { Button } from "@/components/ui/button";
import { TransactionBehaviourActions } from "./transaction-behaviour-actions";
import { Eye } from "lucide-react";
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
        <TransactionBehaviourActions
          engagement={row.original}
          onEdit={onEdit}
          onAction={onAction}
        />
      ),
    },
  ];
}
