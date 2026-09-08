"use client";

import { createContext, useContext, useMemo, useState, type CSSProperties, type ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type SidebarContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used inside SidebarProvider");
  return context;
}

export function SidebarProvider({
  defaultOpen = true,
  className,
  children,
}: ComponentProps<"div"> & { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [openMobile, setOpenMobile] = useState(false);

  const value = useMemo(
    () => ({
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      toggleSidebar: () => {
        if (window.matchMedia("(max-width: 767px)").matches) {
          setOpenMobile((value) => !value);
        } else {
          setOpen((value) => !value);
        }
      },
    }),
    [open, openMobile],
  );

  return (
    <SidebarContext.Provider value={value}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": "14rem",
            "--sidebar-width-icon": "4rem",
          } as CSSProperties
        }
        className={cn("flex min-h-0 w-full flex-1", className)}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

export function Sidebar({
  className,
  children,
  collapsible = "icon",
  ...props
}: ComponentProps<"aside"> & { collapsible?: "offcanvas" | "icon" | "none" }) {
  const { open, openMobile, setOpenMobile } = useSidebar();
  const desktopWidth = collapsible === "none" || open ? "md:w-[var(--sidebar-width)]" : "md:w-[var(--sidebar-width-icon)]";

  return (
    <>
      {openMobile && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-x-0 bottom-0 top-12 z-40 bg-black/30 md:hidden"
          onClick={() => setOpenMobile(false)}
        />
      )}
      <aside
        data-slot="sidebar"
        data-state={open ? "expanded" : "collapsed"}
        className={cn(
          "fixed bottom-0 left-0 top-12 z-50 flex w-[var(--sidebar-width)] flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[transform,width] duration-200 ease-linear md:relative md:inset-auto md:top-auto md:z-auto md:translate-x-0",
          openMobile ? "translate-x-0" : "-translate-x-full",
          desktopWidth,
          className,
        )}
        {...props}
      >
        {children}
      </aside>
    </>
  );
}

export function SidebarContent({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="sidebar-content" className={cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto p-2", className)} {...props} />;
}

export function SidebarGroup({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="sidebar-group" className={cn("flex w-full min-w-0 flex-col px-1 py-2", className)} {...props} />;
}

export function SidebarGroupLabel({ className, ...props }: ComponentProps<"div">) {
  const { open } = useSidebar();
  if (!open) return null;
  return <div data-slot="sidebar-group-label" className={cn("px-2 pb-2 text-xs font-medium text-sidebar-foreground/60", className)} {...props} />;
}

export function SidebarGroupContent({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="sidebar-group-content" className={cn("w-full", className)} {...props} />;
}

export function SidebarMenu({ className, ...props }: ComponentProps<"ul">) {
  return <ul data-slot="sidebar-menu" className={cn("flex w-full min-w-0 flex-col gap-1", className)} {...props} />;
}

export function SidebarMenuItem({ className, ...props }: ComponentProps<"li">) {
  return <li data-slot="sidebar-menu-item" className={cn("group/menu-item relative", className)} {...props} />;
}

export function SidebarMenuButton({
  className,
  isActive = false,
  asChild = false,
  children,
  ...props
}: ComponentProps<"button"> & { isActive?: boolean; asChild?: boolean }) {
  const { open } = useSidebar();
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="sidebar-menu-button"
      data-active={isActive}
      className={cn(
        "flex h-9 w-full items-center gap-3 overflow-hidden rounded-md px-2.5 text-sm font-medium text-sidebar-foreground/85 outline-none transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring data-[active=true]:bg-sidebar-accent data-[active=true]:text-white data-[active=true]:shadow-sm",
        !open && "md:justify-center md:px-0 [&_span]:md:hidden",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function SidebarInset({ className, ...props }: ComponentProps<"main">) {
  return <main data-slot="sidebar-inset" className={cn("min-w-0 flex-1 overflow-auto bg-background", className)} {...props} />;
}

export function SidebarTrigger({ className, ...props }: ComponentProps<typeof Button>) {
  const { toggleSidebar, openMobile } = useSidebar();
  return (
    <Button
      data-slot="sidebar-trigger"
      variant="ghost"
      size="sm"
      className={cn("h-8 w-8 p-0", className)}
      onClick={toggleSidebar}
      aria-label="Toggle sidebar"
      {...props}
    >
      {openMobile ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
    </Button>
  );
}
