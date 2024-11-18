import "./globals.css";

import { EB_Garamond, Inter } from "next/font/google";

import Provider from "@/components/provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";

import type { Metadata } from "next";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Ping Panda",
  description: "A Saas Application for event monitoring",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            inter.variable,
            eb_garamond.variable,
            "min-h-[calc(100vh-1px)] flex flex-col font-sans bg-brand-50 text-brand-950 antialiased"
          )}
        >
          <main className="relative flex-1 flex flex-col">
            <Toaster />
            <Provider>{children}</Provider>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
