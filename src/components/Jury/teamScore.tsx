import React, { useEffect, useState } from 'react'
import { api } from '~/utils/api'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

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

    if(team.isLoading) return <div className='text-2xl text-center p-4 mb-[100vh]'>Loading....</div>
    if(team.data === "Not submitted") return <div className='text-2xl text-center p-4 mb-[100vh]'>All scores not submitted</div>
    return (
        <div className="mb-[100vh]">
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
