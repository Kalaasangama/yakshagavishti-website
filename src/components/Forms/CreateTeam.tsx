import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "src/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Checkbox } from "src/components/ui/checkbox";
import Dropzone from "../Dropzone";
import { uploadFile } from '~/utils/file';
import { FileRejection, useDropzone } from 'react-dropzone'
import * as z from "zod";
import { api } from "~/utils/api";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "src/components/ui/select"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "src/components/ui/accordion";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "src/components/ui/alert-dialog"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "src/components/ui/form";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "src/components/ui/dialog";
import { Input } from "src/components/ui/input";
import { ToastAction } from "src/components/ui/toast";
import { useToast } from "src/components/ui/use-toast";
const roles = [
	{ label: "Bheema", value: "clo37yupl0001sh64avly34gu" },
	{ label: "Arjuna", value: "clo37yupl0001sh64avly34gu" },
	{ label: "Yudhishtira", value: "clo37yupl0001sh64avly34gu" },
	{ label: "Nakula", value: "clo37yupl0001sh64avly34gu" },
	{ label: "Sahadeva", value: "clo37yupl0001sh64avly34gu" },
	{ label: "Panchali", value: "clo37yupl0001sh64avly34gu" },
	{ label: "Duriyodhana", value: "clo37yupl0001sh64avly34gu" }

];

interface DropzoneProps {
	// className: string;
	files: any[];
	setFiles: React.Dispatch<React.SetStateAction<any[]>>;
	// disabled: boolean;
}
const FormSchema = z.object({
	// College: z.string({
	// 	required_error: "Please select a college.",
	// }),
	islead: z.string().default("false").optional(),
	Role: z.string({
		required_error: "Please select a role.",
	}),
	college: z
		.string({
			required_error: "Please select an college to display.",
		})

});

const FormSchema1 = z.object({
	Role: z.string({
		required_error: "Please select a role.",
	}),
});

type Members = {
	name: string;
	email: string;
	password: string;
	character_id: string;
	phone: string;
	id_url: string
};

export const columns: ColumnDef<Members>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "character_id",
		header: "Role",
	},
];

