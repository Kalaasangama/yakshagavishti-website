import type { Role } from "@prisma/client";

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
	blocked: false;
	email_verified: false;
	phone_verified: false;
	name: string;
	password: string;
	verify_email: false;
}

interface JWT {
	iat: number;
	exp: number;
	accessToken: string;
}

export type { Session, JWT, User, AdapterUser, UserInput, UserCreateInput };
