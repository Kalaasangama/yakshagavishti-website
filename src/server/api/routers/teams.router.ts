import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import jwt from "jsonwebtoken";

export const UserRouter = createTRPCRouter({
	register: publicProcedure
		.input(
			z.object({
				teamName: z.string(),
				teamSize: z.string(),
				members: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const user = await ctx.prisma.team.findUnique({
				where: { name:input.teamName },
			});
			if () {
				return "Team already exists!";
			}
			try {
				await ctx.prisma.team.create({
					data:{
						name:input.teamName,
						members:{
							connectOrCreate:{
								create:{
									name: 
								}
							}
						}
					}
				})
			} catch (error) {
				console.log(error);
				return "An error occurred!!";
			}
		}),
}
