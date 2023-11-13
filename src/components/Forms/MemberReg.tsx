import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "src/components/ui/button";
import { Form, FormField, FormLabel } from "src/components/ui/form";
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
import Dropzone from "../Dropzone";
import { api } from "~/utils/api";
import * as z from "zod";
import { useToast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import Image from "next/image";
import { uploadFile } from "~/utils/file";
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

	const [files, setFiles] = useState<(File & { preview: string })[]>([]);
	const [selectedRole, setSelectedRole] = useState<string>("");
	const [teammateName, setTeammateName] = useState("");
	const [MembersArray, setMembersArray] = useState<Members[]>(
		JSON.parse(localStorage.getItem("members")) || []
	);
	const [uploadStatus, setUploadStatus] = useState("");
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
	const FieldValidation = () => {
		if (teammateName === "") {
			toast({
				variant: "destructive",
				title: "Fill in all the details!",
				description: "Fill in all the fields.",
			});
			return false;
		}

		if (teammateName.length < 3) {
			toast({
				variant: "destructive",
				title: "Invalid Name!",
				description: "Name must be at least 3 characters.",
			});
			return false;
		}

		if (files.length === 0) {
			toast({
				variant: "destructive",
				title: "No ID Uploaded!",
				description: "Please upload your ID.",
			});
			return false;
		}

		if (files.length > 1) {
			toast({
				variant: "destructive",
				title: "Only one ID allowed!",
				description: "Please upload only one ID.",
			});
			return false;
		}

		return true;
	};
	const handleUpload = async () => {
		setUploadStatus("Uploading....");
		try {
			if (files[0] instanceof File) {
				const result = await uploadFile(files[0]);
				setUploadStatus("Upload Succesful");
				return result;
			}
		} catch (error) {
			console.log(error);
			setUploadStatus("Upload Failed...");
		}
	};
	const setTeamMember = async (
		characterId: string,
		character_index: number
	) => {
		const idURL = await handleUpload();
		//console.log(idURL);
		const data: Members = {
			name: teammateName,
			characterId: characterId,
			idURL: z.string().parse(idURL),
		};

		const array = [...MembersArray];
		array[character_index] = data;
		localStorage.setItem("members", JSON.stringify(array));
		setMembersArray(array);
		toast({
			variant: "default",
			title: "Teammate Added!",
			description: "You teammate has been added to your team.",
		});
		setTeammateName("");
		setSelectedRole("");
		setFiles([]);
		//console.log(data);
	};

	return (
		<Dialog defaultOpen={true}>
			<DialogTrigger asChild>
				<Button>Create Team</Button>
			</DialogTrigger>
			<DialogContent className="bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-gray-950/50 via-slate-900 to-black text-white overflow-y-scroll">
				<DialogTitle>Character Details</DialogTitle>
				<DialogDescription>
					Enter details of the Teammates who will play respective
					Characters
				</DialogDescription>
				<div>
					<Accordion type="single" collapsible>
						{availableRoles.map((role, index) => (
							<AccordionItem key={index} value={`item-${index}`}>
								<AccordionTrigger
									onClick={() => {
										const member = MembersArray[index];
										if (member) {
											setTeammateName(member.name);
										}
									}}
								>
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
					<Button onClick={()=>setFormToShow(2)} size="sm">Back</Button>
					<AlertDialog>
						<AlertDialogTrigger
							disabled={
								availableRoles.length === MembersArray.length
									? false
									: true
							}
						>
							<Button
							size="sm"
								disabled={
									availableRoles.length ===
									MembersArray.length
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
