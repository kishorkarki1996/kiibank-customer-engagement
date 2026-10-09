import { EngagementHistoryTable } from "./engagement-history-table";

export default function EngagementHistoryPage() {
  return (
    <div className="min-w-0 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
            Engagement History
          </h1>
        </div>
        {/* <Button asChild>
          <Link href="/customer-engagement/create/onboarding-and-lifecycle">
            <Plus className="mr-2 size-4" />
            Create engagement
          </Link>
        </Button> */}
      </div>

      <div className="min-w-0">
        <EngagementHistoryTable />
      </div>
    </div>
  );
}
