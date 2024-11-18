import { createTRPCReact } from "@trpc/react-query";
import { inferRouterOutputs } from "@trpc/server";

import { AppRouter } from "./";

export const trpc = createTRPCReact<AppRouter>({});
export type RouterOutputs = inferRouterOutputs<AppRouter>;
