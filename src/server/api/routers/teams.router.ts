import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import management from "~/utils/auth0";
import kalasangamaError from "~/utils/customError";

export const TeamRouter = createTRPCRouter({
	register: protectedProcedure
		.input(
			z.object({
				college_id: z.string(),
				members: z.array(
					z.object({
						name: z.string(),
						email: z.string(),
						password: z.string(),
						phone: z.string(),
						character_id: z.string(),
					})
				),
			})
		)
		.mutation(async ({ ctx, input }) => {
			try {
				//Get college by ID
				const collegeById = await ctx.prisma.college.findUnique({
					where: {
						id: input.college_id,
					},
				});

				if (!collegeById) {
					throw new kalasangamaError(
						"Create team error",
						"College not found"
					);
				} else {
					console.log(collegeById);
				}
				//Create team
				const newTeam = await ctx.prisma.team.create({
					data: { name: collegeById.name },
				});

				await ctx.prisma.user.update({
					where: { id: ctx.session.user.id },
					data: {
						team: {
							connect: {
								name: newTeam.name,
							},
						},
						leaderOf: {
							connect: {
								name: newTeam.name,
							},
						},
					},
				});

				//Create accounts in auth0
				await Promise.all(
					input.members.map(async (user) => {
						const auth0User =
							await management.usersByEmail.getByEmail({
								email: user.email,
							});

						//If auth0 user already exists, link the user to a team if he is not already in a team
						if (auth0User.data.length > 0) {
							const userTeam = await ctx.prisma.user.findFirst({
								where: {
									email: auth0User.data[0]?.email,
								},
								select: {
									team: {
										select: {
											id: true,
										},
									},
								},
							});

							if (userTeam?.team) {
								throw new kalasangamaError(
									"Add member error",
									"User you are trying to add is already in a team"
								);
							}

							await ctx.prisma.user.update({
								where: {
									email: auth0User.data[0]?.email,
								},
								data: {
									team: {
										connect: {
											name: collegeById?.name,
										},
									},
								},
							});
						}
						//If auth0 user does not exist create an account
						else {
							const newUser = await management.users.create({
								name: user.name,
								email: user.email,
								password: user.password,
								connection: "Username-Password-Authentication",
							});
							return {
								auth0Data: newUser.data,
								memberDetails: user,
							};
						}
					})
				).then((res) => {
					//Create an array of prisma promises for transaction
					console.log(collegeById);
					const addUsersTransaction = res.map((user) => {
						return ctx.prisma.account.create({
							data: {
								type: "oauth",
								provider: "auth0",
								providerAccountId: z
									.string()
									.parse(user?.auth0Data.user_id),
								scope: "openid profile email",
								token_type: "Bearer",
								user: {
									create: {
										id: user?.auth0Data.identities[0]
											?.user_id,
										name: user?.memberDetails.name,
										email: user?.memberDetails.email,
										characterPlayed: {
											connect: {
												id: user?.memberDetails
													.character_id,
											},
										},
										team: {
											connect: {
												name: collegeById.name,
											},
										},
										college: {
											connect: {
												id: input.college_id,
											},
										},
									},
								},
							},
						});
					});

					return ctx.prisma
						.$transaction(addUsersTransaction)
						.then(() => "success")
						.catch((error) => console.log(error));
				});
			} catch (error) {
				console.log(error);
				throw "An error occurred!";
			}
		}),
});

export default TeamRouter;
