import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../TeamTable";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm, Controller, set } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox"
import * as z from "zod";
import { api } from "~/utils/api";
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

const colleges: {
	label: string,
	value: string
}[] = [
		{ label: "Nitte", value: "clmvm9how0004x93tht0gemlt" },

	]

const roles: {
	label: string,
	value: string
}[] = [
		{ label: "Ram", value: "cln0iguh70003x9dozn0p8q3v" },

	]

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
	name: string,
	email: string,
	password: string,
	college_id: string,
	character_id: string,
	isLead: boolean,
};

export const columns: ColumnDef<Members>[] = [
	{
		accessorKey: "Name",
		header: "Name",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "Role",
		header: "Role",
	},
];

export function CreateTeamDialog() {
	const createTeam = api.team.register.useMutation();
	const [StateForm, setStateForm] = useState(false);
	const [selectedCollege, setSelectedCollege] = useState("");
	const [selectedRole, setSelectedRole] = useState("");
	const [teammateName, setTeammateName] = useState("");
	const [teammateEmail, setTeammateEmail] = useState("");
	const [teamPassword, setteamPassword] = useState("");
	const [MembersArray, setMembersArray] = useState<Members[]>([])
	const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
	const [leademail, setleademail] = useState("");
	const { toast } = useToast();
	const form1 = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			islead: "false",
		},
	});
	const form2 = useForm<z.infer<typeof FormSchema1>>({
		resolver: zodResolver(FormSchema1),
	});
	const Submitdata = () => {
		const MemberInfo = {
			teamName: teamName,
			leadId: "sdfsdfsdf",
			members:
				MembersArray
		}
		console.log(MemberInfo)
		createTeam.mutate(MemberInfo)
		toast({
			variant: "default",
			title: "Team has been Created",
			description:
				`Team has been Created. Continue to fill in the details of your Teammates.${teamName}, ${selectedCollege},${teamPassword}`,

			action: <ToastAction altText="Undo">Undo</ToastAction>,
		});
	}
	const setTeamMember = () => {
		const data: Members = {
			character_id: selectedRole,
			college_id: selectedCollege,
			email: teammateEmail,
			isLead: false,
			name: teammateName,
			password: teamPassword

		};

		const array = MembersArray
		array.push(data)
		setMembersArray(array)
		toast({
			variant: "default",
			title: "Teammate Added",
			description: "Teammate Added",
		});
		setTeammateName("");
		setTeammateEmail("");
		setSelectedRole("");

	};
	const isMemberValid = () => {
		const array = MembersArray
		var flags: boolean = true
		console.log(array)
		console.log("running")
		array.some((obj) => {
			if (obj.name == teammateName || obj.email == teammateEmail || obj.character_id == selectedRole) {
				console.log("running1")
				toast({
					variant: "destructive",
					title: "Reapeated Teammate",
					description: "Reapeated Teammate",
				});
				flags = false
			}
		})
		{ flags && setTeamMember() }
	}
	const Passwordpattern = () => {
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
		if (teamPassword.match(passwordRegex)) {
			setStateForm(true);
		}
		else {
			toast({
				variant: "destructive",
				title: "Password should contain atleast 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number",
				description: "Password should contain atleast 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number",
			});
			return false
		}
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Create Team</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				{StateForm ? (
					<React.Fragment>
						<DialogHeader>
							<DialogTitle>ADD MEMBERS</DialogTitle>
							<DialogDescription>
								Please provide information about your teammates by clicking "Add" for each teammate and click "Add Teammate" when you have finished adding all the team members.
							</DialogDescription>
						</DialogHeader>
						<Form {...form2}>
							<form className="space-y-4">
								<Controller
									name="Role"
									control={form2.control}
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<FormLabel className="mt-4">Name of the team member</FormLabel>
											<Input
												id="Teammate_Name"
												placeholder="Teammate_Name"
												className="col-span-3"
												type="text"
												value={teammateName}
												onChange={(e) => setTeammateName(e.target.value)}
											/>
											<FormDescription>
												Input the Name of your teammate.
											</FormDescription>
											<FormLabel className="mt-4">Email address of the team member</FormLabel>
											<Input
												id="Teammate_EmailID"
												placeholder="Teammate_EmailID"
												className="col-span-3"
												type="email"
												value={teammateEmail}
												onChange={(e) => setTeammateEmail(e.target.value)}
											/>
											<FormDescription>
												Input the email addresses of your teammates.
											</FormDescription>
											<FormLabel className="mt-4">Choose their role</FormLabel>
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
																? roles.find(
																	(role) => role.value === field.value
																)?.label
																: "Select Role"}
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
														<CommandEmpty>No roles found.</CommandEmpty>
														<CommandGroup>
															{roles.map((role) => (
																<CommandItem
																	value={role.label}
																	key={role.value}
																	onSelect={() => {
																		form2.setValue("Role", role.value);
																		setSelectedRole(role.value);
																	}}
																>
																	{role.label}
																	<CheckIcon
																		className={cn(
																			"ml-auto h-4 w-4",
																			role.value === field.value
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
											<FormDescription>
												Choose the role for your teammate.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</form>
						</Form>
						<DialogFooter>
							<Button
								onClick={(e) => {
									e.preventDefault();
									isMemberValid()
									form2.reset()
									console.log(MembersArray)
								}}
							>
								Add Teammate
							</Button>
							<Button
								onClick={(e) => {
									e.preventDefault();
									Submitdata()
								}}
							>
								Submit
							</Button>
						</DialogFooter>
					</React.Fragment>
				) : (
					<React.Fragment>
						<DialogHeader>
							<DialogTitle>Create Team</DialogTitle>
							<DialogDescription>
								Fill in the information below. Click on "Next" to continue.
							</DialogDescription>
						</DialogHeader>
						<Form {...form1}>
							<form className="space-y-6">
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
											<FormDescription>
												Select the College your Team Belongs
											</FormDescription>
											<FormLabel className="mt-4">Create a team password.</FormLabel>
											<Input
												id="Team_Password"
												placeholder="TeamPassword"
												className="col-span-3"
												type="text"
												onChange={(e) => {
													setteamPassword(e.target.value)

												}}
											/>
											<FormDescription>Generate a password for your team.</FormDescription>
											<div className="flex flex-cols gap-2">
												<div className="mt-1">
													<Checkbox
														checked={isCheckboxChecked}
														onClick={() => {
															console.log("Checkbox clicked");
															setIsCheckboxChecked(!isCheckboxChecked);
														}
														}
													/>
												</div>
												<div className="mt-3" >
													<FormDescription>
														Do you have a Character in the play
													</FormDescription>

												</div>

											</div>
											{isCheckboxChecked && <React.Fragment>

												<FormLabel className="mt-4">Choose their role</FormLabel>
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
																	? roles.find(
																		(role) => role.value === field.value
																	)?.label
																	: "Select Role"}
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
															<CommandEmpty>No roles found.</CommandEmpty>
															<CommandGroup>
																{roles.map((role) => (
																	<CommandItem
																		value={role.label}
																		key={role.value}
																		onSelect={() => {
																			form2.setValue("Role", role.value);
																			setSelectedRole(role.value);
																		}}
																	>
																		{role.label}
																		<CheckIcon
																			className={cn(
																				"ml-auto h-4 w-4",
																				role.value === field.value
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
												<FormDescription>
													Choose the role for your teammate.
												</FormDescription>
												<FormMessage />
											</React.Fragment>
											}
										</FormItem>
									)}
								/>
							</form>
						</Form>
						<DialogFooter>
							<Button
								onClick={(e) => {
									e.preventDefault();
									Passwordpattern()

								}}
							>
								Next
							</Button>
						</DialogFooter>
					</React.Fragment>
				)}
			</DialogContent>
		</Dialog>
	);
}


