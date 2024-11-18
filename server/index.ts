import { authRouter } from "./routers/auth-router";
import { categoryRouter } from "./routers/category-router";
import { router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  category: categoryRouter,
});

export type AppRouter = typeof appRouter;
