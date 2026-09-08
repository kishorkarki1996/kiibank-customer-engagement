# KiiBank Customer Engagement

Runnable Next.js customer engagement admin UI generated from the supplied KiiBank engagement requirements.

## Stack

- Next.js 15 / React 19
- Tailwind CSS 4.3.3
- shadcn CLI 4.21.0 conventions
- Shadcn-style Sidebar composition
- Inter via `next/font/google`
- Lucide icons

## Primary color

`#029EFF`

## Layout structure

- `src/app/layout.tsx` is intentionally global-only and renders `{children}` with Inter. It contains no sidebar.
- `src/app/customer-engagement/layout.tsx` owns the Customer Engagement shell.
- The module shell uses `SidebarProvider`, `Sidebar`, `SidebarContent`, `SidebarMenu`, `SidebarMenuButton`, `SidebarInset`, and `SidebarTrigger` from `src/components/ui/sidebar.tsx`.
- Header spans the full viewport width, matching the supplied reference layout; the sidebar begins below it.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000. The root route redirects to `/customer-engagement`.
