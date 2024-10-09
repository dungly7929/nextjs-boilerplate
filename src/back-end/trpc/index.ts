import { ticketRouter } from "./router/ticket-router";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  ticket: ticketRouter,
  anyApiRoute: publicProcedure.query(() => {
    return "hello";
  }),
});

export type AppRouter = typeof appRouter;
