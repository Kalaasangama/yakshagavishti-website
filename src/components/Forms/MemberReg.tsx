import React, { useState } from 'react'
import { Button } from "src/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "src/components/ui/form"
import {DialogContent, DialogDescription, Dialog, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from "src/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import Dropzone from '../Dropzone'
import { api } from '~/utils/api'
import * as z from "zod";
import { useToast } from '../ui/use-toast'
import { useForm } from "react-hook-form"
import { Input } from '../ui/input'
import Image from 'next/image'
import { uploadFile } from '~/utils/file'

const roles = [
	{ label: "SHANTHANU", value: "cloe25kiq0000ileox49h4d1j" },
	{ label: "MANTRI SUNEETHI", value: "cloe265zk0002ileolpspexsb" },
	{ label: "TAAMRAAKSHA", value: "cloe27f110003ileorzfmoe05" },
	{ label: "TAMAALAKETHU", value: "cloe27f110004ileolbv67nnz" },
	{ label: "SATHYAVATHI", value: "cloe27f110005ileomce87hnz" },
	{ label: "DAASHARAJA", value: "cloe27f110006ileobsf7jpot" },
	{ label: "DEVAVRATHA", value: "cloe27f110007ileoc5l1vb44" },
];

const availableRoles: {
	label: string;
	value: string;
}[] = roles;


type Members = {
	name: string;
	email: string;
	password: string;
	character_id: string;
	id_url: string;
};

const MemberReg = () => {
    const [files, setFiles] = useState<(File & { preview: string })[]>([]);
	const createTeam = api.team.register.useMutation();
	const [StateForm, setStateForm] = useState("firstform");
	const [selectedCollege, setSelectedCollege] = useState<string>("");
	const [selectedRole, setSelectedRole] = useState<string>("");
	const [LeaderContact, setLeaderContact] = useState<string>("");
	const [teammateName, setTeammateName] = useState("");
	const [teammateEmail, setTeammateEmail] = useState("");
	const [teamPassword, setTeamPassword] = useState("");
	const [TeammatePhone, setTeammatePhone] = useState("");
	const [LeaderCharacter, setLeaderCharacter] = useState<string | null>(null);
	const [LeaderIdUrl, setLeaderIdUrl] = useState("");
	const [MembersArray, setMembersArray] = useState<Members[]>([]);
	const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
	const [uploadStatus, setUploadStatus] = useState("");
	const { toast } = useToast();
	const form2 = useForm()
	const SubmitData = () => {
		const MemberInfo = {
			college_id: selectedCollege,
			leader_character: LeaderCharacter,
			leader_idUrl: LeaderIdUrl,
			leader_contact: LeaderContact,
			members: MembersArray,
			
		};

	}
	const FieldValidation = () => {
		const emailregx = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$";
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

		if(files.length===0){
			toast({
				variant: "destructive",
				title: "No ID Uploaded!",
				description: "Please upload your ID.",
			});
			return false;
		}
		return true
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
			character_id: string,
			character_index: number
		) => {
			console.log("asdfasdf")
			const id_url = await handleUpload();
			//console.log(id_url);
			const data: Members = {
				name: teammateName,
				email: teammateEmail,
				password: teamPassword,
				character_id: character_id,
				id_url: z.string().parse(id_url),
			};
	
			const array = [...MembersArray];
			array[character_index] = data;
			setMembersArray(array);
			toast({
				variant: "default",
				title: "Teammate Added",
				description: "Teammate Added",
			});
			setTeammateName("");
			setTeammateEmail("");
			setSelectedRole("");
			setTeammatePhone("");
			setFiles([]);
			//console.log(data);
		};

		const isMemberValid = (character_id: string, character_index: number) => {
			const array = MembersArray;
			let flags = true;
			console.log(array);
			console.log("running");
			array.some((obj) => {
				if (obj.email === teammateEmail) {
					toast({
						variant: "destructive",
						title: "Repeated Email ID",
						description: "Repeated Email ID",
					});
					flags = false;
				}
			});
			if (flags) {
				void setTeamMember(character_id, character_index);
			}
		};
  return (
	<Dialog>
	<DialogTrigger asChild>
        <Button variant="outline">Create Team</Button>
      </DialogTrigger>
						<DialogContent className='bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-gray-950/50 via-slate-900 to-black text-white'>
    <DialogTitle>Character Details</DialogTitle>	
						<DialogDescription>
							Enter Details of the Teammates Who will play
							recpective Characters
						</DialogDescription>
						<div>
							<Accordion type="single" collapsible>
								{availableRoles.map((role, index) => (
									<AccordionItem
										key={index}
										value={`item-${index}`}
									>
										<AccordionTrigger
											onClick={() => {
												const member =
													MembersArray[index];
												if (member) {
													setTeammateName(
														member.name
													);
													setTeammateEmail(
														member.email
													);
												}
											}}
										>
											{role.label}
										</AccordionTrigger>
										<AccordionContent>
											<Form {...form2}>
												<form className="space-y-1">
													<FormField
														control={form2.control}
														name="Role"
														render={() => (
															<div className="flex flex-col">
																<FormLabel className="my-4 text-white">
																	Name of the
																	team member
																</FormLabel>
																<Input
																	id="Teammate_Name"
																	placeholder="Teammate Name"
																	className="col-span-3"
																	type="text"
																	defaultValue={
																		MembersArray[
																			index
																		]?.name 
																	}
																	onChange={(e) => {
																		setTeammateName(e.target.value);
																		console.log(LeaderIdUrl);
																	}}
																/>
																<FormLabel className="mt-5 text-white">
																	Drop Image
																	of your ID
																</FormLabel>
																<div className="grid grid-cols-3">
																	<div className="col-span-3">
																		<Dropzone files={files} setFiles={setFiles}/>
																		{MembersArray[index]?.id_url && <Image src={MembersArray[index]?.id_url} alt=""
																		height={100} width={100}
																		/>}
																	</div>
																</div>
															</div>
														)}
													/>
													{MembersArray[index] ===
													undefined ? (
														<Button
															variant={"button"}
															onClick={(e) => {
																e.preventDefault();
																if (
																	FieldValidation()
																) {
																	const character_index =index;
																	console.log(character_index);
																	const Characterid: string =role.value;
																	e.preventDefault();
																	isMemberValid(Characterid,character_index);
																}
																console.log(MembersArray)
															}}
														>
															Save
														</Button>
													) : (
														<Button
															variant={"button"}
															onClick={(e) => {
																const character_index =
																	index;
																console.log(
																	character_index
																);
																const Characterid: string =
																	role.value;
																e.preventDefault();
																void setTeamMember(
																	Characterid,
																	character_index
																);
															}}
														>
															Update
														</Button>
													)}
												</form>
											</Form>
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						</div>
						<div className="m-auto flex gap-2">
							<Button onClick={() => setStateForm("firstform")}>
								Back
							</Button>
							<AlertDialog>
								<AlertDialogTrigger disabled={availableRoles.length===MembersArray.length?false:true}>
									<Button disabled={availableRoles.length===MembersArray.length?false:true}
										onClick={() => {
											if (
												MembersArray.length <
												availableRoles.length
											) {
												toast({
													variant: "destructive",
													title: "Team Incomplete",
													description:
														"Please fill in details of all characters in your team",
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
										<AlertDialogCancel>
											Cancel
										</AlertDialogCancel>
										<AlertDialogAction
											onClick={(e) => {
												e.preventDefault();
												SubmitData();
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
  )
}
export default MemberReg