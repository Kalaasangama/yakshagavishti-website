import React, { useEffect, useState } from 'react'
import { api } from '~/utils/api'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button';

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
        if(team.data !== "Not submitted"){
            team.data?.map((data) => {
                const teamName = data.team.name;
                // If the teamID doesn't exist in the 'teamScores' object, initialize it
                if (!teamScores[teamName]) {
                    teamScores[teamName] = 0;
                }

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
        }
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
        const csvfile = col + row.join("\n");
        const blob = new Blob([csvfile], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `teams_results.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

    if(team.isLoading) return <div className='text-2xl text-center p-4 mb-[100vh]'>Loading....</div>
    if(team.data === "Not submitted") return <div className='text-2xl text-center p-4 mb-[100vh]'>All scores not submitted</div>
    return (
        <div className="mb-[100vh]">
         <Button className='my-3' onClick={e => downloadCSV()}>Download CSV</Button>
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
