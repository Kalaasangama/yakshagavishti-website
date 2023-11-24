import { Characters } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedAdminProcedure, protectedProcedure } from "~/server/api/trpc";
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
						college: {
							select: {
								name: true,
							},
						},
						isComplete: true,
						leader: {
							select: {
								name: true,
								contact: true,
								characterPlayed: {
									select: {
										character: true,
									},
								},
							},
						},
						members: {
							select: {
								id: true,
								name: true,
								idURL: true,
								isIdVerified: true,
								characterPlayed: {
									select: {
										character: true,
									},
								},
							},
						},
						editRequests: {
							select: {
								id: true,
								status: true,
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
	EditAccess: protectedProcedure
		.input(
			z.object({
				team: z.string(),
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
								id: input.team,
							},
							data: {
								isComplete: false,
								editRequests: {
									update: {
										status: "GRANTED",
									},
								},
							},
						});
					} else {
						await ctx.prisma.team.update({
							where: {
								id: input.team,
							},
							data: {
								isComplete: true,
								editRequests: {
									update: {
										status: "REVOKED",
									},
								},
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
		getScores: protectedAdminProcedure
            .input((z.object({
                teamId:z.string(),
				judgeId:z.string()
            })))
            .query(async({ctx,input})=>{
                const scores = await ctx.prisma.individualScore.findMany({
                    where: {
                        teamID: input.teamId,
                        judgeId: input.judgeId
                    },
                    include: {
                        criteria: true,
                        characterPlayed: true,
                        judge: {
                            include: {
                                teamScore: {
                                    where: {
                                        teamID: input.teamId,
										judgeId: input.judgeId
                                    },
                                    include: {
                                        criteria: true,
                                    }
                                },
                                Submitted: {
                                    where: {
                                        teamID: input.teamId,
										judgeId: input.judgeId
                                    }
                                }
                            }
                        },
                        team: {
                            include: {
                                college: true
                            }
                        }
                    }
                })
                return scores;
            }),
			getJudges:protectedAdminProcedure
			.input(z.object({
				teamId:z.string(),
			})).
			query(async({ctx})=>{
				return await ctx.prisma.judge.findMany({
					include: {
						user: true
					}
				});
			}),
			getResults:protectedAdminProcedure
			.query(async({ctx})=>{
				const Submitted = await ctx.prisma.submitted.findMany({
					where: {
						submitted: true
					},
				});
				const teams = await ctx.prisma.team.findMany();
				const judges = await ctx.prisma.judge.findMany();
				if(Submitted.length !== (teams.length * judges.length)){
					return "Not submitted"
				}
				const individualScores = await ctx.prisma.individualScore.findMany({
					include: {
						characterPlayed: true,
						criteria: true,
						team: true
					},
					orderBy: [
						{
							characterId: "asc"
						},
						{
							teamID: "asc"
						},
						{
							criteriaId: "asc"
						}
					]
				})
				return individualScores;
			}),
			getName:protectedAdminProcedure
			.input(z.object({
				teamId: z.string(),
				character: z.nativeEnum(Characters)
			}))
			.query(async ({ctx,input})=>{
				return await ctx.prisma.user.findUnique({
					where:{
						characterId_teamId:{
							characterId:input.character,
							teamId: input.teamId
						}
					}
				})
			}),
			getTeamScore:protectedAdminProcedure
			.query(async({ctx})=>{
				const Submitted = await ctx.prisma.submitted.findMany({
					where: {
						submitted: true
					},
				});
				const teams = await ctx.prisma.team.findMany();
				const judges = await ctx.prisma.judge.findMany();
				if(Submitted.length !== (teams.length * judges.length)){
					return "Not submitted"
				}
				const teamScores = await ctx.prisma.teamScore.findMany({
					include: {
						criteria: true,
						team: true
					},
					orderBy: [
						{
							teamID: "asc"
						},
						{
							criteriaId: "asc"
						}
					]
				})
				return teamScores;
			}),
			getTeams: protectedAdminProcedure
			.query(async({ctx})=>{
				const teams = await ctx.prisma.team.findMany({
                    include:{
                        teamScore: true,
                        TeamNumber: true
                    }
                });
                return teams;
			})
});
