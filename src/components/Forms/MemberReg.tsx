import React, { Dispatch, SetStateAction, useState } from "react";
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
	const [MembersArray, setMembersArray] = useState<Members[]>(
		JSON.parse(localStorage.getItem("members")) || []
	);
	const { toast } = useToast();

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

	const availableRoles = roles.filter(
		(roles) => roles.value !== LeaderCharacter
	);
	const router = useRouter();
	return (
		<Dialog defaultOpen={true}>
			<DialogTrigger asChild>
				<Button>Create Team</Button>
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
										MembersArray={MembersArray}
										setMembersArray={setMembersArray}
										index={index}
										characterId={role.value}
									/>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
				<div className="m-auto flex gap-2">
					<Button onClick={() => setFormToShow(2)} size="sm">Back</Button>
					<AlertDialog>
						<AlertDialogTrigger
							disabled={
								availableRoles.length ===
								MembersArray.filter(
									(member) => member !== undefined || null
								).length
									? false
									: true
							}
						>
							<Button
							size="sm"
								disabled={
									availableRoles.length ===
									MembersArray.filter(
										(member) => member !== undefined || null
									).length
										? false
										: true
								}
								onClick={() => {
									if (
										MembersArray.length <
										availableRoles.length
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
									onClick={(e) => {
										e.preventDefault();
										registerMembers.mutate({
											members: MembersArray,
											college_id: CollegeId,
										});
									}}
								>
									Continue
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
