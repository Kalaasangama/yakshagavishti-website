import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import kalasangamaError from "~/utils/customError";
import {
	createAccount,
	createAuth0User,
	createTeam,
	setTeamCompleteStatus,
} from "~/utils/helpers";

export const TeamRouter = createTRPCRouter({
	register: protectedProcedure
		.input(
			z.object({
				college_id: z.string(),
				leader_character: z.string().nullable(),
				members: z.array(
					z.object({
						name: z.string(),
						email: z.string(),
						password: z.string(),
						phone: z.string(),
						character_id: z.string(),
						id_url: z.string(),
					})
				),
			})
		)
		.mutation(async ({ ctx, input }) => {
			try {
				//Create or return team
				const { team, college } = await createTeam(
					input.college_id,
					ctx.session,
					input.leader_character
				);
				//Create accounts in auth0
				await Promise.all(
					input.members.map(async (user) => {
						return createAuth0User(user);
					})
				).then(async (res) => {
					//Create an array of prisma promises for transaction
					const addUsersTransaction = res.map((user) => {
						return createAccount(user, college.name, college.id);
					});

					//Create user accounts in transaction
					return ctx.prisma
						.$transaction(addUsersTransaction)
						.then(async () => {
							await setTeamCompleteStatus(team.id, true);
							return "success";
						})
						.catch((error) => {
							throw error;
						});

					//Set team complete status to true to prevent edits
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
