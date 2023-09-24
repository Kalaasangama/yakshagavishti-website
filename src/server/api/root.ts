import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import CollegeRouter from "./routers/colleges.router";
import TeamRouter from "./routers/teams.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
	team: TeamRouter,
	college: CollegeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
