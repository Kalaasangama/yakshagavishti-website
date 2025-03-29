interface Session {
	accessToken: string;
}

interface User {
	name: string | undefined;
	email: string;
	id: string;
	token: { refreshToken: string | undefined; revoked: boolean } | undefined;
}

interface AdapterUser {
	name: string | undefined;
	email: string;
	id: string;
	token: { refreshToken: string | undefined; revoked: boolean } | undefined;
}

interface UserInput {
	name?: string;
	characterId?: string;
	idURL?: string;
}

interface addScoresInput {
	teamName: string;
	teamScore: number;
	characterScores: {
		characterId: string;
		score: number;
	}[];
	givenBy: string;
}
interface JWT {
	iat: number;
	exp: number;
	accessToken: string;
}

export type {
	Session,
	JWT,
	User,
	AdapterUser,
	UserInput,
	addScoresInput,
};
