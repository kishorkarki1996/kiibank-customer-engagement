import { CreateCustomerEngagementHeader } from "@/components/customer-engagement/create-customer-engagement-header";
import { CustomerEngagementHeader } from "@/components/customer-engagement/customer-engagement-header";
import { CustomerEngagementSidebar } from "@/components/customer-engagement/customer-engagement-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import type { ReactNode } from "react";

export default function CustomerEngagementLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <div className="flex min-h-svh w-full flex-col">
        <CreateCustomerEngagementHeader />
        <div className="flex min-h-0 flex-1 mx-auto">
          <div className="min-h-full p-4 md:p-6 lg:p-7">{children}</div>
        </div>
      </div>
    </div>
  );
}
