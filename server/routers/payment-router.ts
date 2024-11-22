import { createCheckoutSession } from "@/lib/stripe";

import { privateProcedure, router } from "../trpc";

export const paymentRouter = router({
  createCheckoutSession: privateProcedure.mutation(async ({ ctx }) => {
    const { user } = ctx;

    const session = await createCheckoutSession({
      userEmail: user.email,
      userId: user.id,
    });

    return { url: session.url };
  }),
});
