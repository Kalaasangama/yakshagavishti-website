import { useSession } from "next-auth/react";
import { api } from "../utils/api";
import Image from "next/image";
import {
	Table,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
	TableHeader,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";

export default function Instagram() {
	const { data: sessionData } = useSession();
	const { data, refetch } = api.admin.getRegisteredTeams.useQuery();
	const verifyIdMutation = api.admin.verifyId.useMutation();
	const editTeamAccessMutation = api.admin.EditAccess.useMutation();
	function verifyId(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		const userId = (e.target as HTMLElement)?.dataset?.userid;
		if (userId)
			verifyIdMutation.mutate(
				{ userId: userId },
				{
					onSuccess: () => {
						refetch().catch((err) => console.log(err));
					},
					onError: (error) => {
						console.error(error);
						alert("Error reducing score");
					},
				}
			);
		else console.error("User ID is null or undefined");
	}
	function setEditAccess(team: string, action: "Grant" | "Revoke") {
		editTeamAccessMutation.mutate(
			{ team, action },
			{
				onError: (error) => {
					console.error(error);
					alert(error.message);
				},
			}
		);
	}

	if (sessionData?.user) {
		return (
			<>
				<div className="container px-20 pt-20">
					<h1 className="text-extrabold mt-10 text-2xl">
						Registered Teams
					</h1>
					{data?.map((element, key) => (
						<div key={key} className="my-10 rounded border px-20">
							<h1>Team: {element.name} </h1>
							{element.editRequests &&
								(element?.editRequests?.status === "PENDING" ? (
									<Button
										onClick={() =>
											setEditAccess(element.id, "Grant")
										}
									>
										Grant Edit Access
									</Button>
								) : (
									<Button
										onClick={() =>
											setEditAccess(element.id, "Revoke")
										}
									>
										Revoke Edit Access
									</Button>
								))}

							<h2>Members</h2>
							<Table className="my-10 border">
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>ID</TableHead>
										<TableHead className="text-right">
											Status
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{element.members.map((member, index) => {
										return (
											<TableRow key={index}>
												<TableCell className="font-medium">
													{member.name}
												</TableCell>
												<TableCell>
													<Image
														src={member.idURL}
														alt="ID"
														height={100}
														width={100}
													/>
												</TableCell>
												<TableCell className="text-right">
													{!member.isIdVerified ? (
														<button
															className="rounded border bg-black p-3 text-white"
															data-userid={
																member.id
															}
															onClick={(e) =>
																verifyId(e)
															}
														>
															Verify ID
														</button>
													) : (
														"Verified"
													)}
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</div>
					))}
				</div>
			</>
		);
	}
}
