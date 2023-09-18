import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { hashPassword } from "~/utils/passwords";
import { env } from "~/env.mjs";
import Team from "~/utils/teams.services";
import Tokens from "~/utils/tokenHandler";

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
								hashedToken: Tokens.generateRefreshToken({
									email: input.email,
								}),
							},
						},
					},
				});

				/*Todo:
					Create verification link with verification token
					Send this link via email 
				*/
			} catch (error) {
				console.log(error);
				return "An error occurred!!";
			}
		}),
});
