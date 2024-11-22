import { authRouter } from "./routers/auth-router";
import { categoryRouter } from "./routers/category-router";
import { paymentRouter } from "./routers/payment-router";
import { projectRoute } from "./routers/project-router";
import { router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  category: categoryRouter,
  payment: paymentRouter,
  project: projectRoute,
});

export type AppRouter = typeof appRouter;
