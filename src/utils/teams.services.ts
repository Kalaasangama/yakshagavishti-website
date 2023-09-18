import { prisma } from "~/server/db";
import type { AdapterUser, UserCreateInput } from "./CustomTypes";
import { z } from "zod";
import type { PrismaClient } from "@prisma/client";
import management from "./auth0";
import { AuthenticationClient } from "auth0";

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
	constructor(teamName: string, members: UserCreateInput[], ctx: ctx) {
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
						const auth = new AuthenticationClient({
							clientId: "XjZEVZsAtmKONjtm2ECtkc5Vywd6WBjP",
							clientSecret:
								"jVhPt29kCAqqZ-J_QVuqKmcwtakFLwn5cYUioLkCYuVr5wQYCis9UbCyKbSTW7vf",
							domain: "srivatsa.au.auth0.com",
						});
						console.log(
							await auth.oauth.clientCredentialsGrant({
								audience: "srivatsa.au.auth0.com",
								client_id: "CTmYjYA8ZywP6iK6AI1wk4HJfHt4Q8Mr",
								client_secret:
									"jVhPt29kCAqqZ-J_QVuqKmcwtakFLwn5cYUioLkCYuVr5wQYCis9UbCyKbSTW7vf",
							})
						);
						console.log(this.ctx.session.user.id);
						const result = await this.ctx.prisma.user.findUnique({
							where: {
								id: this.ctx.session.user.id,
							},
							select: {
								accounts: {
									select: {
										refresh_token: true,
									},
								},
							},
						});
						console.log(result?.accounts[0]);
						await auth.oauth.refreshTokenGrant({
							refresh_token: z
								.string()
								.parse(result?.accounts[0]?.refresh_token),
						});
						await management.users.create({
							email: user.email,
							phone_number: user.phone_number,
							name: user.name,
							password: user.password,
							blocked: false,
							email_verified: false,
							phone_verified: false,
							verify_email: false,
							connection: "Username-Password-Authentication",
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
