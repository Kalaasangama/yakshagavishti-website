import bcrypt from "bcrypt";
const hashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

const comparePassword = async (password: string, hash: string) => {
	try {
		if (await bcrypt.compare(password, hash)) {
			return true;
		}
		return false;
	} catch (error) {
		console.log(error);
	}
};
export { hashPassword, comparePassword };
