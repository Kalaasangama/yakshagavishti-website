import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
	type DefaultSession,
	getServerSession,
	type NextAuthOptions,
} from "next-auth";
import { z } from "zod";
import { prisma } from "~/server/db";
import GoogleProvider from "next-auth/providers/google";
import { env } from "~/env.mjs";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			team:
				| {
						id: string;
						name: string;
						isComplete: boolean;
				  }
				| null
				| undefined;
			leaderOf: string | undefined;
			idURL: string;
			contact: string;
			teamEditStatus: string;
		} & DefaultSession["user"];
	}
}

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
			issuer: env.AUTH0_ISSUER,
		}),
	],
	callbacks: {
		session: async ({ session, user }) => {
			if (session?.user) {
				const data = await prisma.user.findUnique({
					where: { id: user.id },
					select: {
						team: {
							select: {
								id: true,
								name: true,
								isComplete: true,
								editRequests: { select: { status: true } },
							},
						},
						leaderOf: { select: { id: true } },
						idURL: true,
						contact: true,
					},
				});
				session.user.team = data?.team;
				session.user.leaderOf = data?.leaderOf?.id;
				session.user.id = z.string().parse(user.id);
				session.user.idURL = data.idURL;
				session.user.contact = data.contact;
				session.user.teamEditStatus = data?.team?.editRequests.status;
			}
			return session;
		},
	},
};

export const getServerAuthSession = (ctx: {
	req: GetServerSidePropsContext["req"];
	res: GetServerSidePropsContext["res"];
}) => {
	return getServerSession(ctx.req, ctx.res, authOptions);
};
