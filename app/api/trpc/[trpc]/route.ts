import { appRouter } from "@/server";
import {
  FetchCreateContextFnOptions,
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch";

import type { Context } from "@/server/trpc";

const handler = async (req: Request) => {
  return await fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    req,
    createContext: (opts: FetchCreateContextFnOptions): Context => {
      return {
        headers: opts.req.headers,
      };
    },
  });
};

export { handler as GET, handler as POST };
