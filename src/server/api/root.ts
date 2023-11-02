import { createTRPCRouter } from "~/server/api/trpc";
import TeamRouter from "./routers/teams.router";
import { adminRouter } from "./routers/admin.router";

export const appRouter = createTRPCRouter({
	admin: adminRouter,
	team: TeamRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
