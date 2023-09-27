import { prisma } from "../server/db";
import kalasangamaError from "./customError";
//Get college by ID
const getCollegeById = async (college_id: string) => {
	const college = await prisma.college.findUnique({
		where: {
			id: college_id,
		},
	});

	if (!college) {
		throw new kalasangamaError("Create team error", "College not found");
	}
	return college;
};

const checkLeaderStatus = async (user_id: string) => {
	const leaderOf = await prisma.user.findUnique({
		where: { id: user_id },
		select: { leaderOf: { select: { id: true } } },
	});
	if (leaderOf) {
		throw new kalasangamaError(
			"Create team error",
			"You have already created your team"
		);
	} else return;
};

const setLeader = async (user_id: string, teamName: string) => {
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
		},
	});
};

export { getCollegeById, setLeader, checkLeaderStatus };
