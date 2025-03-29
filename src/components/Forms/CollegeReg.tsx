"use client";

import React, { type Dispatch, type SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Button as RegButton } from "~/components/Button";
import {
	Form,
	FormControl,
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
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { toast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
export default function CollegeReg({
	setFormToShow,
	setCollege,
}: {
	setFormToShow: Dispatch<SetStateAction<number>>;
	setCollege: Dispatch<SetStateAction<string>>;
}) {
	const [selectedCollege, setSelectedCollege] = useState<string>("");
	const [teamPassword, setTeamPassword] = useState("");
	const user = useSession()?.data?.user;
	const verifyPassword = api.team.checkPassword.useMutation({
		onError(error) {
			return toast({
				variant: "destructive",
				title: "Invalid Password!",
				description: error.message,
			});
		},
		onSuccess(data) {
			setCollege(selectedCollege);
			if (user?.teamEditStatus === "GRANTED") {
				return setFormToShow(4);
			}
			if (user?.leaderOf) {
				return setFormToShow(3);
			} else {
				return setFormToShow(2);
			}
			return toast({
				variant: "default",
				title: "College signed in successfully!",
				description: data?.message,
			});
		},
	});
	const form = useForm();
	const handleCollegeChange = (value: string) => {
		setSelectedCollege(value);
	};

	const Passwordpattern = () => {
		if (selectedCollege) {
			verifyPassword.mutate({
				college_id: selectedCollege,
				password: teamPassword,
			});
		} else {
			toast({
				variant: "destructive",
				title: "No college selected!",
				description: "Please select a college.",
			});
			return false;
		}
	};

	return (
		<div className="">
			<Dialog>
				<DialogTrigger>
					<RegButton>
						{user?.leaderOf ? "Edit Team" : "Create Team"}
					</RegButton>
				</DialogTrigger>
				<DialogContent className="bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-gray-950/50 via-slate-900 to-black text-white sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Create Team</DialogTitle>
						<DialogDescription>
							Fill in the information below. Click next when
							you&apos;re done.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<Form {...form}>
							<form className="space-y-8">
								<FormField
									control={form.control}
									name="username"
									render={() => (
										<FormItem>
											<FormLabel>
												Choose your College
											</FormLabel>
											<div className="flex flex-col gap-6">
												<div>
													<Select
														onValueChange={
															handleCollegeChange
														}
														defaultValue={
															selectedCollege
														}
													>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Select your college" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															<SelectItem value="cm8sqp3yi0000sbn69rhkk7v5">
																Alvas College,
																Moodabidri
															</SelectItem>
															<SelectItem value="clonw0pqq0000x9jhfb6la6qb">
																Dayanand Pai
																Satish Pai
																College
																Carstreet
															</SelectItem>
															<SelectItem value="clonw0pqs0003x9jh2nnf2v5v">
																Govinda Dasa
																Degree College,
																Suratkal
															</SelectItem>
															<SelectItem value="clo4ms7s30002vjjs7r9r9on1">
																SDM Law College,
																Mangalore
															</SelectItem>
															<SelectItem value="clonw0pqr0001x9jhhushh0ig">
																SDPT First Grade
																College, Kateelu
															</SelectItem>
														</SelectContent>
													</Select>
												</div>
												<div className="grid w-full max-w-sm items-center gap-1.5">
													<Label htmlFor="password">
														Enter team password
													</Label>
													<Input
														id="Team_Password"
														placeholder="Team Password"
														className="col-span-3"
														type="password"
														onChange={(e) => {
															setTeamPassword(
																e.target.value
															);
														}}
														value={teamPassword}
													/>
												</div>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
								{verifyPassword.isPending ? (
									<Button
										type="submit"
										size="sm"
										className="text-white"
										variant={"default"}

										disabled
									>
										Loading...
									</Button>
								) : (
									<Button
										type="submit"
										size="sm"
										className="bg-white text-white hover:bg-gray-200"
										variant={"default"}
										onClick={(e) => {
											e.preventDefault();
											Passwordpattern();
										}}
									>
										Next
									</Button>
								)}
							</form>
						</Form>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
