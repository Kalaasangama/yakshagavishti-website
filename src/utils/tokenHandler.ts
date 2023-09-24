import jwt from "jsonwebtoken";
import { prisma } from "~/server/db";
import { z } from "zod";
import type { User } from "./CustomTypes";
import { env } from "~/env.mjs";

class Tokens {
	static generateRefreshToken(claim: jwt.JwtPayload) {
		const refreshToken = jwt.sign(claim, env.NEXTAUTH_SECRET, {
			expiresIn: "7d",
		});
		return refreshToken;
	}
	static getAccessToken(token: string | undefined, user: User) {
		console.log(user);
		if (token) {
			try {
				if (user.token?.revoked) {
					console.log("Revoked Token");
					throw "Revoked Token";
				}
				jwt.verify(
					z.string().parse(user.token?.refreshToken),
					env.NEXTAUTH_SECRET
				);
				return token;
			} catch (accessTokenError) {
				if (accessTokenError.name === "TokenExpiredError") {
					try {
						//Verify refresh token and refresh the access token
						const access_token = jwt.sign(
							{
								email: user.email,
							},
							env.NEXTAUTH_SECRET,
							{ expiresIn: "5h" }
						);

						return access_token;
					} catch (error) {
						console.log(error);
						throw new Error("Could not create access token!");
					}
				} else {
					console.log(accessTokenError);
					throw new Error("Failed at token verification");
				}
			}
		} else {
			const accessToken = jwt.sign(
				{
					name: user.name,
					email: user.email,
				},
				env.NEXTAUTH_SECRET,
				{ expiresIn: "5h" }
			);
			return accessToken;
		}
	}
}

export default Tokens;
