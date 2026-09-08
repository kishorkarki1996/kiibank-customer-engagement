import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KiiBank Engagement",
  description: "Customer Engagement Administration",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <TooltipProvider>
        <body className={`${inter.variable} font-sans antialiased`}>
          {children}
        </body>
      </TooltipProvider>
    </html>
  );
}
