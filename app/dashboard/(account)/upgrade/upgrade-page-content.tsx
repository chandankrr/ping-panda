"use client";

import { format } from "date-fns";
import { BarChart } from "lucide-react";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { trpc } from "@/server/client";
import { Plan } from "@prisma/client";

export const UpgradePageContent = ({ plan }: { plan: Plan }) => {
  const router = useRouter();

  const { mutate: createCheckoutSession } =
    trpc.payment.createCheckoutSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) {
          router.push(url);
        }
      },
    });

  const { data: usageData } = trpc.project.getUsage.useQuery();

  return (
    <div className="max-w-3xl flex flex-col gap-8">
      <div>
        <h1 className="mt-2 text-xl/8 font-medium tracking-tight text-gray-900">
          {plan === "PRO" ? "Plan: Pro" : "Plan: Free"}
        </h1>
        <p className="text-sm/6 text-gray-600 max-w-prose">
          {plan === "PRO"
            ? "Thank you for supporting PingPanda. Find your increased limits below."
            : "Get access to more events, categories and premium support."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-2 border-brand-700">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm/6 font-medium">Total Events</p>
            <BarChart className="size-4 text-muted-foreground" />
          </div>

          <div>
            <p className="text-2xl font-bold">
              {usageData?.eventsUsed || 0} of{" "}
              {usageData?.eventsLimit.toLocaleString() || 100}
            </p>
            <p className="text-xs/5 text-muted-foreground">
              Events this period
            </p>
          </div>
        </Card>
        <Card>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm/6 font-medium">Event Categories</p>
            <BarChart className="size-4 text-muted-foreground" />
          </div>

          <div>
            <p className="text-2xl font-bold">
              {usageData?.categoriesUsed || 0} of{" "}
              {usageData?.categoriesLimit.toLocaleString() || 10}
            </p>
            <p className="text-xs/5 text-muted-foreground">Active categories</p>
          </div>
        </Card>
      </div>

      <p className="text-sm text-gray-500">
        Usage will reset on{" "}
        {usageData?.resetDate ? (
          format(usageData.resetDate, "MMM d, yyyy")
        ) : (
          <span className="animate-pulse w-8 h-4 bg-gray-200"></span>
        )}
        {plan !== "PRO" ? (
          <span className="inline" onClick={() => createCheckoutSession()}>
            {" "}
            or{" "}
            <span className="underline text-brand-600 cursor-pointer">
              upgrade now to increase your limit &rarr;
            </span>
          </span>
        ) : null}
      </p>
    </div>
  );
};
