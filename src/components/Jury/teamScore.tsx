import React, { useEffect, useState } from 'react'
import { api } from '~/trpc/react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Button } from '~/components/ui/button';

function TeamScore() {
    type TeamScores = Record<string, number>;

    type TeamDisplay =  {
        teamName: string;
        totalScore: number;
    }[]

    const team = api.admin.getTeamScore.useQuery();
    const [total,setTotal] = useState<TeamDisplay>();

    useEffect(() => {
        const teamScores : TeamScores  = {};
            team.data?.map((data) => {
                const teamName = data.team.name;
                // If the teamID doesn't exist in the 'teamScores' object, initialize it
                teamScores[teamName] ??= 0;

                // Add the score to the total for the team
                teamScores[teamName] += data.score;
            });
            // Convert 'teamScores' object into an array of objects
            const sortedTeams = Object.entries(teamScores).map(([teamName, totalScore]) => ({
                teamName: teamName,
                totalScore: totalScore
            }));

            // Sort the teams based on total scores in descending order
            sortedTeams.sort((a , b) => b.totalScore - a.totalScore);

            setTotal(sortedTeams)
    },[team.data])

    const downloadCSV = () => {
        const array:string[] = ["Ranking", "Team Name", "Team Score"];
        const col = array.join(',') + '\n';
        const row = total?.map((team,i) => {  
            const row = [
                i+1,
                team.teamName,
                team.totalScore
            ]
              return row;
            })
        const csvfile = col + (row?.join("\n") ?? "");
        const blob = new Blob([csvfile], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `teams_results.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      const check = api.admin.checkIfAllSubmitted.useQuery();

    if(team.isLoading) return <div className='text-2xl text-center p-4 mb-[100vh]'>Loading....</div>
    return (
        <div className="mb-[100vh]">
            <div className='flex flex-row gap-[56vw]'>
                <Button className='my-3 flex basis-1/2 justify-start' onClick={downloadCSV}>Download CSV</Button>
                <div className={`rounded-3xl basis-1/2 text-center flex items-center px-3 py-1 my-3 text-2xl justify-center ${check.data === "Not submitted" ? "bg-red-800":"bg-green-800"}`}>{`${check.data === "Not submitted" ? "Not Submitted":"Submitted"}`}</div>
            </div>
            <Table className='text-2xl'>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">
                            Ranking
                        </TableHead>
                        <TableHead className="text-center">
                            Team Name
                        </TableHead>
                        <TableHead className="text-center">
                            Team Score
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {total?.map((team,i) => (
                        <TableRow key={i}>
                            <TableCell className="text-center">
                                {i+1}
                            </TableCell>
                            <TableCell className="text-center">
                                {team.teamName}
                            </TableCell>
                            <TableCell className="text-center">
                                {team.totalScore}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default TeamScore
