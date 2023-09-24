import * as jwt from "jsonwebtoken";
import { z } from "zod";
const secrets = {
	port: process.env.PORT,
	accessTokenSecret: jwt.sign(
		z.string().parse(process.env.ACCESS_TOKEN_SECRET),
		z.string().parse(process.env.JWT_SECRET)
	),
	refreshTokenSecret: jwt.sign(
		z.string().parse(process.env.REFRESH_TOKEN_SECRET),
		z.string().parse(process.env.JWT_SECRET)
	),
	clientURL_1: process.env.CLIENT_URL_1,
	clientURL_2: process.env.CLIENT_URL_2,
	serverURL: process.env.SERVER_URL,
	googleID: process.env.GOOGLE_CLIENT_ID,
	googleSecret: process.env.GOOGLE_CLIENT_SECRET,
	redirectURL: process.env.REDIRECT_URL,
	googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
	oauthClientID: process.env.OAUTH_CLIENT_ID,
	oauthClientSecret: process.env.OAUTH_CLIENT_SECRET,
	oauthRedirectURL: process.env.OAUTH_REDIRECT_URL,
	googleAccessToken: process.env.GOOGLE_ACCESS_TOKEN
};

export default secrets;
