import { PlayCharacters, Role } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedAdminProcedure } from "~/server/api/trpc";
import kalasangamaError from "~/utils/customError";

export const adminRouter = createTRPCRouter({
	getRegisteredTeams: protectedAdminProcedure
		.query(async ({ ctx }) => {
			try {
				const user = await ctx.db.user.findUnique({
					where: { id: ctx.session.user.id },
				});
				if (user?.role === Role.ADMIN) {
					const teams = await ctx.db.team.findMany({
						select: {
							id: true,
							name: true,
							College: {
								select: {
									name: true,
								},
							},
							isComplete: true,
							Leader: {
								select: {
									name: true,
								},
							},
							TeamMembers: {
								select: {
									id: true,
									name: true,
									idURL: true,
									contact: true,
									isIdVerified: true,
									Character: {
										select: {
											character: true,
										},
									},
								},
							},
							editRequested: true
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
					throw new Error("An error occurred!");
				}
			}
		}),
	verifyId: protectedAdminProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			try {
				const user = await ctx.db.user.findUnique({
					where: { id: ctx.session.user.id },
				});
				if (user?.role === "ADMIN") {
					await ctx.db.teamMembers.update({
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
					throw new Error("An error occurred!");
				}
			}
		}),
	EditAccess: protectedAdminProcedure
		.input(
			z.object({ team: z.string() })
		)
		.mutation(async ({ ctx, input }) => {
			try {
				const user = await ctx.db.user.findUnique({
					where: { id: ctx.session.user.id },
				});
				if (user?.role === "ADMIN") {
					const team = await ctx.db.team.findUnique({
						where: { id: input.team, },
						select: { isComplete: true, },
					});

					await ctx.db.team.update({
						where: {
							id: input.team,
						},
						data: {
							isComplete: !team?.isComplete,
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
					throw new Error("An error occurred!");
				}
			}
		}),
	getScores: protectedAdminProcedure
		.input((z.object({
			teamId:z.string(),
			judgeId:z.string()
		})))
		.query(async({ctx,input})=>{
			const scores = await ctx.db.individualScore.findMany({
				where: {
					teamID: input.teamId,
					judgeId: input.judgeId
				},
				include: {
					criteria: true,
					characterPlayed: true,
					judge: {
						include: {
							TeamScore: {
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
							College: true
						}
					}
				}
			})
			return scores;
		}),
	getJudges:protectedAdminProcedure
		.query(async ({ ctx })=>{
			return await ctx.db.judge.findMany({
				include: {
					User: true
				}
			});
		}),
	getResults:protectedAdminProcedure
		.query(async({ctx})=>{
			const individualScores = await ctx.db.individualScore.findMany({
				include: {
					characterPlayed: true,
					criteria: true,
					team: {
						include:{
							TeamMembers: true
						}
					}
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
			character: z.nativeEnum(PlayCharacters)
		}))
		.query(async ({ctx,input})=>{
			return await ctx.db.teamMembers.findUnique({
				where:{
					teamId_characterId:{
						characterId:input.character,
						teamId: input.teamId
					}
				}
			})
		}),
	getTeamScore:protectedAdminProcedure
		.query(async({ctx})=>{
			const teamScores = await ctx.db.teamScore.findMany({
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
			const teams = await ctx.db.team.findMany({
				include:{
					TeamScore: true,
				}
			});
			return teams;
		}),
	checkIfAllSubmitted: protectedAdminProcedure
		.query(async({ctx})=>{
			const Submitted = await ctx.db.submitted.findMany({
				where: {
					submitted: true
				},
			});
			const teams = await ctx.db.team.findMany();
			const judges = await ctx.db.judge.findMany();
			if(Submitted.length !== (teams.length * judges.length)){
				return "Not submitted"
			}
			return "done";
		})
});
