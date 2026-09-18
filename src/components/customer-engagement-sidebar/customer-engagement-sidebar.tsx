"use client";

import { Archive, Logs, RotateCcw, Users } from "lucide-react";
import * as React from "react";

import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import { CustomerEngagementNav } from "./customer-engagement-nav";

const data = {
  navMain: [
    // {
    //   title: "Overview",
    //   url: "/customer-engagement/overview",
    //   icon: LayoutDashboard,
    //   isActive: true,
    // },
    {
      title: "Engagements",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "Onboarding & Lifecycle",
          url: "/customer-engagement/engagements/onboarding-lifecycle",
        },
        {
          title: "Transaction Behaviour",
          url: "/customer-engagement/engagements/transaction-behaviour",
        },
        // {
        //   title: "Marketing & Rewards",
        //   url: "/customer-engagement/engagements/marketing-rewards",
        // },
        // {
        //   title: "Exchange Rates",
        //   url: "/customer-engagement/engagements/exchange-rates",
        // },
        // {
        //   title: "Product & What’s New",
        //   url: "/customer-engagement/engagements/product-whats-new",
        // },
        // {
        //   title: "Newsletter & Education",
        //   url: "/customer-engagement/engagements/newsletter-education",
        // },
        // {
        //   title: "Compliance & Account Requirements",
        //   url: "/customer-engagement/engagements/compliance-account-requirements",
        // },
        // {
        //   title: "Service & Operational",
        //   url: "/customer-engagement/engagements/service-operational",
        // },
      ],
    },

    {
      title: "Engagment History",
      url: "/customer-engagement/engagement-history",
      icon: RotateCcw,
    },
    {
      title: "Archived Engagements",
      url: "/customer-engagement/archived-engagements",
      icon: Archive,
    },

    {
      title: "Engagment Audit Logs",
      url: "/customer-engagement/engagement-audit-logs",
      icon: Logs,
    },
  ],
};

export function CustomerEngagementSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <CustomerEngagementNav items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
