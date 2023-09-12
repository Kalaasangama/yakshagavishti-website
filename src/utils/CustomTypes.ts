import type { Role } from "@prisma/client";

interface Session {
	accessToken: string;
}

interface User {
	name: string | null;
	email: string;
	picture: string | null;
	userID: string | null;
}

interface AdapterUser {
	data: {
		access: string;
		refresh: string;
	};
	accessToken: string;
}

interface UserInput {
	name: string;
	email: string;
	password: string;
	collegeId: string;
	phoneNumber: string;
	isLead: boolean;
}

interface JWT {
	iat: number;
	exp: number;
	accessToken: string;
}

export type { Session, JWT, User, AdapterUser, UserInput };
