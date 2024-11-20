"use client";

import type { EventCategory } from "@prisma/client";
import { trpc } from "@/server/client";

import { EmptyCategoryState } from "./empty-category-state";

interface CategoryPageContentProps {
  hasEvents: boolean;
  category: EventCategory;
}

export const CategoryPageContent = ({
  hasEvents: initialHasEvents,
  category,
}: CategoryPageContentProps) => {
  const { data: pollingData } = trpc.category.pollCategory.useQuery(
    { name: category.name },
    {
      initialData: { hasEvents: initialHasEvents },
    }
  );

  if (!pollingData.hasEvents) {
    return <EmptyCategoryState categoryName={category.name} />;
  }
};
