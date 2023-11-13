import React, { type Dispatch, type SetStateAction, useState } from "react";
import { Button } from "src/components/ui/button";
import { Form, FormField, FormLabel } from "src/components/ui/form";
import Dropzone from "../Dropzone";
import * as z from "zod";
import { useToast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import Image from "next/image";
import { uploadFile } from "~/utils/file";
import { IoCloseCircle } from "react-icons/io5";

type Members = {
	name: string;
	characterId: string;
	idURL: string;
};

export default function AccordianForm({
	MembersArray,
	setMembersArray,
	index,
	characterId,
}: {
	MembersArray: Members[];
	setMembersArray: Dispatch<SetStateAction<Members[]>>;
	index: number;
	characterId: string;
}) {
	const [teammateName, setTeammateName] = useState("");
	const [uploadStatus, setUploadStatus] = useState("");
	const [files, setFiles] = useState<(File & { preview: string })[]>([]);
	const { toast } = useToast();
	const form2 = useForm();
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
		return true;
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
			idURL: z.string().parse(idURL || MembersArray[index].idURL),
		};

		const array = [...MembersArray];
		array[character_index] = data;
		localStorage.setItem("members", JSON.stringify(array));
		setMembersArray(array);
		toast({
			variant: "default",
			title: "Teammate Added",
			description: "Teammate Added",
		});
		setTeammateName("");
		setFiles([]);
	};
	return (
		<Form {...form2}>
			<form className="space-y-1">
				<FormField
					control={form2.control}
					name="Role"
					render={() => (
						<div className="flex flex-col">
							<FormLabel className="my-4 text-white">
								Name of the team member
							</FormLabel>
							<Input
								id="Teammate_Name"
								placeholder="Teammate Name"
								className="col-span-3"
								type="text"
								defaultValue={MembersArray[index]?.name}
								onChange={(e) => {
									setTeammateName(e.target.value);
								}}
							/>
							<FormLabel className="mt-5 text-white">
								ID Card
							</FormLabel>
							<div className="grid grid-cols-3">
								<div className="col-span-3">
									{!MembersArray[index]?.idURL && (
										<Dropzone
											files={files}
											setFiles={setFiles}
										/>
									)}
									{MembersArray[index]?.idURL && (
										<div className="relative w-fit">
											<Image
												src={MembersArray[index]?.idURL}
												alt=""
												height={100}
												width={100}
											/>
											<IoCloseCircle
												className="absolute right-3 top-1 cursor-pointer text-xl text-red-600 md:text-2xl"
												onClick={() => {
													const members =
														MembersArray;
													members[index].idURL = "";
													setFiles([]);
													setMembersArray(members);
												}}
											/>
										</div>
									)}
								</div>
							</div>
						</div>
					)}
				/>
				{MembersArray[index] === undefined ? (
					<Button
						variant={"button"}
						onClick={(e) => {
							e.preventDefault();
							if (FieldValidation()) {
								void setTeamMember(characterId, index);
							}
						}}
					>
						Save
					</Button>
				) : (
					<Button
						variant={"button"}
						onClick={(e) => {
							e.preventDefault();
							void setTeamMember(characterId, index);
						}}
					>
						Update
					</Button>
				)}
			</form>
		</Form>
	);
}
