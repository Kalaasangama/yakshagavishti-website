import jwt from "jsonwebtoken";
import { prisma } from "~/server/db";
import { z } from "zod";
import type { User } from "./CustomTypes";
import { env } from "~/env.mjs";

class Tokens {
	static generateRefreshToken(claim: jwt.JwtPayload) {
		const refreshToken = jwt.sign(claim, "n/BpJwxCJJfa7iyfw2tMxOYByFG8");
		return refreshToken;
	}
	static async getAccessToken(token: string | undefined, user: User) {
		if (token) {
			try {
				const RefreshTokens = await prisma.user.findUnique({
					where: {
						email: user.email,
					},
					select: {
						RefreshTokens: {
							select: {
								hashedToken: true,
								revoked: true,
							},
						},
					},
				});
				if (RefreshTokens?.RefreshTokens[0]?.revoked) {
					throw "Revoked Token";
				}
				jwt.verify(z.string().parse(token), env.NEXTAUTH_SECRET);
				return token;
			} catch (accessTokenError) {
				try {
					//Verify refresh token and refresh the access token
					const refreshToken = await prisma.user.findUnique({
						where: { email: user.email },
						select: {
							RefreshTokens: { select: { hashedToken: true } },
						},
					});
					jwt.verify(
						z.string().parse(refreshToken),
						env.NEXTAUTH_SECRET
					);
					const access_token = jwt.sign(
						{
							email: user.email,
						},
						env.NEXTAUTH_SECRET,
						{ expiresIn: "5h" }
					);

					//Store the access token in db
					await prisma.verificationToken.update({
						where: {
							id: z.string().parse(user.userID),
						},
						data: {},
					});
					return access_token;
				} catch (error) {
					if (error.name === "TokenExpiredError") {
						return "Session Expired";
					}
				}
			}
		} else {
			return jwt.sign(
				{
					name: user.name,
					email: user.email,
				},
				env.NEXTAUTH_SECRET,
				{ expiresIn: "5h" }
			);
		}
	}
}

export default Tokens;
