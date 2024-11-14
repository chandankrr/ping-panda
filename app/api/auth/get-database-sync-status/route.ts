import { currentUser } from "@clerk/nextjs/server";

import prisma from "../../../../lib/prisma";

export const GET = async () => {
  const auth = await currentUser();

  if (!auth) {
    return new Response(JSON.stringify({ isSynced: false }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const user = await prisma.user.findFirst({
    where: { externalId: auth.id },
  });

  if (!user) {
    await prisma.user.create({
      data: {
        quotaLimit: 100,
        email: auth.emailAddresses[0].emailAddress,
        externalId: auth.id,
      },
    });

    return new Response(JSON.stringify({ isSynced: true }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify({ isSynced: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
