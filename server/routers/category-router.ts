import { startOfDay, startOfMonth, startOfWeek } from "date-fns";
import { z } from "zod";

import { FREE_QUOTA, PRO_QUOTA } from "@/config";
import prisma from "@/lib/prisma";
import { parseColor } from "@/lib/utils";
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validators/category-validator";
import { TRPCError } from "@trpc/server";

import { privateProcedure, router } from "../trpc";

export const categoryRouter = router({
  getEventCategories: privateProcedure.query(async ({ ctx }) => {
    const categories = await prisma.eventCategory.findMany({
      where: { userId: ctx.user.id },
      select: {
        id: true,
        name: true,
        emoji: true,
        color: true,
        updatedAt: true,
        createdAt: true,
      },
      orderBy: { updatedAt: "desc" },
    });

    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const now = new Date();
        const firstDayOfMonth = startOfMonth(now);

        const [uniqueFieldCount, eventsCount, lastPing] = await Promise.all([
          prisma.event
            .findMany({
              where: {
                EventCategory: { id: category.id },
                createdAt: { gte: firstDayOfMonth },
              },
              select: { fields: true },
              distinct: [],
            })
            .then((events) => {
              const fieldNames = new Set<string>();
              events.forEach((event) => {
                Object.keys(event.fields as object).forEach((fieldName) => {
                  fieldNames.add(fieldName);
                });
              });

              return fieldNames.size;
            }),
          prisma.event.count({
            where: {
              EventCategory: { id: category.id },
              createdAt: { gte: firstDayOfMonth },
            },
          }),
          prisma.event.findFirst({
            where: {
              EventCategory: { id: category.id },
            },
            orderBy: { createdAt: "desc" },
            select: { createdAt: true },
          }),
        ]);

        return {
          ...category,
          uniqueFieldCount,
          eventsCount,
          lastPing: lastPing?.createdAt || null,
        };
      })
    );

    return { categories: categoriesWithCount };
  }),

  deleteEventCategory: privateProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { name } = input;

      await prisma.eventCategory.delete({
        where: { name_userId: { name, userId: ctx.user.id } },
      });

      return { success: true };
    }),

  createEventCategory: privateProcedure
    .input(
      z.object({
        name: CATEGORY_NAME_VALIDATOR,
        color: z
          .string()
          .min(1, "Color is required.")
          .regex(/^#[0-9A-F]{6}$/i, "Invalid color format."),
        emoji: z.string().emoji("Invalid emoji").optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx;
      const { name, color, emoji } = input;

      const existingCategoriesCount = await prisma.eventCategory.count({
        where: { userId: user.id },
      });

      const maxCategories =
        user.plan === "PRO"
          ? PRO_QUOTA.maxEventCategories
          : FREE_QUOTA.maxEventCategories;

      if (existingCategoriesCount >= maxCategories) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: `${user.plan} plan category limit exceeded. Upgrade to create more categories.`,
        });
      }

      const eventCategory = await prisma.eventCategory.create({
        data: {
          name: name.toLocaleLowerCase(),
          color: parseColor(color),
          emoji: emoji,
          userId: user.id,
        },
      });

      return { eventCategory };
    }),

  insertQuickstartCategories: privateProcedure.mutation(async ({ ctx }) => {
    const categories = prisma.eventCategory.createMany({
      data: [
        { name: "bug", emoji: "🐛", color: 0xff6b6b },
        { name: "sale", emoji: "💰", color: 0xffeb3b },
        { name: "question", emoji: "🤔", color: 0x6c5ce7 },
      ].map((category) => ({
        ...category,
        userId: ctx.user.id,
      })),
    });

    return { success: true, count: (await categories).count };
  }),

  pollCategory: privateProcedure
    .input(z.object({ name: CATEGORY_NAME_VALIDATOR }))
    .query(async ({ input, ctx }) => {
      const { name } = input;

      const category = await prisma.eventCategory.findUnique({
        where: {
          name_userId: { name, userId: ctx.user.id },
        },
        include: {
          _count: {
            select: {
              events: true,
            },
          },
        },
      });

      if (!category) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Category "${name}" not found`,
        });
      }

      const hasEvents = category._count.events > 0;

      return { hasEvents };
    }),

  getEventsByCategoryName: privateProcedure
    .input(
      z.object({
        name: CATEGORY_NAME_VALIDATOR,
        page: z.number(),
        limit: z.number().max(50),
        timeRange: z.enum(["today", "week", "month"]),
      })
    )
    .query(async ({ input, ctx }) => {
      const { name, page, limit, timeRange } = input;

      const now = new Date();
      let startDate: Date;

      switch (timeRange) {
        case "today":
          startDate = startOfDay(now);
          break;
        case "week":
          startDate = startOfWeek(now, { weekStartsOn: 0 });
          break;
        case "month":
          startDate = startOfMonth(now);
          break;
      }

      const [events, eventsCount, uniqueFieldCount] = await Promise.all([
        prisma.event.findMany({
          where: {
            EventCategory: { name, userId: ctx.user.id },
            createdAt: { gte: startDate },
          },
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: "desc" },
        }),
        prisma.event.count({
          where: {
            EventCategory: { name, userId: ctx.user.id },
            createdAt: { gte: startDate },
          },
        }),
        prisma.event
          .findMany({
            where: {
              EventCategory: { name, userId: ctx.user.id },
              createdAt: { gte: startDate },
            },
            select: {
              fields: true,
            },
            distinct: ["fields"],
          })
          .then((events) => {
            const fieldNames = new Set<string>();
            events.forEach((event) => {
              Object.keys(event.fields as object).forEach((fieldName) => {
                fieldNames.add(fieldName);
              });
            });
            return fieldNames.size;
          }),
      ]);

      return { events, eventsCount, uniqueFieldCount };
    }),
});
