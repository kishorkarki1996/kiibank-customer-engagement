"use client";

import { Button } from "@/components/ui/button";

type DataTablePaginationProps = {
  pageIndex: number;
  pageCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

export function DataTablePagination({
  pageIndex,
  pageCount,
  canPreviousPage,
  canNextPage,
  onPreviousPage,
  onNextPage,
}: DataTablePaginationProps) {
  return (
    <div className="flex items-center justify-between border-t px-4 py-3">
      <div className="text-sm text-muted-foreground">
        Page {pageIndex + 1} of {pageCount || 1}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPreviousPage}
          disabled={!canPreviousPage}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onNextPage}
          disabled={!canNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
