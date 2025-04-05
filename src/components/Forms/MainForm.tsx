import { useState } from "react";
import CollegeReg from "~/components/Forms/CollegeReg";
import LeadRegister from "~/components/Forms/LeadRegister";
import MemberReg from "~/components/Forms/MemberReg";
import EditTeamForm from "~/components/Forms/EditTeam";

export default function CreateTeam() {
	const [FormToShow, setFormToShow] = useState(1);
	const [CollegeId, setCollegeId] = useState("");
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
				/>
			</>
		);

	if (FormToShow === 4)
		return (
			<>
				<EditTeamForm />
			</>
		);
	else
		return (
			<>
				<MemberReg
					setFormToShow={setFormToShow}
				/>
			</>
		);
}
