import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import Team from "~/utils/teams.services";

export const TeamRouter = createTRPCRouter({
	register: protectedProcedure
		.input(
			z.object({
				teamName: z.string(),
				leadId: z.string(),
				members: z.array(
					z.object({
						name: z.string(),
						email: z.string(),
						password: z.string(),
						collegeId: z.string(),
						isLead: z.boolean(),
						phone_number: z.string(),
						blocked: z.literal(false),
						email_verified: z.literal(false),
						phone_verified: z.literal(false),
						verify_email: z.literal(false),
					})
				),
			})
		)
		.mutation(async ({ctx, input }) => {
			const team = new Team(input.teamName, input.members, ctx);
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
