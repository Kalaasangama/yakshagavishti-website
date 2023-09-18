import { ManagementClient } from "auth0";
import { env } from "~/env.mjs";

const management = new ManagementClient({
	domain: "srivatsa.au.auth0.com",
	clientId: "CTmYjYA8ZywP6iK6AI1wk4HJfHt4Q8Mr",
	clientSecret: "jVhPt29kCAqqZ-J_QVuqKmcwtakFLwn5cYUioLkCYuVr5wQYCis9UbCyKbSTW7vf",
});

export default management;
