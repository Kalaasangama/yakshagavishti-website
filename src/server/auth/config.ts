import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { z } from "zod";
import { env } from "~/env";
import { db } from "~/server/db";
import { Role } from "@prisma/client";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session {
		user: {
			id: string;
			role: Role;
			LeaderOf: {
				id: string;
				college_id: string;
				isComplete: boolean;
				editRequested: boolean;
			} | undefined;
		} & DefaultSession["user"];
	}

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    GoogleProvider({
      	clientId: env.GOOGLE_CLIENT_ID,
		clientSecret: env.GOOGLE_CLIENT_SECRET,
	}),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    session: async ({ session, user }) => {
			if (session?.user) {
				const data = await db.user.findUnique({
					where: { id: user.id },
					select: {
						role: true,
						LeaderOf: {
							select: {
								id: true,
								college_id: true,
								isComplete: true,
								editRequested: true,
							}
						},
					},
				});
				session.user.id = z.string().parse(user.id);
				session.user.role = data?.role ?? Role.PARTICIPANT;
				session.user.LeaderOf = data?.LeaderOf
					? z.object({
						id: z.string(),
						college_id: z.string(),
						isComplete: z.boolean(),
						editRequested: z.boolean(),
					}).parse(data.LeaderOf) : undefined;
			}
			return session;
		},
  },
} satisfies NextAuthConfig;
