import { prisma } from "~/server/db";
import type { AdapterUser, UserCreateInput } from "./CustomTypes";
import { z } from "zod";
import type { PrismaClient } from "@prisma/client";

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
	constructor(teamName: string, members: addScoresInput[], ctx: ctx) {
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
			await prisma.team.create({
				data: {
					name: this.name,
					leader: {
						connect: {
							id: z.string().parse(this.ctx.session.user.id),
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
			await Promise.all(
				this.members.map(async (user) => {
					try {
						await prisma.user.create({
							data: {
								email: user.email,
								name: user.name,
								college: {
									connect: {
										id: user.college_id,
									},
								},
								characterPlayed: {
									connect: {
										id: user.character_id,
									},
								},
								team: {
									connect: {
										name: this.name,
									},
								},
							},
						});
					} catch (mapError: unknown) {
						console.log(mapError);
						throw mapError;
					}
				})
			);
		} catch (error) {
			throw error;
		}
	}
}

export default Team;
