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

type Members = {
	name: string;
	character_id: string;
	id_url: string;
};

export default function AccordianForm({
	MembersArray,
	setMembersArray,
	index,
	character_id,
}: {
	MembersArray: Members[];
	setMembersArray: Dispatch<SetStateAction<Members[]>>;
	index: number;
	character_id: string;
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
		return true
	};

	const setTeamMember = async (
		character_id: string,
		character_index: number
	) => {
		const id_url = await handleUpload();
		//console.log(id_url);
		const data: Members = {
			name: teammateName,
			character_id: character_id,
			id_url: z.string().parse(id_url),
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
								Drop Image of your ID
							</FormLabel>
							<div className="grid grid-cols-3">
								<div className="col-span-3">
									<Dropzone
										files={files}
										setFiles={setFiles}
									/>
									{MembersArray[index]?.id_url && (
										<Image
											src={MembersArray[index]?.id_url}
											alt=""
											height={100}
											width={100}
										/>
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
								void setTeamMember(character_id, index);
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
							void setTeamMember(character_id, index);
						}}
					>
						Update
					</Button>
				)}
			</form>
		</Form>
	);
}