export function CreateTeamDialog() {
	const [files, setFiles] = useState<File[]>([])
	const createTeam = api.team.register.useMutation();
	const [StateForm, setStateForm] = useState("firstform");
	const [selectedCollege, setSelectedCollege] = useState<string>('');
	const [selectedRole, setSelectedRole] = useState<string>('');
	const [teammateName, setTeammateName] = useState("");
	const [teammateEmail, setTeammateEmail] = useState("");
	const [teamPassword, setTeamPassword] = useState("");
	const [TeammatePhone, setTeammatePhone] = useState("");
	const [MembersArray, setMembersArray] = useState<Members[]>([]);
	const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
	const [rejected, setRejectedFiles] = useState<FileRejection[]>([]);
	const [uploadStatus, setUploadStatus] = useState("")
	const { toast } = useToast();
	const form1 = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});
	const form2 = useForm<z.infer<typeof FormSchema1>>({
		resolver: zodResolver(FormSchema1),
	});

	const SubmitData = () => {
		const MemberInfo = {
			college_id: selectedCollege,
			members: MembersArray,
		};
		console.log(MemberInfo);
		createTeam.mutate(MemberInfo);
		createTeam.data && toast({
			variant: "default",
			title: "Team has been Created",
			description: `Team has been Created. Continue to fill in the details of your Teammates, ${selectedCollege}, ${teamPassword}`,
			action: <ToastAction altText="Undo">Undo</ToastAction>,
		});
	};

	const setTeamMember = (character_id: string, character_index: number) => {
		const data: Members = {
			name: teammateName,
			email: teammateEmail,
			password: teamPassword,
			phone: TeammatePhone,
			character_id: character_id,
			id_url: "kjnkjn"
		};

		const array = [...MembersArray];
		array[character_index] = (data);
		setMembersArray(array);
		toast({
			variant: "default",
			title: "Teammate Added",
			description: "Teammate Added",
		});
		setTeammateName("");
		setTeammateEmail("");
		setSelectedRole("");
		setTeammatePhone("")
		console.log(MembersArray)
	};

	const isMemberValid = (character_id: string, character_index: number) => {
		const array = MembersArray;
		let flags = true;
		console.log(array);
		console.log("running");
		array.some((obj) => {
			if (obj.name === teammateName || obj.email === teammateEmail || obj.phone === TeammatePhone) {
				console.log("running1");
				toast({
					variant: "destructive",
					title: "Repeated Teammate",
					description: "Repeated Teammate",
				});
				flags = false;
			}
		});
		if (flags) {
			setTeamMember(character_id, character_index);
		}
	};

	const Passwordpattern = () => {
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
		if (teamPassword.match(passwordRegex)) {
			toast({
				variant: "default",
				title: "Details",
				description: `Please provide information about your teammates by clicking "Add" for each teammate and click "Add Teammate" when you have finished adding all the team members.`,
			});

			setStateForm("secondform");
		} else {
			toast({
				variant: "destructive",
				title:
					"Password should contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number",
				description:
					"Password should contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number",
			});
			return false;
		}
	};

	const handleDelete = (index: any) => {
		setFiles((image) => image.filter((_, id) => id !== index))
	}


	const handleUpload = async () => {
		setUploadStatus("Uploading....")
		try {
			files.forEach((file) => {
				console.log(uploadFile(file));
			})
			setUploadStatus("Upload Succesful");
		} catch (error) {
			console.log("imageUpload" + error)
			setUploadStatus("Upload Failed...");
		}

	}
	const handleCollegeChange = (value: string) => {
		setSelectedCollege(value);
		console.log(value);
	};
	const handleRoleChange = (value: string) => {
		setSelectedRole(value);
		console.log(value);
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Create Team</Button>
			</DialogTrigger>
			<DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-screen no-scrollbar">
				{StateForm === "firstform" && (
					<React.Fragment>
						<DialogHeader>
							<DialogTitle>Create Team</DialogTitle>
							<DialogDescription>
								Fill in the information below. Click on "Next" to continue.
							</DialogDescription>
						</DialogHeader>
						<Form {...form1}>
							<form className="space-y-3">
								<FormField
									control={form1.control}
									name="college"
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<FormLabel className="mt-5">Choose your college</FormLabel>
											<Select onValueChange={handleCollegeChange} defaultValue={selectedCollege}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select the College your Team Belongs" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="clo37witw0000sh64c9n62www">nmamit</SelectItem>
													<SelectItem value="m@google.com">SDPT First Grade College, Kateel</SelectItem>
													<SelectItem value="m@support.com1">Alvas College, Moodabidri</SelectItem>
													<SelectItem value="m@support.com13">Govinda Dasa Degree College,Suratkal</SelectItem>
													<SelectItem value="m@support.com12">SDM Law College, Mangalore</SelectItem>
												</SelectContent>
											</Select>
											<FormDescription>Select the College your Team Belongs</FormDescription>
											<FormLabel className="mt-4">Create a team password.</FormLabel>
											<Input
												id="Team_Password"
												placeholder="TeamPassword"
												className="col-span-3"
												type="text"
												onChange={(e) => {
													setTeamPassword(e.target.value);
												}}
												value={teamPassword}
											/>
											<FormDescription>Generate a password for your team.</FormDescription>
											<div className="flex flex-cols gap-2">
												<div className="mt-2">
													<Checkbox
														checked={isCheckboxChecked}
														onClick={() => {
															console.log("Checkbox clicked");
															setIsCheckboxChecked(!isCheckboxChecked);
														}}
													/>
												</div>
												<div className="mt-2">
													<FormDescription>Do you have a Character in the play</FormDescription>
												</div>
											</div>
											{isCheckboxChecked && (
												<React.Fragment>
													<FormLabel className="mt-4">Choose your Character</FormLabel>
													<Select onValueChange={handleRoleChange} defaultValue={selectedRole}>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Select the Character" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															<SelectItem value="m@example.com">d</SelectItem>
															<SelectItem value="m@google.com">dd</SelectItem>
															<SelectItem value="m@support2.com">d</SelectItem>
															<SelectItem value="m@support.1com">s</SelectItem>
															<SelectItem value="m@suppor3t.com">s</SelectItem>
														</SelectContent>
													</Select>
													<FormDescription>Choose the Character you are Playing.</FormDescription>
													<FormMessage />
												</React.Fragment>
											)}
										</FormItem>
									)}
								/>
							</form>
						</Form>
						<DialogFooter>
							<Button
								onClick={(e) => {
									e.preventDefault();
									Passwordpattern();
								}}
							>
								Next
							</Button>
						</DialogFooter>
					</React.Fragment>
				)}
				{StateForm === "secondform" && (
					<React.Fragment>
						<DialogTitle>Character Details</DialogTitle>
						<DialogDescription>
							Enter Details of the Teammates Who will play recpective Characters
						</DialogDescription>
						<div>
							<Accordion type="single" collapsible>
								{roles.map((role, index) => (
									<AccordionItem key={index} value={`item-${index}`}>
										<AccordionTrigger onClick={() => {
											const member = MembersArray[index]
											if (member) {
												setTeammateName(member.name)
												setTeammateEmail(member.email)
												setTeammatePhone(member.phone)
											}
										}}>{role.label}</AccordionTrigger>
										<AccordionContent>
											<Form {...form2}>
												<form className="space-y-1">
													<FormField
														control={form2.control}
														name="Role"
														render={({ field }) => (
															<div className="flex flex-col">
																<FormLabel className="my-4">Name of the team member</FormLabel>
																<Input
																	id="Teammate_Name"
																	placeholder="Teammate Name"
																	className="col-span-3"
																	type="text"
																	defaultValue={teammateName}
																	onChange={(e) => {
																		setTeammateName(e.target.value)
																	}}
																/>
																<FormDescription>
																	Input the Name of your teammate.
																</FormDescription>
																<FormLabel className="my-4">Email address of the team member</FormLabel>
																<Input
																	id="Teammate_EmailID"
																	placeholder="Teammate EmailID"
																	className="col-span-3"
																	type="email"
																	defaultValue={teammateEmail}
																	onChange={(e) => {
																		if (e)
																			setTeammateEmail(e.target.value)
																	}}
																/>
																<FormDescription>
																	Input the email addresses of your teammates.
																</FormDescription>
																<FormLabel className="my-4">Phone of the team member</FormLabel>
																<Input
																	id="Teammate_Phone"
																	placeholder="Teammate Phone"
																	className="col-span-3"
																	type="tel"
																	defaultValue={TeammatePhone}
																	onChange={(e) => {
																		setTeammatePhone(e.target.value)
																	}}

																/>
																<FormDescription>
																	Input the Phone number of your teammate.
																</FormDescription>

																<div className="grid grid-cols-3">
																	<div className="col-span-3"><Dropzone files={files} setFiles={setFiles} /></div>
																</div>

															</div>
														)}
													/>
													{MembersArray[index] === undefined ? <Button
														onClick={(e) => {
															let character_index = index
															console.log(character_index)
															let Characterid: string = role.value
															e.preventDefault();
															isMemberValid(Characterid, character_index);
														}}
													>
														Save
													</Button> :
														<Button onClick={(e) => {
															let character_index = index
															console.log(character_index)
															let Characterid: string = role.value
															e.preventDefault();
															setTeamMember(Characterid, character_index);
															handleUpload()
														}}
														>
															Update
														</Button>}
												</form>
											</Form>
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						</div>
						<AlertDialog>
							<AlertDialogTrigger><Button>Submit</Button></AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
									<AlertDialogDescription>
										This action will register your team
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction onClick={(e) => {
										e.preventDefault();
										SubmitData()
									}}>Continue</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</React.Fragment>
				)}
			</DialogContent>
		</Dialog >
	);
}