import { currentUser } from "@clerk/nextjs/server";

import prisma from "../../lib/prisma";
import { procedure, router } from "../trpc";

export const authRouter = router({
  getDatabaseSyncStatus: procedure.query(async () => {
    const auth = await currentUser();

    if (!auth) {
      return {
        isSynced: false,
        status: 401,
      };
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

      return {
        isSynced: true,
        status: 201,
      };
    }

    return {
      isSynced: true,
      status: 200,
    };
  }),
});
