import type { Role } from "@prisma/client";
import { z } from "zod";

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
	name: string;
	email: string;
	password: string;
	college_id: string;
	character_id: string;
	isLead: boolean;
}

interface addScoresInput {
	teamName: string;
	teamScore: number;
	characterScores: {
		character_id: string;
		score: number;
	}[];
	givenBy: string;
}
interface JWT {
	iat: number;
	exp: number;
	accessToken: string;
}

export type { Session, JWT, User, AdapterUser, UserInput, addScoresInput };
