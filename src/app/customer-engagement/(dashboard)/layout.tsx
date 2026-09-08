import { CustomerEngagementHeader } from "@/components/customer-engagement/customer-engagement-header";
import { CustomerEngagementSidebar } from "@/components/customer-engagement/customer-engagement-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { ReactNode } from "react";

export default function CustomerEngagementLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <SidebarProvider>
        <div className="flex min-h-svh w-full flex-col">
          <CustomerEngagementHeader />
          <div className="flex min-h-0 flex-1">
            <CustomerEngagementSidebar />
            <SidebarInset>
              <div className="min-h-full p-4 md:p-6 lg:p-7">{children}</div>
            </SidebarInset>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
