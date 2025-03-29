import { useState } from "react";
import CollegeReg from "~/components/Forms/CollegeReg";
import LeadRegister from "~/components/Forms/LeadRegister";
import MemberReg from "~/components/Forms/MemberReg";
import { useSession } from "next-auth/react";
import EditTeamForm from "~/components/Forms/EditTeam";

export default function CreateTeam() {
	const user = useSession()?.data?.user;
	const [FormToShow, setFormToShow] = useState(1);
	const [CollegeId, setCollegeId] = useState("");
	const [LeaderChar, setLeaderChar] = useState(user?.characterId ?? "");
	if (FormToShow === 1)
		return (
			<>
				<CollegeReg
					setFormToShow={setFormToShow}
					setCollege={setCollegeId}
				/>
			</>
		);
	if (FormToShow === 2)
		return (
			<>
				<LeadRegister
					setFormToShow={setFormToShow}
					college_id={CollegeId}
					setLeaderChar={setLeaderChar}
				/>
			</>
		);

	if (FormToShow === 4)
		return (
			<>
				<EditTeamForm
					LeaderCharacter={LeaderChar}
					CollegeId={CollegeId}
				/>
			</>
		);
	else
		return (
			<>
				<MemberReg
					setFormToShow={setFormToShow}
					LeaderCharacter={LeaderChar}
					CollegeId={CollegeId}
				/>
			</>
		);
}
