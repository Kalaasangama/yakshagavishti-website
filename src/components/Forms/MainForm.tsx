import { useState } from "react";
import CollegeReg from "./CollegeReg";
import LeadRegister from "./LeadRegister";
import MemberReg from "./MemberReg";
import { useSession } from "next-auth/react";
import EditTeamForm from "./EditTeam";

export default function CreateTeam() {
	const user = useSession().data.user;
	const [FormToShow, setFormToShow] = useState(1);
	const [CollegeId, setCollegeId] = useState("");
	const [LeaderChar, setLeaderChar] = useState(user.characterId || null);
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
