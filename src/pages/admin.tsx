import { useSession } from "next-auth/react";
import { api } from "../utils/api";
import Image from "next/image";

export default function Instagram() {
	const { data: sessionData } = useSession();
	const { data, refetch } = api.admin.getRegisteredTeams.useQuery();
	const verifyIdMutation = api.admin.verifyId.useMutation();
	const editTeamAccessMutation = api.admin.grantEditAccess.useMutation();
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
	function setEditAccess(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		action: "Grant" | "Revoke"
	) {
		const teamName = (e.target as HTMLElement)?.dataset?.teamname;
		if (teamName)
			editTeamAccessMutation.mutate(
				{ teamName: teamName, action },
				{
					onError: (error) => {
						console.error(error);
						alert("Error reducing score");
					},
				}
			);
		else console.error("User ID is null or undefined");
	}
	if (sessionData?.user) {
		return (
			<>
				<h1 className="mt-20 text-center text-2xl">Admin Dashboard</h1>
				<div className="m-auto w-fit">
					<h1 className="text-extrabold mt-10 text-2xl">
						Registered Teams
					</h1>
					{data?.map((element, key) => {
						return (
							<div key={key}>
								<h3 className="border p-5">
									Team: {element.name}
								</h3>
								<h3 className="border p-5">Members</h3>
								<table className="border">
									<thead>
										<th className="border p-3">Name</th>
										<th className="border p-3">ID Card</th>
									</thead>
									<tbody>
										{element.members.map(
											(member, index) => {
												return (
													<tr key={index}>
														<td className="border p-5">
															{member.name}
														</td>
														<td className="border p-5">
															<a
																href={
																	member.idURL
																		? member.idURL
																		: ""
																}
															>
																<Image
																	src={
																		member.idURL
																			? member.idURL
																			: ""
																	}
																	alt="Id Image"
																	width={100}
																	height={100}
																/>
															</a>
														</td>

														<td
															data-userid={
																element.id
															}
															className="border p-5"
														>
															{!member.isIdVerified ? (
																<button
																	className="rounded border bg-black p-3 text-white"
																	data-userid={
																		member.id
																	}
																	onClick={(
																		e
																	) =>
																		verifyId(
																			e
																		)
																	}
																>
																	Verify ID
																</button>
															) : (
																"Verified"
															)}
														</td>
													</tr>
												);
											}
										)}
									</tbody>
								</table>
							</div>
						);
					})}
				</div>
			</>
		);
	}
}
