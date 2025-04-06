"use client";

import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import Image from "next/image";
import {
    Table,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    TableHeader,
} from "~/components/ui/table";
import { Switch } from "~/components/ui/switch";
import { Button } from "~/components/ui/button";
import { ImSpinner9 } from "react-icons/im";
import { useState } from "react";
import { Role } from "@prisma/client";
import { notFound } from "next/navigation";

export default function Admin() {
    const [verifyingId, setVerifyingId] = useState<string>("")

    const { data: sessionData } = useSession();
    const { data, refetch } = api.admin.getRegisteredTeams.useQuery();
    const verifyIdMutation = api.admin.verifyId.useMutation();
    const editTeamAccessMutation = api.admin.EditAccess.useMutation();

    function verifyId(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const userId = (e.target as HTMLElement)?.dataset?.userid;
        if (userId) {
            setVerifyingId(userId);
            verifyIdMutation.mutate(
                { userId: userId },
                {
                    onSuccess: () => {
                        setVerifyingId("");
                        refetch().catch((err) => console.log(err));
                    },
                    onError: (error) => {
                        setVerifyingId("");
                        console.error(error);
                        alert("Error reducing score");
                    },
                }
            );
        } else console.error("User ID is null or undefined");
    }
    function setEditAccess(team: string) {
        editTeamAccessMutation.mutate(
            { team },
            {
                onSuccess: () => {
                    refetch().catch((err) => console.log(err));
                },
                onError: (error) => {
                    console.error(error);
                    alert(error.message);
                },
            }
        );
    }

    if (!sessionData?.user || sessionData?.user.role !== "ADMIN")
          return notFound();

    if (sessionData?.user) {
        
        const downloadcsvFile = () => {
        // const col = ["College Name","Team Leader","Leader Contact","Team Members","Charcter Played"]
            const col = ["College Name","Team Leader","Leader Contact","Team Member","Character"].join(',') + '\n';
            
            const row = data?.map((element)=>{
                if(element.isComplete === true){
                const college = (element.College?.name ?? "").replaceAll(","," ");
                
                const leader = (element.Leader?.name ?? "").replaceAll(","," ");
                const leaderContact = (element?.TeamMembers.find(member => member.contact !== null)?.contact + "\n" || "").replaceAll(","," ");
                const members = (element?.TeamMembers.map((member)=>"," + "," +  member.name + "," + member?.Character?.character ? member?.Character?.character:"" + "\n").join(",") || "")
                const row = [college,leader,leaderContact,members].join(",")
                console.log(row);
                return row;
                }
            })

            const csvfile = col + (row?.join("\n") ?? "");
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
                        
    
                        <Button onClick={downloadcsvFile} className="bg-white text-black hover:bg-slate-300 cursor-pointer">
                            Download
                        </Button>
                    </div>

                    <h1 className="text-extrabold mt-10 text-3xl">
                        Registered Teams
                    </h1>
                    {data?.map((element, key) => (
                        <div key={key} className="my-10 px-20">
                            <div className="flex w-full justify-between items-center">
                                <h1 className="text-2xl">Team: {element.name} </h1>
                                {element.editRequested && <div className="flex items-center gap-2">
                                    <label htmlFor={`edit-access-${element.id}`} className="text-xl">
                                        Edit Access
                                    </label>
                                    <Switch
                                        checked={element.editRequested && !element.isComplete} // you'll need this boolean value from backend
                                        onCheckedChange={() => setEditAccess(element.id)}
                                        id={`edit-access-${element.id}`}
                                        className="data-[state=checked]:bg-blue-900 bg-gray-200 peer h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors"
                                    />
                                </div>}
                            </div>
                            <Table className="my-5 border">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Character</TableHead>
                                        <TableHead className="text-center">ID</TableHead>
                                        <TableHead className="text-right">
                                            Status
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {element.TeamMembers.map((member, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell className="font-medium">
                                                    {member.name}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {member?.Character?.character}
                                                </TableCell>
                                                <TableCell>
                                                    {member.idURL && (
                                                        <div className="w-60 self-center flex justify-self-center justify-center"><Image
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
                                                            {(verifyingId === member.id && verifyIdMutation.isPending) ? <ImSpinner9 className="animate-spin" /> : "Verify ID"}
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
