"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText, LayoutDashboard, Megaphone, Settings, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { href: "/customer-engagement", label: "Overview", icon: LayoutDashboard },
  { href: "/customer-engagement/engagements", label: "Engagements", icon: Megaphone },
  { href: "#", label: "Templates", icon: FileText },
  { href: "#", label: "Audience", icon: Users },
  { href: "#", label: "Reports", icon: BarChart3 },
];

export function CustomerEngagementSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Customer Engagement</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(({ href, label, icon: Icon }) => {
                const active = href !== "#" && (pathname === href || (href !== "/customer-engagement" && pathname.startsWith(`${href}/`)));
                return (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton asChild isActive={active} title={label}>
                      <Link href={href}>
                        <Icon className="size-4 shrink-0" />
                        <span>{label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton title="Settings">
                  <Settings className="size-4 shrink-0" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
