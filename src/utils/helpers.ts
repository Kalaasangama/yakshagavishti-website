import { db } from "../server/db";
import kalasangamaError from "./customError";
import type { UserInput } from "~/utils/CustomTypes";

const getUserAccessToTeam = async (user_id: string) => {
	const user = await db.user.findUnique({
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
	const college = await db.college.findUnique({
		where: {
			id: college_id,
		},
		include: { Team: {
			include: { members: true},
		} },
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
	leader_contact: string,
	leader_name: string
) => {
	if (character_id)
		await db.user.update({
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
		await db.user.update({
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
	return db.user.create({
		data: {
			name: user?.name,
			characterPlayed: {
				connect: {
					id: user?.characterId,
				},
			},
			idURL: user?.idURL,
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
	await db.team.update({
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
