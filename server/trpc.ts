import type { User } from "@prisma/client";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { initTRPC, TRPCError } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export interface Context {
  user?: User;
  headers: Headers;
}

export const createContext = async (
  opts: FetchCreateContextFnOptions
): Promise<Context> => {
  return {
    headers: opts.req.headers,
  };
};

const t = initTRPC.context<typeof createContext>().create({});

const authMiddleware = t.middleware(async ({ ctx, next }) => {
  const authHeader = ctx.headers.get("Authorization");

  if (authHeader) {
    const apiKey = authHeader.split(" ")[1];

    const user = await prisma?.user.findUnique({
      where: { apiKey },
    });

    if (user) {
      return next({ ctx: { user } });
    }
  }

  const auth = await currentUser();

  if (!auth) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized",
    });
  }

  const user = await prisma.user.findUnique({
    where: { externalId: auth.id },
  });

  if (!user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized",
    });
  }

  return next({
    ctx: {
      user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(authMiddleware);
