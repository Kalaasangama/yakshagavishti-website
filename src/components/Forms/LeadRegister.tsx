"use client";

import React, { type Dispatch, type SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Button as RegButton } from "~/components/Button";
import { ImSpinner9 } from "react-icons/im";
import {
	Form,
	FormControl,
	FormDescription,
	FormItem,
	FormField,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import {
	DialogContent,
	DialogDescription,
	Dialog,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "src/components/ui/select";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";
import Dropzone from "../Dropzone";
import { toast } from "../ui/use-toast";
import { api } from "~/trpc/react";
import { uploadFile } from "~/utils/file";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { IoCloseCircle } from "react-icons/io5";

//TODO: Change the id values to the actual DB values
const roles = [
	{ label: "BHADRA_SENA", value: "cm8tr0d010000r9nmzp0gasfe" },
	{ label: "RATNAVATI", value: "cm8tr0g420001r9nmxecf4c4y" },
	{ label: "VATSYAKA", value: "cm8tr0krs0002r9nm424nl2pn" },
	{ label: "VIDYULOCHANA", value: "cm8tr0uvc0003r9nm1rn7o539" },
	{ label: "DHRADAVARMA", value: "cm8tr0uvc0004r9nm3bo3a4rs" },
	{ label: "DHRADAVARMA CHARAKA", value: "cm8tr0uvc0005r9nm1ilgoxn1" },
];

const LeadRegister = ({
	setFormToShow,
	college_id,
	setLeaderChar,
}: {
	college_id: string;
	setFormToShow: Dispatch<SetStateAction<number>>;
	setLeaderChar: Dispatch<SetStateAction<string>>;
}) => {
	const user = useSession();
	const [files, setFiles] = useState<(File & { preview: string })[]>([]);
	const [isCheckboxChecked, setIsCheckboxChecked] = useState(user.data?.user.characterId ? true : false);
	const [selectedRole, setSelectedRole] = useState<string>("");
	const [LeaderCharacter, setLeaderCharacter] = useState<string | null>(user.data?.user.characterId ?? null);
	const [LeaderContact, setLeaderContact] = useState<string>(
		user.data?.user.contact ?? ""
	);
	const [LeaderName, setLeaderName] = useState<string>(
		user.data?.user.name ?? ""
	);
	const [UploadStatus, setUploadStatus] = useState("");
	const SetLeaderDetails = api.team.register.useMutation({
		onError(error) {
			return toast({
				variant: "destructive",
				description: error.message,
			});
		},
		onSuccess(data) {
			return toast({
				variant: "default",
				title: "Team lead registered successfully!",
				description: data.message,
			});
		},
	});
	const form = useForm();
	const handleRoleChange = (value: string) => {
		setLeaderCharacter(value);
		setLeaderChar(value);
	};
	if (SetLeaderDetails.isSuccess) {
		setTimeout(() => { setFormToShow(3); }, 1000);
	}
	const handleUpload = async () => {
		setUploadStatus("Uploading....");
		try {
			if (user.data?.user.idURL) {
				return user.data.user.idURL;
			}
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
	//Field Validation for Team Lead
	const Passwordpattern = () => {
		const phoneregx = "^[6-9][0-9]{9}$";
		if (!new RegExp(phoneregx).exec(LeaderContact)) {
			toast({
				variant: "destructive",
				title: "Invalid Phone number!",
				description: "Check the entered phone number.",
			});
			return false;
		}
		if (isCheckboxChecked) {
			if (!LeaderCharacter) {
				toast({
					variant: "destructive",
					title: "No Character selected!",
					description: "Please select a Character.",
				});
				return false;
			}
		}
		if (!user.data?.user.idURL)
			if (files.length === 0) {
				toast({
					variant: "destructive",
					title: "No ID uploaded!",
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
		handleUpload()
			.then((idUrl) => {
				SetLeaderDetails.mutate({
					college_id,
					leader_character: LeaderCharacter,
					leader_name: LeaderName,
					leader_contact: LeaderContact,
					leader_idUrl: idUrl,
					members: [],
				});
			})
			.catch((err) => console.log(err));
	};
	return (
		<Dialog defaultOpen={true}>
			<DialogTrigger>
				<RegButton>Create Team</RegButton>
			</DialogTrigger>
			<DialogContent className="overflow-y-scroll bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-gray-950/50 via-slate-900 to-black text-white sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create Team</DialogTitle>
					<DialogDescription>
						Fill in the information below. Click next when you&apos;re
						done.
					</DialogDescription>
				</DialogHeader>
				<div className="grid">
					<Form {...form}>
						<form className="space-y-8 flex flex-col">
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<div className="flex flex-col space-y-4">
											<div className="grid w-full max-w-sm items-center gap-1.5">
												<Label htmlFor="phone">
													Leader Name
												</Label>
												<Input
													type="text"
													id="phone"
													placeholder="Enter your Name"
													className="col-span-3 text-black"
													defaultValue={LeaderName}
													onChange={(e) => {
														setLeaderName(
															e.target.value
														);
													}}
												/>
											</div>
											<div className="grid w-full max-w-sm items-center gap-1.5">
												<Label htmlFor="phone">
													Phone number
												</Label>
												<Input
													type="tel"
													id="phone"
													placeholder="Enter your Phone number"
													className="col-span-3 text-black"
													maxLength={10}
													minLength={10}
													defaultValue={LeaderContact}
													onChange={(e) => {
														setLeaderContact(
															e.target.value
														);
													}}
												/>
											</div>
										</div>

										<div className="grid grid-cols-3">
											{!user.data?.user.idURL ? (
												<div className="col-span-3">
													<Dropzone
														files={files}
														setFiles={setFiles}
													/>
												</div>
											) : (
												<div className="relative w-fit">
													<Image
														src={
															user.data.user.idURL
														}
														alt=""
														height={100}
														width={100}
													/>
													<IoCloseCircle
														className="absolute right-3 top-1 cursor-pointer text-xl text-red-600 md:text-2xl"
														onClick={() => {
															user.data.user.idURL =
																"";
														}}
													/>
												</div>
											)}
										</div>
										<div className="flex flex-row items-center gap-3">
											<div className="">
												<Checkbox
													name="character"
													id="character"
													className="bg-white"
													checked={isCheckboxChecked}
													onClick={() => {
														console.log(
															"Checkbox clicked"
														);
														if (isCheckboxChecked) {
															setSelectedRole("");
														}
														setIsCheckboxChecked(
															!isCheckboxChecked
														);
													}}
												/>
											</div>
											<div>
												<FormDescription className="mt-1 text-white">
													<label htmlFor="character">
														Do you have a Character
														in the play
													</label>
												</FormDescription>
											</div>
										</div>
										{isCheckboxChecked && (
											<React.Fragment>
												<FormLabel className="mt-4 text-white">
													Choose your Character
												</FormLabel>
												<Select
													onValueChange={
														handleRoleChange
													}
													defaultValue={
														LeaderCharacter ?? undefined
													}
												>
													<FormControl className="text-black">
														<SelectTrigger>
															<SelectValue placeholder="Select the Character" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{roles.map(
															(item, key) => {
																return (
																	<SelectItem
																		key={
																			key
																		}
																		value={
																			item.value
																		}
																	>
																		{
																			item.label
																		}
																	</SelectItem>
																);
															}
														)}
													</SelectContent>
												</Select>

												<FormMessage />
											</React.Fragment>
										)}
										<FormMessage />
									</FormItem>
								)}
							/>
							{UploadStatus === "Uploading...." ? (
								<Button
									type="submit"
									size="sm"
									className="w-[30%] self-center"
									disabled
								>
									<ImSpinner9 className="animate-spin" />
								</Button>
							) : (
							<Button
								type="submit"
								size="sm"
								className="bg-white text-black hover:bg-black hover:text-white cursor-pointer w-[30%] self-center"
								onClick={(e) => {
									e.preventDefault();
									Passwordpattern();
									// setLeaderRole();
								}}
							>
								Next
							</Button>)}
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
};
export default LeadRegister;
