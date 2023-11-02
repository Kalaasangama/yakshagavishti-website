import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import kalasangamaError from "~/utils/customError";

export const adminRouter = createTRPCRouter({
	getRegisteredTeams: protectedProcedure.query(async ({ ctx }) => {
		try {
			const user = await ctx.prisma.user.findUnique({
				where: { id: ctx.session.user.id },
			});
			if (user?.role === "ADMIN") {
				const teams = await ctx.prisma.team.findMany({
					select: {
						id: true,
						name: true,
						members: {
							select: {
								id: true,
								name: true,
								idURL: true,
								isIdVerified:true
							},
						},
					},
				});
				return teams;
			} else {
				throw new kalasangamaError(
					"Permission error",
					"You do not have permissions to view this resource"
				);
			}
		} catch (error) {
			if (error instanceof kalasangamaError) {
				throw new TRPCError({
					message: error.message,
					code: "BAD_REQUEST",
				});
			} else {
				console.log(error);
				throw "An error occurred!";
			}
		}
	}),
	verifyId: protectedProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			try {
				const user = await ctx.prisma.user.findUnique({
					where: { id: ctx.session.user.id },
				});
				if (user?.role === "ADMIN") {
					await ctx.prisma.user.update({
						where: {
							id: input.userId,
						},
						data: {
							isIdVerified: true,
						},
					});
					return { message: "success" };
				} else {
					throw new kalasangamaError(
						"Permission error",
						"You do not have permissions to view this resource"
					);
				}
			} catch (error) {
				if (error instanceof kalasangamaError) {
					throw new TRPCError({
						message: error.message,
						code: "BAD_REQUEST",
					});
				} else {
					console.log(error);
					throw "An error occurred!";
				}
			}
		}),
	grantEditAccess: protectedProcedure
		.input(
			z.object({
				teamName: z.string(),
				action: z.enum(["Grant", "Revoke"]),
			})
		)
		.mutation(async ({ ctx, input }) => {
			try {
				const user = await ctx.prisma.user.findUnique({
					where: { id: ctx.session.user.id },
				});
				if (user?.role === "ADMIN") {
					if (input.action === "Grant") {
						await ctx.prisma.team.update({
							where: {
								name: input.teamName,
							},
							data: {
								isComplete: false,
							},
						});
					} else {
						await ctx.prisma.team.update({
							where: {
								name: input.teamName,
							},
							data: {
								isComplete: true,
							},
						});
					}
					return { message: "success" };
				} else {
					throw new kalasangamaError(
						"Permission error",
						"You do not have permissions to view this resource"
					);
				}
			} catch (error) {
				if (error instanceof kalasangamaError) {
					throw new TRPCError({
						message: error.message,
						code: "BAD_REQUEST",
					});
				} else {
					console.log(error);
					throw "An error occurred!";
				}
			}
		}),
});