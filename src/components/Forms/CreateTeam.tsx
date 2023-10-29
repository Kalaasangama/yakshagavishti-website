import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "src/components/ui/button";
import { Button as CustomButton } from "../Button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Checkbox } from "src/components/ui/checkbox";
import Dropzone from "../Dropzone";
import { uploadFile } from '~/utils/file';
import { FileRejection } from 'react-dropzone'
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
import Email from "next-auth/providers/email";
var roles = [
	{ label: "Bheema", value: "clo37yupl0001sh64avly34gu" },
	{ label: "Arjuna", value: "clo4llljw0000vjjshsy7w8e8" },
	{ label: "Yudhishtira", value: "clo37yupl0001sh64avly34gusd" },
	{ label: "Nakula", value: "clo37yupl0001sh64avly34guddf" },
	{ label: "Sahadeva", value: "clo37yupl0001sh64avly34gudfgg" },
	{ label: "Panchali", value: "clo37yupl0001sh64avly34gusdsgdg" },
	{ label: "Duriyodhana", value: "clo37yupl0001sh64avly34guxcxcx" }

];

var availableRoles: {
	label: string,
	value: string
}[] = roles;

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
	const [LeaderCharacter, setLeaderCharacter] = useState<string | null>(null);
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
			leader_character: LeaderCharacter,
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
	const FieldValidation = () => {
		let emailregx = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
		let phoneregx = "^[6-9][0-9]{9}$"
		if (teammateName === "" || TeammatePhone === "" || teammateEmail === "") {
			toast({
				variant: "destructive",
				title:
					"Fill All the details",
				description:
					"Fill All the fields",
			});
			return false

		}
		else if (!teammateEmail.match(emailregx)) {
			toast({
				variant: "destructive",
				title:
					"Invalid Email ID",
				description:
					"Invalid Email ID ",
			});
			return false
		}
		else if (!TeammatePhone.match(phoneregx)) {
			toast({
				variant: "destructive",
				title:
					"Invalid Phone number",
				description:
					"Check the Enter phone Number",
			});
			return false
		}
		return true
	}

	const setTeamMember = async (character_id: string, character_index: number) => {
		const id_url = await handleUpload(character_index)
		console.log(id_url)
		const data: Members = {
			name: teammateName,
			email: teammateEmail,
			password: teamPassword,
			phone: TeammatePhone,
			character_id: character_id,
			id_url: "id_url"
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
		const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
		if (selectedCollege) {
			if (teamPassword.match(passwordRegex)) {
				toast({
					variant: "default",
					title: "Details",
					description: `Please provide information about your teammates by clicking "Add" for each teammate and click "Add Teammate" when you have finished adding all the team members.`,
				});
				availableRoles = roles.filter(roles => roles.value !== LeaderCharacter)

				setStateForm("secondform");
			} else {
				toast({
					variant: "destructive",
					title:
						"Weak Password",
					description:
						"Password should contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number and atleast 1 special character ",
				});
			}

		}
		else {
			toast({
				variant: "destructive",
				title:
					"No college selected",
				description:
					"Please select a college!",
			});
			return false;
		}
	};

	const handleDelete = (index: any) => {
		setFiles((image) => image.filter((_, id) => id !== index))
	}


	const handleUpload = async (index: number) => {
		setUploadStatus("Uploading....")
		try {
			const result = await uploadFile(files[0])
			setUploadStatus("Upload Succesful");
			return result
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
		setLeaderCharacter(value);
		console.log(roles)
		console.log(value);
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="px-2 py-1 lg:px-4 2xl:px-6 lg:py-2 2xl:py-3 text-xs sm:text-xs md:text-sm lg:text-base 2xl:text-lg rounded-full font-semibold bg-gradient-to-br from-secondary-200 to-secondary-100 cursor-pointer align-middle hover:from-secondary-100 hover:to-secondary-200 active:scale-90 transition duration-150 ease-linear select-none">Create Team</div>
			</DialogTrigger>
			<DialogContent className="bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-red-900 via-neutral-900 to-purple-900 text-white font-mono lg:max-w-screen-lg overflow-y-scroll max-h-screen no-scrollbar">
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
										<FormItem className="flex flex-col text-black">
											<FormLabel className="mt-5 text-white">Choose your college</FormLabel>
											<Select onValueChange={handleCollegeChange} defaultValue={selectedCollege} >
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select the College your Team Belongs" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="clo37witw0000sh64c9n62www">nmamit</SelectItem>
													<SelectItem value="clo4ms7s30002vjjs7r9r9on1">SDPT First Grade College, Kateel</SelectItem>
													<SelectItem value="m@support.com1">Alvas College, Moodabidri</SelectItem>
													<SelectItem value="m@support.com13">Govinda Dasa Degree College,Suratkal</SelectItem>
													<SelectItem value="m@support.com12">SDM Law College, Mangalore</SelectItem>
												</SelectContent>
											</Select>
											<FormDescription>Select the College your Team Belongs</FormDescription>
											<FormLabel className="mt-4 text-white">Create a team password.</FormLabel>
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
											<FormDescription >Generate a password for your team.</FormDescription>
											<div className="flex flex-cols gap-2">
												<div className="mt-1">
													<Checkbox
														className="bg-white"
														checked={isCheckboxChecked}
														onClick={() => {
															console.log("Checkbox clicked");
															if (isCheckboxChecked) {
																setSelectedRole("")
															}
															setIsCheckboxChecked(!isCheckboxChecked);
														}}
													/>
												</div>
												<div className="mt-2">
													<FormDescription className="text-white mt-1" >Do you have a Character in the play</FormDescription>
												</div>
											</div>
											{isCheckboxChecked && (
												<React.Fragment>
													<FormLabel className="mt-4 text-white">Choose your Character</FormLabel>
													<Select onValueChange={handleRoleChange} defaultValue={LeaderCharacter ? LeaderCharacter : undefined}>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Select the Character" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{roles.map((item) => {
																return <SelectItem value={item.value}>{item.label}</SelectItem>
															})}
														</SelectContent>
													</Select>
													<FormDescription>Choose the Character you are Playing.</FormDescription>
													<FormLabel className="mt-5 text-white">Drop Image of your ID</FormLabel>
													<div className="grid grid-cols-3">
														<div className="col-span-3"><Dropzone files={files} setFiles={setFiles} /></div>
													</div>

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
								variant={"button"}
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
								{availableRoles.map((role, index) => (
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
												<form className="space-y-1" >
													<FormField
														control={form2.control}
														name="Role"
														render={({ field }) => (
															<div className="flex flex-col">
																<FormLabel className="my-4 text-white">Name of the team member</FormLabel>
																<Input
																	id="Teammate_Name"
																	placeholder="Teammate Name"
																	className="col-span-3"
																	type="text"
																	defaultValue={MembersArray[index]?.name}
																	onChange={(e) => {
																		setTeammateName(e.target.value)
																	}}
																/>
																<FormDescription>
																	Input the Name of your teammate.
																</FormDescription>
																<FormLabel className="my-4 text-white">Email address of the team member</FormLabel>
																<Input
																	id="Teammate_EmailID"
																	placeholder="Teammate EmailID"
																	className="col-span-3"
																	type="email"
																	defaultValue={MembersArray[index]?.email}
																	onChange={(e) => {
																		if (e)
																			setTeammateEmail(e.target.value)
																	}}
																/>
																<FormDescription>
																	Input the email addresses of your teammates.
																</FormDescription>
																<FormLabel className="my-4 text-white">Phone of the team member</FormLabel>
																<Input
																	id="Teammate_Phone"
																	placeholder="Teammate Phone"
																	className="col-span-3"
																	type="number"
																	maxLength={10}
																	minLength={10}
																	defaultValue={MembersArray[index]?.phone}
																	onChange={(e) => {
																		setTeammatePhone(e.target.value)
																	}}

																/>
																<FormDescription>
																	Input the Phone number of your teammate.
																</FormDescription>

																<FormLabel className="mt-5 text-white">Drop Image of your ID</FormLabel>
																<div className="grid grid-cols-3">
																	<div className="col-span-3"><Dropzone files={files} setFiles={setFiles} /></div>
																</div>

															</div>
														)}
													/>
													{MembersArray[index] === undefined ? <Button
														variant={"button"}
														onClick={(e) => {
															e.preventDefault();
															if (FieldValidation()) {
																let character_index = index
																console.log(character_index)
																let Characterid: string = role.value
																e.preventDefault();
																isMemberValid(Characterid, character_index);


															}
														}}
													>
														Save
													</Button> :
														<Button
															variant={"button"}
															onClick={(e) => {
																let character_index = index
																console.log(character_index)
																let Characterid: string = role.value
																e.preventDefault();
																setTeamMember(Characterid, character_index);

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
						<div className="flex gap-2 m-auto">
							<Button onClick={() => setStateForm("firstform")}>Back</Button>
							<AlertDialog>
								<AlertDialogTrigger disabled={MembersArray.length < availableRoles.length ? true : false}>
									<Button disabled={MembersArray.length < availableRoles.length ? true : false} onClick={() => {
										if (MembersArray.length < availableRoles.length) {
											toast({
												variant: "destructive",
												title:
													"Team Incomplete",
												description:
													"Please fill in details of all characters in your team",
											});
										}
									}}>Submit</Button>
								</AlertDialogTrigger>
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
						</div>
					</React.Fragment>
				)}
			</DialogContent>
		</Dialog >
	);
}