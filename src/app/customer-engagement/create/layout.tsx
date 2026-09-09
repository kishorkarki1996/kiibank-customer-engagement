import { CreateCustomerEngagementHeader } from "@/components/customer-engagement/create-customer-engagement-header";
import type { ReactNode } from "react";

export default function CustomerEngagementLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <div className="flex min-h-svh w-full flex-col">
        <CreateCustomerEngagementHeader />
        <div className="flex min-h-0 flex-1">
          <div className="min-h-full p-4 md:p-6 lg:p-7 flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
