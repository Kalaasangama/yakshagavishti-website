import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import kalasangamaError from "~/utils/customError";
import {
	createAccount,
	getCollegeById,
	setLeader,
	setTeamCompleteStatus,
} from "~/utils/helpers";

export const TeamRouter = createTRPCRouter({
	register: protectedProcedure
		.input(
			z.object({
				college_id: z.string().nullish(),
				leader_character: z.string().nullish(),
				leader_idUrl: z.string().nullish(),
				leader_contact: z.string().nullish(),
				leader_name: z.string().nullish(),
				members: z.array(
					z.object({
						name: z.string(),
						characterId: z.string(),
						idURL: z.string(),
					})
				),
			})
		)
		.mutation(async ({ ctx, input }) => {
			try {
				//Create or return team
				const college = await getCollegeById(input.college_id ?? "");
				//Set team leader
				if (college.Team?.isComplete)
					throw new kalasangamaError(
						"Create Team Error",
						"Team is already complete"
					);
				
				if (input.members.length === 0) {
					await setLeader(
						ctx.session.user.id,
						college.Team?.name ?? "",
						college.id,
						input.leader_character ?? "",
						input.leader_idUrl ?? "",
						input.leader_contact ?? "",
						input.leader_name ?? ""
					);
					return { message: "Leader Details Updated" };
				}
				//Add members to team

				if (college.Team && college.Team.members.length > 0) {
					await ctx.db.user.deleteMany({
						where: {
							id: {
								in: college.Team.members
									.map((member) => member.id)
									.filter((id) => id !== ctx.session.user.id),
							},
						},
					});
				}
				await Promise.all(
					input.members.map((user) =>
						ctx.db.user.create({
							data: {
								name: user?.name,
								characterPlayed: {
									connect: {
										id: user?.characterId,
									},
								},
								idURL: user?.idURL,
								team: {
									connect: {
										id: college.Team?.id,
									},
								},
								college: {
									connect: {
										id: college.id,
									},
								},
							},
						})
					)
				);
				if (ctx.session.user.characterId) {
					const leaderChar = input.members.find(
						(member) =>
							member.characterId === ctx.session.user.characterId
					);
					if (leaderChar?.name === ctx.session?.user?.name)
						await ctx.db.user.update({
							where: { id: ctx.session.user.id },
							data: {
								characterPlayed: {
									disconnect: {},
								},
							},
						});
				}

				//Set team complete status to true to prevent edits
				await setTeamCompleteStatus(college.Team?.id ?? "", true);
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
	getTeam: protectedProcedure.query(async ({ ctx }) => {
		try {
			if (ctx.session.user.leaderOf) {
				const teamInfo = await ctx.db.user.findUnique({
					where: { id: ctx.session.user.id },
					include: {
						team: {
							include: {
								members: { include: { characterPlayed: true } },
								editRequests: true,
							},
						},
					},
				});
				return teamInfo?.team;
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
			if (ctx.session.user.leaderOf) {
				const teamInfo = await ctx.db.user.findUnique({
					where: { id: ctx.session.user.id },
					include: {
						team: {
							select: {
								members: {
									select: {
										name: true,
										characterPlayed: {
											select: { id: true },
										},
										idURL: true,
									},
								},
							},
						},
					},
				});
				return teamInfo?.team;
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
		const teamId = ctx.session.user.team?.id;
		await ctx.db.team.update({
			where: { id: teamId },
			data: {
				editRequests: {
					create: {},
				},
			},
		});
	}),
	updateTeam: protectedProcedure
		.input(
			z.object({
				college_id: z.string(),
				members: z.array(
					z.object({
						name: z.string(),
						characterId: z.string(),
						idURL: z.string(),
					})
				),
			})
		)
		.mutation(async ({ ctx, input }) => {
			try {
				//Check if user is a leader
				if (!ctx.session.user.leaderOf)
					throw new kalasangamaError(
						"Update Team Error",
						"Only leaders can modify teams"
					);

				//Get the user's team if user is a leader
				const team = await ctx.db.team.findUnique({
					where: { id: ctx.session.user.team?.id },
					include: { leader: true },
				});

				//Check if team has edit access
				if (team?.isComplete)
					throw new kalasangamaError(
						"Update Team Error",
						"Please request permission to edit your team"
					);

				const college = await getCollegeById(input.college_id);
				//Update the users
				await Promise.all(
					input.members.map(async (member) => {
						await ctx.db.user.delete({
							where: { id: member.characterId, leaderOf: null },
						});
					})
				);
				//Create an array of prisma promises for transaction
				const addUsersTransaction = input.members.map((user) => {
					return createAccount(user, college.Team?.name ?? "", college.id);
				});
				//Create user accounts in transaction
				await ctx.db.$transaction(addUsersTransaction);
				//Set the team complete status to prevent further edits
				await setTeamCompleteStatus(college.Team?.id ?? "", true);
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
});

export default TeamRouter;
