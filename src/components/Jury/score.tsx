import { Characters } from '@prisma/client';
import React, { useEffect, useState } from 'react'
import { api } from '~/utils/api'
import { Table,TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';

function Score() {
  type TotalScores = {
    [character in Characters]: Record<string, number>;
  };

  type Team = Record<string, string>;

  const characters : Characters[] = [
    "SHANTHANU",
    "MANTRI_SUNEETHI",
    "TAMAALAKETHU",
    "TAAMRAAKSHA",
    "SATHYAVATHI",
    "DAASHARAJA",
    "DEVAVRATHA",
  ];

  const initialScores: TotalScores = {} as TotalScores;

  characters.forEach((character) => {
    initialScores[character] = {};
  });

  const [teamId, setTeamId] = useState<string>("")
  const [characterName, setCharacter] = useState<Characters>("DAASHARAJA");
  const results = api.admin.getResults.useQuery();
  const name = api.admin.getName;
  const [totalScores, setTotalScores] = useState<TotalScores>(initialScores);
  const [teams, setTeams] = useState<Team>({})

  useEffect(() => {
    // Initialize an object to store the total scores for each character from each team
    const newTotalScores = initialScores;

    // Initialize an array to store unique team names
    const uniqueTeams = {};
    if(results.data !== "Not submitted"){
      // Loop through each result
      results.data?.forEach(result => {
        const team: string = result.team.name;
        const character: Characters = result.characterPlayed.character;
        const score: number = result.score;

        // If the characterID is not already in the team's scores, initialize it
        if (!newTotalScores[character]) {
          newTotalScores[character] = {};
        }

        // If the teamID is not already in the totalScores object, initialize it
        if (!newTotalScores[character][team]) {
          newTotalScores[character][team] = 0;
          if(!uniqueTeams[team]){
            uniqueTeams[team] = result.teamID; 
          }
        }

        // Add the score to the total for the character
        newTotalScores[character][team] += score;
      });
      
      // Sort the inner teams in descending order for each character
      for (const [character, teams] of Object.entries(newTotalScores)) {
        // Sort teams for each character
        const sortedTeams = Object.fromEntries(
            Object.entries(teams).sort(([, a], [, b]) => b - a)
        );
        newTotalScores[character] = sortedTeams;
    }
      // Update the state with the new total scores
      setTotalScores(newTotalScores);
      setTeams(uniqueTeams);
  }
  }, [results.data]);

  // const getName = (teamId: string, character: Characters) => {
  //   if(teamId !== '')
  //     name.useQuery({
  //       character: character,
  //       teamId:teamId
  //     })
  //   return "Aaron";
  // }
  const downloadCSV = () => {
    const array:string[] = ["Character Name", "Ranking", "Team Name", "Played By", "Score"];
    const col = array.join(',') + '\n';
    const row = characters.map((character) => {
          const row = Object.keys(totalScores[character]).map((team,i) => {
            const row = [
              character,
              i+1,
              team,
              character,
              totalScores[character][team]
            ]
            return row.join(',');
          })
          return row.join('\n');
        })
    const csvfile = col + row.join("\n");
    const blob = new Blob([csvfile], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `character_results.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if(results.isLoading) return <div className='text-2xl text-center p-4 mb-[100vh]'>Loading....</div>
  if(results.data === "Not submitted") return <div className='text-2xl text-center p-4 mb-[100vh]'>All scores not submitted</div>  

  return results.isLoading ? (
    <div>
        All judges have not submitted the score...
    </div>
    )
    :(
    <div>
      <Button className='my-3' onClick={e => downloadCSV()}>Download CSV</Button>
      {characters.map((character,i) => (
        <div key={i}>
          <div>{character}</div>
          <Table className='text-2xl'>
            <TableHeader>
              <TableRow>
                <TableHead>Ranking</TableHead>
                <TableHead>Team Name</TableHead>
                <TableHead>Played By</TableHead>
                <TableHead>Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.keys(totalScores[character]).map((team:string,i) => (
                <TableRow key={i}>
                  <TableCell>
                    {i+1}
                  </TableCell>
                  <TableCell>
                    {team}
                  </TableCell>
                  <TableCell>
                    {character}
                  </TableCell>
                  <TableCell>
                    {totalScores[character][team]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>  
  )}

export default Score