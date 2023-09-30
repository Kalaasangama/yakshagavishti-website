import { z } from "zod";
import { prisma } from "../server/db";
import kalasangamaError from "./customError";
import type { UserInput, createAccountParm } from "./CustomTypes";
import management from "./auth0";
import type { Session } from "next-auth";

const createTeam = async (college_id: string, session: Session) => {
	if (session.user.team?.id && session.user.leaderOf) {
		if (session.user.team.isComplete) {
			throw new kalasangamaError(
				"Create team error",
				"Your team is complete"
			);
		}
		const college = await getCollegeById(college_id);
		return { team: session.user.team, college };
	} else if (session?.user?.team?.id && !session.user.leaderOf) {
		throw new kalasangamaError(
			"Create team error",
			"You are not the leader"
		);
	} else {
		const college = await getCollegeById(college_id);
		const team = await prisma.team.create({
			data: {
				name: college.name,
				college: {
					connect: { id: college_id },
				},
				leader: {
					connect: {
						id: session.user.id,
					},
				},
			},
			select: {
				id: true,
				name: true,
				isComplete: true,
			},
		});
		await setLeader(session.user.id, team.name, college_id);
		return { team, college };
	}
};
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
	});

	if (!college) {
		throw new kalasangamaError("Create team error", "College not found");
	}
	return college;
};

const setLeader = async (
	user_id: string,
	teamName: string,
	college_id: string
) => {
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
		},
	});
};

const createAuth0User = async (user: UserInput) => {
	const auth0User = await management.usersByEmail.getByEmail({
		email: user.email,
	});

	//If auth0 user already exists, link the user to a team if he is not already in a team
	if (auth0User.data.length > 0) {
		const userTeam = await prisma.user.findFirst({
			where: {
				email: auth0User.data[0]?.email,
			},
			select: {
				team: {
					select: {
						id: true,
					},
				},
			},
		});

		if (userTeam?.team?.id) {
			throw new kalasangamaError(
				"Add member error",
				"User you are trying to add is already in a team"
			);
		}
		return {
			auth0Data: auth0User.data[0],
			memberDetails: user,
		};
	}

	//If auth0 user does not exist create an account
	else {
		const newUser = await management.users.create({
			name: user.name,
			email: user.email,
			password: user.password,
			connection: "Username-Password-Authentication",
		});
		return {
			auth0Data: newUser.data,
			memberDetails: user,
		};
	}
};
const createAccount = (
	user: createAccountParm,
	college_name: string,
	college_id: string
) => {
	return prisma.account.create({
		data: {
			type: "oauth",
			provider: "auth0",
			providerAccountId: z.string().parse(user?.auth0Data?.user_id),
			scope: "openid profile email",
			token_type: "Bearer",
			user: {
				create: {
					id: user?.auth0Data?.identities[0]?.user_id,
					name: user?.memberDetails.name,
					email: user?.memberDetails.email,
					characterPlayed: {
						connect: {
							id: user?.memberDetails.character_id,
						},
					},
					team: {
						connect: {
							name: college_name,
						},
					},
					college: {
						connect: {
							id: college_id,
						},
					},
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
	createTeam,
	getCollegeById,
	setLeader,
	getUserAccessToTeam,
	createAccount,
	createAuth0User,
	setTeamCompleteStatus,
};
