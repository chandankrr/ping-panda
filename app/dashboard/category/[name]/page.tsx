import { notFound } from "next/navigation";

import { DashboardPage } from "@/components/dashbaord-page";
import prisma from "@/lib/prisma";
import { capitalize } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";

import { CategoryPageContent } from "./category-page-content";

interface PageProps {
  params: {
    name: string | string[] | undefined;
  };
}

export default async function Page({ params }: PageProps) {
  const { name } = await params;

  if (typeof name !== "string") return notFound();

  const auth = await currentUser();

  if (!auth) return notFound();

  const user = await prisma.user.findUnique({
    where: { externalId: auth.id },
  });

  if (!user) return notFound();

  const category = await prisma.eventCategory.findUnique({
    where: {
      name_userId: {
        name,
        userId: user.id,
      },
    },
    include: {
      _count: {
        select: {
          events: true,
        },
      },
    },
  });

  if (!category) return notFound();

  const hasEvents = category._count.events > 0;

  return (
    <DashboardPage
      title={capitalize(
        `${category.emoji} ${capitalize(category.name)} Events`
      )}
    >
      <CategoryPageContent hasEvents={hasEvents} category={category} />
    </DashboardPage>
  );
}
