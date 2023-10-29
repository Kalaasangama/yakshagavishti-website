import { createTRPCRouter } from "~/server/api/trpc";
import CollegeRouter from "./routers/colleges.router";
import TeamRouter from "./routers/teams.router";
import { adminRouter } from "./routers/admin.router";

export const appRouter = createTRPCRouter({
	admin: adminRouter,
	team: TeamRouter,
	college: CollegeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
