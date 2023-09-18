import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const CollegeRouter = createTRPCRouter({
	register: publicProcedure
		.input(z.object({ name: z.string() }))
		.mutation(async ({ ctx, input }) => {
			await ctx.prisma.college.create({
				data: {
					name: input.name,
				},
			});
		}),
	getAllUser: publicProcedure.input(z.string()).query(async function(){
		return "hello"
	})
});

export default CollegeRouter;
