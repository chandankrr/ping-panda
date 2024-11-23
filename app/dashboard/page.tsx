import { PlusIcon } from "lucide-react";
import { redirect } from "next/navigation";

import { CreateEventCategoryModal } from "@/components/create-event-category-modal";
import { DashboardPage } from "@/components/dashbaord-page";
import { PaymentSuccessModal } from "@/components/payment-success-modal";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { createCheckoutSession } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";

import { DashboardPageContent } from "./dashboard-page-content";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const auth = await currentUser();

  if (!auth) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { externalId: auth.id },
  });

  if (!user) {
    return redirect("/welcome");
  }

  const params = await searchParams;
  const intent = params.intent;

  if (intent === "upgrade") {
    const session = await createCheckoutSession({
      userEmail: user.email,
      userId: user.id,
    });

    if (session.url) redirect(session.url);
  }

  const success = params.success;

  return (
    <>
      {success ? <PaymentSuccessModal /> : null}
      <DashboardPage
        cta={
          <CreateEventCategoryModal>
            <Button className="w-full sm:w-fit">
              <PlusIcon className="size-4 mr-2" />
              Add Category
            </Button>
          </CreateEventCategoryModal>
        }
        title="Dashboard"
      >
        <DashboardPageContent />
      </DashboardPage>
    </>
  );
}
