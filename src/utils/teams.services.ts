import { prisma } from "~/server/db";
import type { AdapterUser, UserInput } from "./CustomTypes";
import { z } from "zod";
import type { PrismaClient } from "@prisma/client";
import management from "./auth0";

interface ctx {
	prisma: PrismaClient;
	session: {
		user: AdapterUser;
	};
}
class Team {
	private name;
	private members;
	private ctx;
	constructor(teamName: string, members: UserInput[], ctx: ctx) {
		this.name = teamName;
		this.members = members;
		this.ctx = ctx;
	}

	async isTeamExists() {
		const team = await prisma.team.findUnique({
			where: {
				name: this.name,
			},
		});
		if (team) {
			throw "Team Exists!";
		}
		return false;
	}
	async createTeam() {
		console.log(this.ctx.session.user.id);
		try {
			const teamOfUser = await prisma.user.findUnique({
				where: { id: this.ctx.session.user.id },
				select: { team: { select: { name: true, members: true } } },
			});
			if (teamOfUser?.team) {
				throw "You already have formed a team!";
			}
			return prisma.team.create({
				data: {
					name: this.name,
					leader: {
						connect: {
							id: z.string().parse(this.ctx.session.user.id),
						},
					},
					members: {
						connect: {
							id: this.ctx.session.user.id,
						},
					},
				},
			});
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async addMembers() {
		try {
			await prisma.user.update({
				where: { id: this.ctx.session.user.id },
				data: {
					team: {
						connect: { name: this.name },
					},
				},
			});

			return this.members.map(async (user) => {
				try {
					//Create user in auth0
					const result = await management.users.create({
						name: user.name,
						email: user.email,
						password: user.password,
						connection: "Username-Password-Authentication",
					});

					//Todo: Send a verfication mail before creating the accounts

					return prisma.account.create({
						data: {
							user: {
								create: {
									id: result.data.identities[0]?.user_id,
									email: result.data.email,
									emailVerified:
										result.data.email_verified,
									name: result.data.name,
									college: {
										connect: { id: user.college_id },
									},
									characterPlayed: {
										connect: {
											id: user.character_id,
										},
									},
									team: {
										connect: { name: this.name },
									},
								},
							},
							provider: z
								.string()
								.parse(result.data.identities[0]?.provider),
							providerAccountId: z
								.string()
								.parse(result.data.user_id),
							type: "oauth",
						},
					});


				} catch (mapError) {
					if (mapError.error === "Conflict") {
						throw "Looks like a member from your team already exists in another team!";
					}
					console.log(mapError.error);
					throw mapError;
				}
			})
		} catch (error) {
			throw error;
		}
	}

}

export default Team;
