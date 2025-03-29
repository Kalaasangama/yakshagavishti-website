import React, { type Dispatch, type SetStateAction, useState } from "react";
import { Button } from "~/components/ui/button";
import { Button as RegButton } from "~/components/Button";
import {
	DialogContent,
	DialogDescription,
	Dialog,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion";
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
} from "~/components/ui/alert-dialog";
import { api } from "~/trpc/react";
import { useToast } from "~/components/ui/use-toast";
import { useRouter } from "next/navigation";
import AccordianForm from "~/components/Forms/AccordionForm";
import z from "zod";
import ViewBeforeSubmit from "~/components/ViewBeforeSubmit";
import { ImSpinner9 } from "react-icons/im";
//TODO: Change the id values to the actual DB values
const roles = [
	{ label: "BHADRASENA", value: "cm8udw5zf0000sbyqmhzt9tp3" },
	{ label: "RATNAAVATI", value: "cm8udw5zf0001sbyqrnjvaqwi" },
	{ label: "VATSAAKHYA", value: "cm8udw5zf0003sbyq2j7233pa" },
	{ label: "VIDYULLOCHANA", value: "cm8udw5zf0002sbyqv2ysgigo" },
	{ label: "DRUDHAVARMA", value: "cm8udw5zg0004sbyqruxg5u3q" },
	{ label: "DRUDHAVARMA CHAARAKA", value: "cm8udw5zg0005sbyqkklsoupz" },
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
	const membersList = api.team.getTeamForEdits.useQuery();
	const [MembersArray, setMembersArray] = useState<Members[]>(
		(() => {
			const storedMembers = localStorage.getItem("members");
			return storedMembers ? (JSON.parse(storedMembers) as Members[]) : [];
		})()
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
			return router.refresh();
		},
	});
	const getIndex = (label: string, prevIndex: number) => {
		const index = membersList?.data?.members.findIndex(
			(member) => member?.characterPlayed?.id === label.replace(" ", "_")
		);
		if (index === -1) return prevIndex;
		return index;
	};
	const availableRoles = roles.filter(
		(roles) => roles.value !== LeaderCharacter
	);
	const router = useRouter();
	if (membersList.isLoading) return <div>Loading...</div>;
	return (
		<Dialog defaultOpen={true}>
			<DialogTrigger>
				<RegButton>Create Team</RegButton>
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
										index={getIndex(role.label, index) ?? 0}
										characterId={role.value}
									/>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
				<div className="m-auto flex gap-2">
					<Button onClick={() => setFormToShow(2)} size="sm" className="cursor-pointer">
						Back
					</Button>
					<Button
						disabled={MembersArray.length > 0 ? false : true}
						onClick={() => {
							setMembersArray([]);
							localStorage.clear();
						}}
						className="cursor-pointer"
						size="sm"
					>
						Clear All
					</Button>
					<AlertDialog>
						<AlertDialogTrigger
							disabled={
								availableRoles.length <=
								MembersArray.filter(
									(member) => (member !== undefined) || (member !== null)
								).length
									? false
									: true
							}
						>
							<Button
								size="sm"
								className="cursor-pointer"
								disabled={
									availableRoles.length <=
									MembersArray.filter(
										(member) => (member !== undefined) || (member !== null)
									).length
										? false
										: true
								}
								onClick={() => {
									if (
										MembersArray.filter(
											(member) => (member !== undefined) || (member !== null)
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
								<AlertDialogTitle className="text-black">
									Are you absolutely sure?
								</AlertDialogTitle>
								<AlertDialogDescription>
									This action will register your team
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<ViewBeforeSubmit
									data={MembersArray}
									roles={availableRoles}
								/>
								<AlertDialogCancel className="text-black">Cancel</AlertDialogCancel>
								<AlertDialogAction
									disabled={registerMembers.isPending}
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
									{registerMembers.isPending
										? <ImSpinner9 className="animate-spin" />
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
