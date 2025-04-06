import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import kalasangamaError from "~/utils/customError";
import { getCollegeById } from "~/utils/helpers";

export const TeamRouter = createTRPCRouter({
	getColleges: protectedProcedure
		.query(async ({ ctx }) => {
			try {
				const colleges = await ctx.db.college.findMany({
					select: {
						id: true,
						name: true
					}
				});
				return colleges;
			} catch (error) {
				console.log(error);
				throw new Error("An error occurred!");
			}
		}),
	getCharacters: protectedProcedure
		.input(z.object({ edit: z.boolean().optional() }))
		.query(async ({ ctx, input }) => {
			try {
				const userId = ctx.session.user.id;

				if (input.edit) {
					const allCharacters = await ctx.db.character.findMany({
					  select: {
						id: true,
						character: true,
					  },
					});
					return allCharacters;
				}
			
				// Step 1: Get the team the user is part of (either as leader or team member)
				const team = await ctx.db.team.findFirst({
					where: {
						leaderId: userId
					},
					include: {
						TeamMembers: {
							select: { characterId: true },
						},
					},
				});
			
				const takenCharacterIds = team?.TeamMembers
				  .map((m) => m.characterId)
				  .filter((id): id is string => !!id) ?? [];
			
				// Step 2: Get all characters not taken
				const characters = await ctx.db.character.findMany({
					where: {
						id: {
							notIn: takenCharacterIds,
						},
					},
					select: {
						id: true,
						character: true
					}
				});
			
				return characters;
			  } catch (error) {
				console.error(error);
				throw new Error("An error occurred while fetching characters.");
			  }
		}),
	checkPassword: protectedProcedure
		.input(
			z.object({
				password: z.string(),
				college_id: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			try {
				const college = await ctx.db.college.findUnique({
					where: { id: input.college_id },
				});
				if (college) {
					console.log(input.password, college.password);
					if (input.password === college.password) {
						return {
							message: "Let's Proceed",
						};
					} else {
						throw new kalasangamaError(
							"Create Team Error",
							"Team password is incorrect."
						);
					}
				}
			} catch (error) {
				if (error instanceof kalasangamaError) {
					throw new TRPCError({
						message: error.message,
						code: "CONFLICT",
					});
				} else {
					console.log(error);
					throw new Error("An error occurred!");
				}
			}
		}),
	register: protectedProcedure
		.input(
			z.object({
				college_id: z.string().nullish(),
				leader_character: z.string().nullish(),
				leader_idUrl: z.string().nullish(),
				leader_contact: z.string().nullish(),
				leader_name: z.string().nullish(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			try {
				const team = await ctx.db.team.update({
					where: { college_id: input.college_id ?? undefined },
					data: {
						Leader: { connect: { id: ctx.session.user.id } }
					}
				})
				
				if (team?.isComplete) {
					throw new kalasangamaError(
						"Create Team Error",
						"Team is already complete"
					);
				}
				
				await ctx.db.teamMembers.create({
					data: {
						teamId: team?.id ?? "",
						characterId: input.leader_character ?? "",
						idURL: input.leader_idUrl ?? "",
						name: input.leader_name ?? "",
						contact: input.leader_contact ?? "",
					},
				})
				
				return { message: "Team created successfully" };
			} catch (error) {
				if (error instanceof kalasangamaError) {
					throw new TRPCError({
						message: error.message,
						code: "CONFLICT",
					});
				} else {
					console.log(error);
					throw new Error("An error occurred!");
				}
			}
		}),
	updateTeam: protectedProcedure
		.input(
			z.object({
				edit: z.boolean().optional(),
				members: z.array(
					z.object({
						name: z.string(),
						characterId: z.string(),
						idURL: z.string(),
					})
				)
			})
		)
		.mutation(async ({ ctx, input }) => {
			try {
				if (!ctx.session.user.LeaderOf)
					throw new kalasangamaError(
						"Add Members Error",
						"Only leaders can add members"
					);

				if (input.edit) {
					await Promise.all(
						input.members.map(async (member) => {
							await ctx.db.teamMembers.update({
								where: {
									teamId_characterId: {
										teamId: ctx.session.user.LeaderOf?.id ?? "",
										characterId: member.characterId,
									}
								},
								data: {
									name: member.name,
									idURL: member.idURL,
									isIdVerified: false,
								},
							})
						})
					);

					await ctx.db.team.update({
						where: { id: ctx.session.user.LeaderOf.id },
						data: {
							isComplete: true,
							editRequested: false
						},
					})

					return { message: "success" };
				}

				const college = await getCollegeById(ctx.session.user.LeaderOf.college_id);
				await Promise.all(
					input.members.map(async (member) => {
						await ctx.db.teamMembers.create({
							data: {
								name: member.name,
								characterId: member.characterId,
								idURL: member.idURL,
								teamId: college.Team?.id ?? "",
							},
						});
					})
				);

				await ctx.db.team.update({
					where: { id: ctx.session.user.LeaderOf.id },
					data: {
						isComplete: true,
					},
				})

				return { message: "success" };
			} catch (error) {
				if (error instanceof kalasangamaError) {
					throw new TRPCError({
						message: error.message,
						code: "CONFLICT",
					});
				} else {
					console.log(error);
					throw new Error("An error occurred!");
				}
			}
		}),
	getTeam: protectedProcedure.query(async ({ ctx }) => {
		try {
			if (ctx.session.user.LeaderOf) {
				const teamInfo = await ctx.db.user.findUnique({
					where: { id: ctx.session.user.id },
					include: {
						LeaderOf: {
							include: {
								TeamMembers: { include: { Character: true } },
							},
						},
					},
				});
				return teamInfo?.LeaderOf;
			}
			throw new kalasangamaError(
				"Team Details Error",
				"You are not the leader of any team"
			);
		} catch (error) {
			if (error instanceof kalasangamaError) {
				throw new TRPCError({
					message: error.message,
					code: "CONFLICT",
				});
			} else {
				console.log(error);
				throw new Error("An error occurred!");
			}
		}
	}),
	getTeamForEdits: protectedProcedure.query(async ({ ctx }) => {
		try {
			if (ctx.session.user.LeaderOf) {
				const teamInfo = await ctx.db.user.findUnique({
					where: { id: ctx.session.user.id },
					include: {
						LeaderOf: {
							select: {
								TeamMembers: {
									select: {
										name: true,
										Character: {
											select: { id: true },
										},
										idURL: true,
									},
								},
							},
						},
					},
				});
				return teamInfo?.LeaderOf;
			}
			throw new kalasangamaError(
				"Team Details Error",
				"You are not the leader of any team"
			);
		} catch (error) {
			if (error instanceof kalasangamaError) {
				throw new TRPCError({
					message: error.message,
					code: "CONFLICT",
				});
			} else {
				console.log(error);
				throw new Error("An error occurred!");
			}
		}
	}),
	requestEditAccess: protectedProcedure.mutation(async ({ ctx }) => {
		const teamId = ctx.session.user.LeaderOf?.id;
		await ctx.db.team.update({
			where: { id: teamId },
			data: {
				editRequested: true,
			},
		});
	}),
});

export default TeamRouter;
