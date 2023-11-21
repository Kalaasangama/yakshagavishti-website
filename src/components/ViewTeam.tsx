import Image from "next/image";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "src/components/ui/table";
import { api } from "~/utils/api";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Button } from "src/components/ui/button";

export default function ViewTeam() {
	const teamData = api.team.getTeam.useQuery();
	const editRequest = api.team.requestEditAccess.useMutation({
			onSuccess() {
			    void teamData.refetch()
			},
			});
	return (
		teamData.isSuccess && (
			<Dialog>
				<DialogTrigger asChild>
					<Button className="">
						View Team
					</Button>
				</DialogTrigger>
				<DialogContent className="bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-gray-950/50 via-slate-900 to-black text-white sm:max-w-[425px] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="text-center text-xl">View Team</DialogTitle>
						<DialogDescription className="text-center">
							View your team details here.
						</DialogDescription>
					</DialogHeader>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">
									Name
								</TableHead>
								<TableHead className="w-[100px]">
									Character Played	
								</TableHead>
								<TableHead>ID</TableHead>
								<TableHead>Verification Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{teamData?.data?.members?.map((member, key) => (
								<TableRow key={key}>
									<TableCell className="font-semibold text-sm">
										{member.name}
									</TableCell>
									<TableCell className="font-semibold text-sm">
										{member.characterPlayed.character}
									</TableCell>
									<TableCell>
									<a href={member.idURL} target="_blank">
										{member.idURL && <Image
											src={member.idURL}
											alt="id_image"
											height={100}
											width={100}
											className="rounded border border-gray-800"
										/>}
										</a>
									</TableCell>
									<TableCell>
										{member.isIdVerified
											? <div className="flex flex-row gap-2"><span>Verified</span><span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" className="animate-pulse text-green-500 mt-0.5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"></path></svg></span></div>
											: "Pending"}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					{teamData?.data?.editRequests?.status==="REVOKED" || !teamData.data.editRequests ? <Button onClick={()=>editRequest.mutate()}>Request Edit</Button>:<p className="text-center">We will review and update you soon for edits</p>}
				</DialogContent>
			</Dialog>
		)
	);
}
