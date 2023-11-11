import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "src/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormItem,
	FormField,
	FormLabel,
	FormMessage,
} from "src/components/ui/form";
import {
	DialogContent,
	DialogDescription,
	Dialog,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "src/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "src/components/ui/select";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import { Checkbox } from "../ui/checkbox";
import Dropzone from "../Dropzone";
import { toast } from "../ui/use-toast";
import { api } from "~/utils/api";
import { uploadFile } from "~/utils/file";

const roles = [
	{ label: "SHANTHANU", value: "cloe25kiq0000ileox49h4d1j" },
	{ label: "MANTRI SUNEETHI", value: "cloe265zk0002ileolpspexsb" },
	{ label: "TAAMRAAKSHA", value: "cloe27f110003ileorzfmoe05" },
	{ label: "TAMAALAKETHU", value: "cloe27f110004ileolbv67nnz" },
	{ label: "SATHYAVATHI", value: "cloe27f110005ileomce87hnz" },
	{ label: "DAASHARAJA", value: "cloe27f110006ileobsf7jpot" },
	{ label: "DEVAVRATHA", value: "cloe27f110007ileoc5l1vb44" },
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
	const [files, setFiles] = useState<(File & { preview: string })[]>([]);
	const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
	const [selectedRole, setSelectedRole] = useState<string>("");
	const [LeaderCharacter, setLeaderCharacter] = useState<string | null>(null);
	const [LeaderContact, setLeaderContact] = useState<string>("");
	const [teammateEmail, setTeammateEmail] = useState("");
	const [UploadStatus, setUploadStatus] = useState("");
	const SetLeaderDetails = api.team.register.useMutation();
	const form = useForm();
	const handleRoleChange = (value: string) => {
		setLeaderCharacter(value);
		setLeaderChar(value);
	};
	if (SetLeaderDetails.isSuccess) {
		setFormToShow(3);
	}
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
	//Field Validation for Team Lead
	const Passwordpattern = () => {
		const phoneregx = "^[6-9][0-9]{9}$";
			if (!LeaderContact.match(phoneregx)) {
				toast({
					variant: "destructive",
					title: "Invalid Phone number!",
					description: "Check the entered phone number",
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
			if (files.length === 0) {
				toast({
					variant: "destructive",
					title: "No ID uploaded!",
					description: "Please upload your ID.",
				});
				return false;
			}

			if(files.length > 1){
				toast({
					variant: "destructive",
					title: "Only one ID allowed!",
					description: "Please upload only one ID.",
				});
				return false;
			}
		}
		handleUpload()
			.then((idUrl) => {
				SetLeaderDetails.mutate({
					college_id,
					leader_character: LeaderCharacter,
					leader_contact: LeaderContact,
					leader_idUrl: idUrl,
					members: [],
				});
			})
			.catch((err) => console.log(err));
	};
	return (
		<Dialog defaultOpen={true}>
			<DialogTrigger asChild>
				<Button variant="outline">Create Team</Button>
			</DialogTrigger>
			<DialogContent className="bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-gray-950/50 via-slate-900 to-black text-white sm:max-w-[425px] overflow-y-scroll">
				<DialogHeader>
					<DialogTitle>Create Team</DialogTitle>
					<DialogDescription>
						Fill in the information below. Click next when you're
						done.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-2">
					<Form {...form}>
						<form className="space-y-8">
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<div className="flex flex-col">
											<div>
												<div className="grid w-full max-w-sm items-center gap-1.5">
												</div>
											</div>
												
											<div className="grid w-full max-w-sm items-center gap-1.5">
												
												<Label htmlFor="phone">
													Phone number
												</Label>
												<Input
													type="tel"
													id="phone"
													placeholder="Enter your Phone number"
													className="col-span-3"
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
											<FormLabel className="mt-8 text-white">
													Drop Image of your ID
												</FormLabel>
												<div className="grid grid-cols-3">
													<div className="col-span-3">
														<Dropzone
															files={files}
															setFiles={setFiles}
														/>
													</div>
												</div>
										</div>
										<div className="flex-cols flex gap-2">
											<div className="mt-1">
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
														LeaderCharacter
															? LeaderCharacter
															: undefined
													}
												>
													<FormControl>
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
							<Button
								type="submit"
								className="bg-white text-white hover:bg-gray-200"
								variant={"button"}
								onClick={(e) => {
									e.preventDefault();
									Passwordpattern();
									// setLeaderRole();
								}}
							>
								Next
							</Button>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
};
export default LeadRegister;
