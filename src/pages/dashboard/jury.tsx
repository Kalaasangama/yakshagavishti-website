import { useSession } from "next-auth/react";
import { api } from "../../utils/api";
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
import { NextPage } from "next";

const Jury : NextPage = () => {
	const { data: sessionData } = useSession();

    return (
        <div className="container px-20 pt-20">
					<h1 className="text-extrabold mt-10 text-2xl">
						Judge Dashboard
					</h1>
                    <div className="flex flex-row w-full">
                        <div className="justify-start">
                            <Button>Select the College Code</Button>
                        </div>
                        <div className="justify-end">
                            <Button>Remarks</Button>
                        </div>
                    </div>
        </div>
    )
}

export default Jury;