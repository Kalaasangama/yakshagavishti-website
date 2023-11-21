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
		const downloadcsvFile = () => {
		const downloadcsvFile = () => {
		// const col = ["College Name","Team Leader","Leader Contact","Team Members","Charcter Played"]
		const col = ["College Name","Team Leader","Leader Contact"].join(',') + '\n';
		
		const row = data?.map((element,key)=>{
			if(element.isComplete === true){
			const college = (element?.college?.name || "").replaceAll(","," ");
			
			const leader = (element?.leader.name || "").replaceAll(","," ");
			const leaderContact = (element?.leader?.contact + "\n" || "").replaceAll(","," ");
			const members = (element?.members.map((member)=>member.name + "," + member?.characterPlayed?.character + "\n").join(",") || "")
			const row = [college,leader,leaderContact,members].join(",")
			console.log(row);
			return row;
			}
		})

		const csvfile = col + row.join("\n");
		const blob = new Blob([csvfile], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.setAttribute("href", url);
		link.setAttribute("download", "data.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	
	}

		return (
			<>
				<div className="container px-20 pt-20">
					<div className="flex justify-center mt-20">
						
	
						<Button onClick={downloadcsvFile}>
							Download
						</Button>
					</div>

					<h1 className="text-extrabold mt-10 text-2xl">
						Registered Teams
					</h1>
					{data?.map((element, key) => (
						<div key={key} className="my-10 rounded border px-20">

							<h1>Team: {element.name} </h1>
							{element.editRequests &&
								(element?.editRequests?.status === ("PENDING" || "REVOKED") ? (
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
													{member.idURL && (
														<div className="w-60"><Image
															src={member.idURL}
															alt="ID"
															height={1000}
															width={500}
														/></div>
													)}
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
}