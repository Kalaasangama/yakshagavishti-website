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
import { Button } from "./ui/button";

export default function ViewTeam() {
	const teamData = api.team.getTeam.useQuery();
	const editRequest = api.team.requestEditAccess.useMutation({
			onSuccess() {
			    void teamData.refetch()
			},
			});
	return (
		!teamData.isLoading && (
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="outline" className="">
						View Team
					</Button>
				</DialogTrigger>
				<DialogContent className="bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-gray-950/50 via-slate-900 to-black text-white sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle className="text-center">View Team</DialogTitle>
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
								<TableHead>ID</TableHead>
								<TableHead>Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{teamData?.data?.members?.map((member, key) => (
								<TableRow key={key}>
									<TableCell className="font-medium">
										{member.name}
									</TableCell>
									<TableCell>
									<a href={member.idURL}>
										<Image
											src={member.idURL}
											alt="id_image"
											height={100}
											width={100}
										/>
										</a>
									</TableCell>
									<TableCell>
										{member.isIdVerified
											? "Verified"
											: "Pending"}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					{teamData?.data?.editRequests.status==="REVOKED" ? <Button onClick={()=>editRequest.mutate()}>Request Edit</Button>:<p className="text-center">We will review and update you soon for edits</p>}
				</DialogContent>
			</Dialog>
		)
	);
}
