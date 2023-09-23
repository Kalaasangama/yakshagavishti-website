import { ManagementClient } from "auth0";
import { env } from "~/env.mjs";

const management = new ManagementClient({
	domain: env.AUTH0_MANAGEMENT_API_DOMAIN,
	clientId: env.AUTH0_MANAGEMENT_API_CLIENT_ID,
	clientSecret: env.AUTH0_MANAGEMENT_API_CLIENT_SECRET,
});

export default management;
