import { redirect } from "next/navigation";

import { DashboardPage } from "@/components/dashbaord-page";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

import { ApiKeySettings } from "./api-key-settings";

export default async function Page() {
  const auth = await currentUser();

  if (!auth) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { externalId: auth.id },
  });

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <DashboardPage title="API Key">
      <ApiKeySettings apiKey={user.apiKey ?? ""} />
    </DashboardPage>
  );
}
