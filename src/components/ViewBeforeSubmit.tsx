import Image from "next/image";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";

type Members = {
	name: string;
	characterId: string;
	idURL: string;
};
export default function ViewBeforeSubmit({data, roles}:{data:Members[], roles:{value:string, label:string}[]}) {
	return (
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
									Character
								</TableHead>
								<TableHead>ID</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.map((member, key) => (
								<TableRow key={key}>
									<TableCell className="font-semibold text-sm">
										{member.name}
									</TableCell>
									<TableCell className="font-semibold text-sm">
										{roles.find(role => role.value === member.characterId)?.label ?? "Unknown"}
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
								</TableRow>
							))}
						</TableBody>
					</Table>
				</DialogContent>
			</Dialog>
	);
}
