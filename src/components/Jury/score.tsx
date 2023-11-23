import { Characters } from '@prisma/client';
import React, { useEffect, useState } from 'react'
import { api } from '~/utils/api'
import { Table,TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

function Score() {
  type TotalScores = {
    [character in Characters]: {
      [team: string]: number;
    };
  };

  type Team = {
    [team: string] : string
  }

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
      let sortedTeams = Object.fromEntries(
          Object.entries(teams).sort(([, a], [, b]) => b - a)
      );
      newTotalScores[character] = sortedTeams;
  }
    // Update the state with the new total scores
    setTotalScores(newTotalScores);
    setTeams(uniqueTeams);
  }, [results.data]);

  // const getName = (teamId: string, character: Characters) => {
  //   if(teamId !== '')
  //     name.useQuery({
  //       character: character,
  //       teamId:teamId
  //     })
  //   return "Aaron";
  // }

  useEffect(() => {
    
  },[teamId])

  return results.isLoading ? (
    <div>
        All judges have not submitted the score...
    </div>
    )
    :(
    <div>
      {characters.map((character) => (
        <div>
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
              {Object.keys(totalScores[character]).map((team,i) => (
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