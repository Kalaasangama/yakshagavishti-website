import React, {
	type Dispatch,
	type SetStateAction,
	useEffect,
	useState,
} from "react";
import { Button } from "src/components/ui/button";
import {
	DialogContent,
	DialogDescription,
	Dialog,
	DialogTitle,
	DialogTrigger,
} from "src/components/ui/dialog";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogDescription,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alert-dialog";
import { api } from "~/utils/api";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/router";
import AccordianForm from "./AccordianForm";
import z from "zod";
const roles = [
	{ label: "SHANTHANU", value: "cloe25kiq0000ileox49h4d1j" },
	{ label: "MANTRI SUNEETHI", value: "cloe265zk0002ileolpspexsb" },
	{ label: "TAAMRAAKSHA", value: "cloe27f110003ileorzfmoe05" },
	{ label: "TAMAALAKETHU", value: "cloe27f110004ileolbv67nnz" },
	{ label: "SATHYAVATHI", value: "cloe27f110005ileomce87hnz" },
	{ label: "DAASHARAJA", value: "cloe27f110006ileobsf7jpot" },
	{ label: "DEVAVRATHA", value: "cloe27f110007ileoc5l1vb44" },
];

type Members = {
	name: string;
	characterId: string;
	idURL: string;
};

const MemberReg = ({
	LeaderCharacter,
	CollegeId,
	setFormToShow,
}: {
	LeaderCharacter: string;
	CollegeId: string;
	setFormToShow: Dispatch<SetStateAction<number>>;
}) => {
	//Get the list of members from the API
	const membersList = api.team.getTeamForEdits.useQuery();
	const [MembersArray, setMembersArray] = useState<Members[]>(
		JSON.parse(localStorage.getItem("members")) || []
	);
	const { toast } = useToast();

	useEffect(() => {
		if (MembersArray.length === 0)
			if (membersList.data && membersList.data.members.length >= 7)
				setMembersArray(membersList.data.members);
	}, [membersList.data]);

	//Register members API
	const registerMembers = api.team.register.useMutation({
		onError(error) {
			return toast({
				variant: "default",
				title: "Error!",
				description: error.message,
			});
		},
		onSuccess(data) {
			localStorage.removeItem("members");
			toast({
				variant: "default",
				title: "Team registered successfully!",
				description: data.message,
			});
			return router.reload();
		},
	});

	//Get the index of the role in the list
	const getIndex = (label: string, prevIndex: number) => {
		const index = membersList.data.members.findIndex(
			(member) => member.characterId === label.replace(" ", "_")
		);
		if (index === -1) return prevIndex;
		return index;
	};

	//Remove the leader character from the list of available roles
	const availableRoles = roles.filter(
		(roles) => roles.value !== LeaderCharacter
	);
	const router = useRouter();
	if (membersList.isLoading) return <div className="text-2xl">Loading...</div>;
	return (
		<Dialog defaultOpen={true}>
			<DialogTrigger asChild>
				<Button>Edit Team</Button>
			</DialogTrigger>
			<DialogContent className="overflow-y-scroll bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-gray-950/50 via-slate-900 to-black text-white">
				<DialogTitle>Character Details</DialogTitle>
				<DialogDescription>
					Enter details of the Teammates who will play respective
					Characters
				</DialogDescription>
				<div>
					<Accordion type="single" collapsible>
						{availableRoles.map((role, index) => (
							<AccordionItem key={index} value={`item-${index}`}>
								<AccordionTrigger>
									{role.label}
								</AccordionTrigger>
								<AccordionContent>
									<AccordianForm
										MembersArray={
											MembersArray.length > 7
												? MembersArray.filter(
														(member) =>
															member.characterId !==
															null
												  )
												: MembersArray
										}
										setMembersArray={setMembersArray}
										index={getIndex(role.label, index)}
										characterId={role.value}
									/>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
				<div className="m-auto flex gap-2">
					<Button onClick={() => setFormToShow(2)} size="sm">
						Back
					</Button>
					<AlertDialog>
						<AlertDialogTrigger
							disabled={
								availableRoles.length <=
								MembersArray.filter(
									(member) => member !== (undefined || null)
								).length
									? false
									: true
							}
						>
							<Button
								size="sm"
								disabled={
									availableRoles.length <=
									MembersArray.filter(
										(member) =>
											member !== (undefined || null)
									).length
										? false
										: true
								}
								onClick={() => {
									if (
										MembersArray.filter(
											(member) =>
												member !== (undefined || null)
										).length < availableRoles.length
									) {
										toast({
											variant: "destructive",
											title: "Team Incomplete!",
											description:
												"Please fill in details of all characters in your team.",
										});
									}
								}}
							>
								Submit
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									Are you absolutely sure?
								</AlertDialogTitle>
								<AlertDialogDescription>
									This action will register your team
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction
									disabled={registerMembers.isLoading}
									onClick={(e) => {
										e.preventDefault();
										console.log(MembersArray);
										registerMembers.mutate({
											members: z
												.array(
													z.object({
														name: z.string(),
														characterId: z.string(),
														idURL: z.string(),
													})
												)
												.parse(MembersArray),
											college_id: CollegeId,
										});
									}}
								>
									{registerMembers.isLoading
										? "Loading..."
										: "Continue"}
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</DialogContent>
		</Dialog>
	);
};
export default MemberReg;
