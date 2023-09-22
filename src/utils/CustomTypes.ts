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
	collegeId: string;
	phoneNumber: string;
	isLead: boolean;
}

interface UserCreateInput {
	email: string;
	phone_number: string;
	college_id: string;
	blocked: false;
	email_verified: false;
	phone_verified: false;
	name: string;
	password: string;
	verify_email: false;
	character_id: string;
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

export type {
	Session,
	JWT,
	User,
	AdapterUser,
	UserInput,
	UserCreateInput,
	addScoresInput,
};
