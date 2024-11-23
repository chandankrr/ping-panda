import { addMonths, startOfMonth } from "date-fns";
import { z } from "zod";

import { FREE_QUOTA, PRO_QUOTA } from "@/config";
import prisma from "@/lib/prisma";

import { privateProcedure, router } from "../trpc";

export const projectRoute = router({
  getUsage: privateProcedure.query(async ({ ctx }) => {
    const { user } = ctx;

    const currentDate = startOfMonth(new Date());

    const quota = await prisma.quota.findFirst({
      where: {
        userId: user.id,
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
      },
    });
    const eventCount = quota?.count ?? 0;

    const categoryCount = await prisma.eventCategory.count({
      where: { userId: user.id },
    });

    const limits = user.plan === "PRO" ? PRO_QUOTA : FREE_QUOTA;

    const resetDate = addMonths(currentDate, 1);

    return {
      categoriesUsed: categoryCount,
      categoriesLimit: limits.maxEventCategories,
      eventsUsed: eventCount,
      eventsLimit: limits.maxEventsPerMonth,
      resetDate,
    };
  }),

  setDiscordId: privateProcedure
    .input(z.object({ discordId: z.string().max(20) }))
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      const { discordId } = input;

      await prisma.user.update({
        where: { id: user.id },
        data: { discordId },
      });

      return { success: true };
    }),
});
