import { useState } from "react";
import CollegeReg from "./CollegeReg";
import LeadRegister from "./LeadRegister";
import MemberReg from "./MemberReg";

export default function CreateTeam() {
	const [FormToShow, setFormToShow] = useState(1);
	const [CollegeId, setCollegeId] = useState("");
	const [LeaderChar, setLeaderChar] = useState("");
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
