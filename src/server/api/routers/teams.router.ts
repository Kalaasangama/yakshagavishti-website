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
						college_id: z.string(),
						character_id: z.string(),
						isLead: z.boolean(),
					})
				),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const team = new Team(input.teamName, input.members, ctx);
			try {
				if (!(await team.isTeamExists())) {
					await ctx.prisma.$transaction([...team.addMembers, team.createTeam]);
				}
			} catch (error) {
				console.log(error);
				return "Error";
			}
		}),
});

export default TeamRouter;
