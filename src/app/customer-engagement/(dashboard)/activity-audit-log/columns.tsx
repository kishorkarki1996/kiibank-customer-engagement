"use client";

import { type ColumnDef } from "@tanstack/react-table";

import type { ActivityAuditLog } from "./activity-audit-log.types";
import { dataTableFeatures } from "@/app/customer-engagement/components/data-table/data-table.features";
import { EngagementAction } from "@/app/customer-engagement/components/engagement.type";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
type GetColumnsProps = {
  onView: (engagement: ActivityAuditLog) => void;

  onEdit: (engagement: ActivityAuditLog) => void;

  onAction: (engagement: ActivityAuditLog, action: EngagementAction) => void;
};
export function getEngagementHistoryColumns({
  onView,
}: GetColumnsProps): ColumnDef<
  typeof dataTableFeatures,
  ActivityAuditLog,
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
      accessorKey: "engagementName",
      header: "Engagement Name",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "user",
      header: "User",
    },
    {
      accessorKey: "dateTime",
      header: "Date & Time",
    },
    {
      accessorKey: "action",
      header: "Action",
    },
    {
      accessorKey: "previousValue",
      header: "Previous Value",
    },
    {
      accessorKey: "newValue",
      header: "New Value",
    },
    // {
    //   id: "summary",
    //   header: "View Summary",
    //   cell: ({ row }) => (
    //     <Button
    //       variant="ghost"
    //       size="sm"
    //       className="gap-2"
    //       onClick={() => onView(row.original)}
    //     >
    //       <Eye className="size-4" />
    //       View
    //     </Button>
    //   ),
    // },
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
