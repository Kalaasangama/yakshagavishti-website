import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../TeamTable";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import * as z from "zod";
import { api } from "~/utils/api";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const colleges = [
	{ label: "Nitte", value: "clmvm9how0004x93tht0gemlt" },
];

const roles = [
	{ label: "Ram", value: "cln0iguh70003x9dozn0p8q3v" },
	{ label: "Sham", value: "cln0iguh70003x9dozn0p8q3v" },
];

const FormSchema = z.object({
	College: z.string({
		required_error: "Please select a college.",
	}),
	islead: z.string().default("false").optional(),
	Role: z.string({
		required_error: "Please select a role.",
	}),
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
	college_id: string;
	character_id: string;
	isLead: boolean;
	phone: string;
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
	const createTeam = api.team.register.useMutation();
	const [StateForm, setStateForm] = useState("firstform");
	const [selectedCollege, setSelectedCollege] = useState("");
	const [selectedRole, setSelectedRole] = useState("");
	const [teammateName, setTeammateName] = useState("");
	const [teammateEmail, setTeammateEmail] = useState("");
	const [teamPassword, setTeamPassword] = useState("");
	const [TeammatePhone, setTeammatePhone] = useState("");
	const [MembersArray, setMembersArray] = useState<Members[]>([]);
	const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
	const [leademail, setLeadEmail] = useState("");
	const { toast } = useToast();
	const form1 = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});
	const form2 = useForm<z.infer<typeof FormSchema1>>({
		resolver: zodResolver(FormSchema1),
	});

	const SubmitData = () => {
		const MemberInfo = {
			teamName: teammateName,
			leadId: leademail,
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

	const setTeamMember = (character_id: string) => {
		const data: Members = {
			character_id: character_id,
			college_id: selectedCollege,
			email: teammateEmail,
			isLead: false,
			name: teammateName,
			password: teamPassword,
			phone: TeammatePhone
		};

		const array = [...MembersArray];
		array.push(data);
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

	const isMemberValid = (character_id: string) => {
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
			setTeamMember(character_id);
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
									name="College"
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<FormLabel className="mt-5">Choose your college</FormLabel>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant="ghost"
															role="combobox"
															className={cn(
																" justify-between",
																!field.value && "text-muted-foreground"
															)}
														>
															{field.value
																? colleges.find(
																	(college) => college.value === field.value
																)?.label
																: "Select College"}
															<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent className="w-[200px] p-0">
													<Command>
														<CommandInput
															placeholder="Search framework..."
															className="h-9"
														/>
														<CommandEmpty>No college found.</CommandEmpty>
														<CommandGroup>
															{colleges.map((college) => (
																<CommandItem
																	value={college.label}
																	key={college.value}
																	onSelect={() => {
																		form1.setValue("College", college.value);
																		setSelectedCollege(college.value);
																	}}
																>
																	{college.label}
																	<CheckIcon
																		className={cn(
																			"ml-auto h-4 w-4",
																			college.value === field.value
																				? "opacity-100"
																				: "opacity-0"
																		)}
																	/>
																</CommandItem>
															))}
														</CommandGroup>
													</Command>
												</PopoverContent>
											</Popover>
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
													<Popover>
														<PopoverTrigger asChild>
															<FormControl>
																<Button
																	variant="ghost"
																	role="combobox"
																	className={cn(
																		" justify-between",
																		!field.value && "text-muted-foreground"
																	)}
																>
																	{field.value
																		? roles.find((role) => role.value === field.value)?.label
																		: "Select Role"}
																	<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
																</Button>
															</FormControl>
														</PopoverTrigger>
														<PopoverContent className="w-[200px] p-0">
															<Command>
																<CommandInput placeholder="Search Character..." className="h-9" />
																<CommandEmpty>No Character found.</CommandEmpty>
																<CommandGroup>
																	{roles.map((role) => (
																		<CommandItem
																			value={role.label}
																			key={role.value}
																			onSelect={() => {
																				field.onChange(role.value);
																				setSelectedRole(role.value);
																			}}
																		>
																			{role.label}
																			<CheckIcon
																				className={cn(
																					"ml-auto h-4 w-4",
																					role.value === field.value ? "opacity-100" : "opacity-0"
																				)}
																			/>
																		</CommandItem>
																	))}
																</CommandGroup>
															</Command>
														</PopoverContent>
													</Popover>
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
							{roles.map((role, index) => (
								<Accordion key={index} type="single" collapsible>
									<AccordionItem value={`item-${index}`}>
										<AccordionTrigger>{role.label}</AccordionTrigger>
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
																	value={teammateName}
																	onChange={(e) => setTeammateName(e.target.value)}
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
																	value={teammateEmail}
																	onChange={(e) => setTeammateEmail(e.target.value)}
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
																	value={TeammatePhone}
																	onChange={(e) => {
																		setTeammatePhone(e.target.value)
																		setSelectedRole(role.label)
																	}}

																/>
																<FormDescription>
																	Input the Name of your teammate.
																</FormDescription>
															</div>
														)}
													/>
													<Button
														onClick={(e) => {
															let Characterid: string = role.value
															e.preventDefault();
															isMemberValid(Characterid);
														}}
													>
														Save
													</Button>
												</form>
											</Form>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							))}
						</div>
						<Button
							onClick={(e) => {
								e.preventDefault();
								SubmitData()
							}}
						>
							Submit
						</Button>
					</React.Fragment>
				)}
			</DialogContent>
		</Dialog>
	);
}
