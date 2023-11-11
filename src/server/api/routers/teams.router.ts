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
				members: z.array(
					z.object({
						name: z.string(),
						character_id: z.string(),
						id_url: z.string(),
					})
				),
			})
		)
		.mutation(async ({ ctx, input }) => {
			try {
				//Create or return team
				console.log(input);
				const college = await getCollegeById(input.college_id);
				//Set team leader
				if (college.Team.isComplete)
					throw new kalasangamaError(
						"Create Team Error",
						"Team is already complete"
					);
				if (input.members.length === 0) {
					await setLeader(
						ctx.session.user.id,
						college.Team.name,
						college.id,
						input.leader_character,
						input.leader_idUrl,
						input.leader_contact
					);
					return { message: "success" };
				}
				//Create an array of prisma promises for transaction
				const addUsersTransaction = input.members.map((user) => {
					return createAccount(user, college.Team.name, college.id);
				});
				//Create user accounts in transaction
				await ctx.prisma.$transaction(addUsersTransaction);
				//Set team complete status to true to prevent edits
				await setTeamCompleteStatus(college.Team.id, true);
			} catch (error) {
				if (error instanceof kalasangamaError) {
					throw new TRPCError({
						message: error.message,
						code: "CONFLICT",
					});
				} else {
					console.log(error);
					throw "An error occurred!";
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
				const college = await ctx.prisma.college.findUnique({
					where: { id: input.college_id },
				});
				if (college) {
					console.log(input.password, college.password);
					if (input.password === college.password) {
						return { message: "success" };
					} else {
						throw new kalasangamaError(
							"Create Team Error",
							"Team password is incorrect"
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
					throw "An error occurred!";
				}
			}
		}),
	getTeam: protectedProcedure.query(async ({ ctx }) => {
		try {
			if (ctx.session.user.leaderOf) {
				const teamInfo = await ctx.prisma.user.findUnique({
					where: { id: ctx.session.user.id },
					include: {
						team: {
							include: { members: true, editRequests: true },
						},
					},
				});
				return teamInfo.team;
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
				throw "An error occurred!";
			}
		}
	}),
	requestEditAccess: protectedProcedure.mutation(async ({ ctx }) => {
		const teamId = ctx.session.user.team.id;
		await ctx.prisma.team.update({
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
				members: z.array(
					z.object({
						user_id: z.string(),
						name: z.string(),
						character_id: z.string(),
						id_url: z.string(),
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
				const team = await ctx.prisma.team.findUnique({
					where: { id: ctx.session.user.team.id },
					include: { leader: true },
				});

				//Check if team has edit access
				if (team.isComplete)
					throw new kalasangamaError(
						"Update Team Error",
						"Please request permission to edit your team"
					);

				//Update the users
				await Promise.all(
					input.members.map(async (member) => {
						await ctx.prisma.user.update({
							where: { id: member.user_id },
							data: {
								name: member.name,
								characterPlayed: {
									connect: { id: member.character_id },
								},
								idURL: member.id_url,
							},
						});
					})
				);

				//Set the team complete status to prevent further edits
				await ctx.prisma.team.update({
					where: { id: ctx.session.user.team.id },
					data: { isComplete: true },
				});
			} catch (error) {
				if (error instanceof kalasangamaError) {
					throw new TRPCError({
						message: error.message,
						code: "CONFLICT",
					});
				} else {
					console.log(error);
					throw "An error occurred!";
				}
			}
		}),
});

export default TeamRouter;
