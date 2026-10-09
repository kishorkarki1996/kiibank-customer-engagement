"use client";

import { tableFeatures, type ColumnDef } from "@tanstack/react-table";

import type { EngagementHistory } from "./engagement-history.types";
import { dataTableFeatures } from "@/app/customer-engagement/components/data-table/data-table.features";
import { EngagementAction } from "@/app/customer-engagement/components/engagement.type";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
type GetColumnsProps = {
  onView: (engagement: EngagementHistory) => void;

  onEdit: (engagement: EngagementHistory) => void;

  onAction: (engagement: EngagementHistory, action: EngagementAction) => void;
};
export function getEngagementHistoryColumns({
  onView,
}: GetColumnsProps): ColumnDef<
  typeof dataTableFeatures,
  EngagementHistory,
  unknown
>[] {
  return [
    {
      id: "sn",
      header: "SN.",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "dateTime",
      header: "Date & Time",
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
      accessorKey: "channel",
      header: "Channel",
    },
    {
      accessorKey: "deliveryResult",
      header: "Delivery Result",
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
