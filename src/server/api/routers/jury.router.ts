import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import Team from "~/utils/teams.services";

export const TeamRouter = createTRPCRouter({
	updateScore: protectedProcedure
		.input(
			z.object({
				teamName: z.string(),
				teamScore: z.number(),
				characterScores: z.object({
					character_id: z.string(),
					score: z.number(),
				}),
				givenBy: z.string(),
			})
		)

		.mutation(async ({ ctx, input }) => {
			const team = new Score(input.teamName, input.characterScores, ctx);
			try {
				if (!(await team.isTeamExists())) {
					await team.createTeam();
					await team.addMembers();
				}
			} catch (error) {
				console.log(error);
				return "Error";
			}
		}),
});

export default TeamRouter;
