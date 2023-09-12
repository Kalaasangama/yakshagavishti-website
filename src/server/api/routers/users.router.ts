import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { hashPassword } from "~/utils/passwords";
import { env } from "~/env.mjs";
import Team from "~/utils/teams.services";

export const UserRouter = createTRPCRouter({
	register: publicProcedure
		.input(
			z.object({
				name: z.string(),
				email: z.string(),
				password: z.string(),
				collegeId: z.string(),
				phoneNumber: z.string(),
				isLead: z.boolean(),
				team: z.object({
					teamName: z.string(),
					members: z.array(
						z.object({
							name: z.string(),
							email: z.string(),
							password: z.string(),
							collegeId: z.string(),
							phoneNumber: z.string(),
							isLead: z.boolean(),
						})
					),
				}),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const user = await ctx.prisma.user.findUnique({
				where: { email: input.email },
			});
			if (user) {
				return "User already exists!";
			}
			try {
				await ctx.prisma.user.create({
					data: {
						email: input.email,
						name: input.name,
						password: await hashPassword(input.password),
						isLead: true,
						phoneNumber: input.phoneNumber,
						RefreshTokens: {
							create: {
								hashedToken: jwt.sign(
									{ email: input.email },
									env.NEXTAUTH_SECRET
								),
							},
						},
					},
				});

				const team = new Team(input.team.teamName, input.team.members);
				try {
					if (!(await team.isTeamExists())) {
						await team.createTeam();
						await team.addMembers();
					}
				} catch (error) {
					console.log(error);
					return "Error";
				}
			} catch (error) {
				console.log(error);
				return "An error occurred!!";
			}
		}),
});
