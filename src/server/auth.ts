import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "~/server/db";
import Tokens from "~/utils/tokenHandler";

export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ user, token }) {
			const accessToken = await Tokens.getAccessToken(token.sub, user);
			token.sub = accessToken;
			return token;
		},
	},
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: "Email",
			credentials: {
				email: { type: "email", label: "Email", placeholder: "Email" },
				password: {
					type: "password",
					label: "password",
					placeholder: "password",
				},
			},
			async authorize(credentials, req): Promise<any> {
				const user = await prisma.user.findUnique({
					where: {
						email: z.string().parse(credentials?.email),
					},
					select: {
						name: true,
						email: true,
						id: true,
					},
				});
				if (user) {
					return {
						email: z.string().parse(user.email),
						name: user.name,
						userID: z.string().parse(user.id),
					};
				}
				return null;
			},
		}),
	],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
	req: GetServerSidePropsContext["req"];
	res: GetServerSidePropsContext["res"];
}) => {
	return getServerSession(ctx.req, ctx.res, authOptions);
};
