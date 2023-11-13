import { prisma } from "../server/db";
import kalasangamaError from "./customError";
import type { UserInput } from "./CustomTypes";

const getUserAccessToTeam = async (user_id: string) => {
	const user = await prisma.user.findUnique({
		where: { id: user_id },
		select: {
			team: {
				select: { id: true, name: true },
			},
			leaderOf: { select: { id: true } },
		},
	});
	if (user?.leaderOf?.id) {
		return "LEADER";
	} else if (user?.team?.id) {
		return "MEMBER";
	} else {
		return "NEW_USER";
	}
};
const getCollegeById = async (college_id: string) => {
	const college = await prisma.college.findUnique({
		where: {
			id: college_id,
		},
		include: { Team: true },
	});

	if (!college) {
		throw new kalasangamaError("Create team error", "College not found");
	}
	return college;
};

const setLeader = async (
	user_id: string,
	teamName: string,
	college_id: string,
	character_id: string | null,
	leaderIdUrl: string | null,
	leader_contact: string
) => {
	if (character_id)
		await prisma.user.update({
			where: { id: user_id },
			data: {
				team: {
					connect: {
						name: teamName,
					},
				},
				leaderOf: {
					connect: {
						name: teamName,
					},
				},
				college: {
					connect: {
						id: college_id,
					},
				},
				characterPlayed: {
					connect: {
						id: character_id,
					},
				},
				idURL: leaderIdUrl,
				contact: leader_contact,
			},
		});
	else
		await prisma.user.update({
			where: { id: user_id },
			data: {
				team: {
					connect: {
						name: teamName,
					},
				},
				leaderOf: {
					connect: {
						name: teamName,
					},
				},
				college: {
					connect: {
						id: college_id,
					},
				},
				idURL: leaderIdUrl,
				contact: leader_contact,
			},
		});
};

const createAccount = (
	user: UserInput,
	teamName: string,
	college_id: string
) => {
	return prisma.user.create({
		data: {
			name: user?.name,
			characterPlayed: {
				connect: {
					id: user?.character_id,
				},
			},
			idURL: user?.id_url,
			team: {
				connect: {
					name: teamName,
				},
			},
			college: {
				connect: {
					id: college_id,
				},
			},
		},
	});
};

const setTeamCompleteStatus = async (team_id: string, status: boolean) => {
	await prisma.team.update({
		where: { id: team_id },
		data: { isComplete: status },
	});
};
export {
	getCollegeById,
	setLeader,
	getUserAccessToTeam,
	createAccount,
	setTeamCompleteStatus,
};
