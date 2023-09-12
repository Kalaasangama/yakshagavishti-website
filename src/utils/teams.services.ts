import { prisma } from "~/server/db";
import type { UserInput } from "./CustomTypes";
import { hashPassword } from "./passwords";

class Team {
	private name;
	private members;
	constructor(teamName: string, members: UserInput[]) {
		this.name = teamName;
		this.members = members;
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
		console.log(this.name);
		try {
			await prisma.team.create({
				data: {
					name: this.name,
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
					console.log(user);
					try {
						await prisma.team.update({
							where: {
								name: this.name,
							},
							data: {
								members: {
									create: {
										name: user.name,
										email: user.email,
										password: await hashPassword(
											user.password
										),
										College: {
											connect: {
												id: user.collegeId,
											},
										},
										phoneNumber: user.phoneNumber,
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
