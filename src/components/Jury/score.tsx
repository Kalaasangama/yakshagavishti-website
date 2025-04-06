import type { PlayCharacters } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";

function Score() {
  type TotalScores = Record<PlayCharacters, Record<string, number>>;

  type Name = Record<PlayCharacters, Record<string, string>>;

  type Team = Record<string, string>;

  const characters: PlayCharacters[] = [
    "BHADRA_SENA",
    "RATNAVATI",
    "VATSYAKA",
    "VIDYULOCHANA",
    "DHRADAVARMA",
    "DHRADAVARMA_CHARAKA",
  ];

  const initialScores: TotalScores = {} as TotalScores;
  const initialName: Name = {} as Name;

  characters.forEach((character) => {
    initialScores[character] = {};
  });

  //   const [teamId, setTeamId] = useState<string>("")
  //   const [characterName, setCharacter] = useState<Characters>("DAASHARAJA");
  const results = api.admin.getResults.useQuery();
  //   const name = api.admin.getName;
  const [totalScores, setTotalScores] = useState<TotalScores>(initialScores);
  const [names, setNames] = useState<Name>(initialName);
  const [teams, setTeams] = useState<Team>({});

  useEffect(() => {
    // Initialize an object to store the total scores for each character from each team
    const newTotalScores = initialScores;

    // Initialize an array to store unique team names
    const uniqueTeams: Record<string, string> = {};
    // Loop through each result
    results.data?.forEach((result) => {
      const team: string = result.team.name;
      const character: PlayCharacters = result.characterPlayed.character;
      const score: number = result.score;
      const members = result.team.TeamMembers;

      // Find the member with the matching character and get their name
      const matchingMember = members.find(
        (mem) => mem.characterId === character,
      );

      if (!names[character]) {
        names[character] = {};
      }
      // Use the matching member's name as needed
      if (matchingMember) {
        const matchingMemberName: string = matchingMember.name ?? "";
        names[character][team] = matchingMemberName;
        console.log(
          `The name of the member playing ${character} is ${matchingMemberName}`,
        );
      } else {
        const matchingMemberName: string = character;
        names[character][team] = matchingMemberName;
        console.log(`No member found playing ${character}`);
      }

      // If the characterID is not already in the team's scores, initialize it
      if (!newTotalScores[character]) {
        newTotalScores[character] = {};
      }

      // If the teamID is not already in the totalScores object, initialize it
      if (!newTotalScores[character][team]) {
        newTotalScores[character][team] = 0;
        uniqueTeams[team] ??= result.teamID;
      }

      // Add the score to the total for the character
      newTotalScores[character][team] += score;
    });

    // Sort the inner teams in descending order for each character
    for (const [character, teams] of Object.entries(newTotalScores)) {
      // Sort teams for each character
      const sortedTeams = Object.fromEntries(
        Object.entries(teams).sort(([, a], [, b]) => b - a),
      );
      newTotalScores[character as PlayCharacters] = sortedTeams;
    }
    // Update the state with the new total scores
    setTotalScores(newTotalScores);
    setTeams(uniqueTeams);
  }, [results.data, names]);

  // const getName = (teamId: string, character: Characters) => {
  //   if(teamId !== '')
  //     name.useQuery({
  //       character: character,
  //       teamId:teamId
  //     })
  //   return "Aaron";
  // }
  const downloadCSV = () => {
    const array: string[] = [
      "Character Name",
      "Ranking",
      "Team Name",
      "Played By",
      "Score",
    ];
    const col = array.join(",") + "\n";
    const row = characters.map((character) => {
      const row = Object.keys(totalScores[character]).map((team, i) => {
        const row = [
          character,
          i + 1,
          team,
          character,
          totalScores[character][team],
        ];
        return row.join(",");
      });
      return row.join("\n");
    });
    const csvfile = col + row.join("\n");
    const blob = new Blob([csvfile], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `character_results.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const check = api.admin.checkIfAllSubmitted.useQuery();

  if (results.isLoading)
    return (
      <div className="mb-[100vh] p-4 text-center text-2xl">Loading....</div>
    );

  return results.isLoading ? (
    <div>All judges have not submitted the score...</div>
  ) : (
    <div>
      <div className="flex flex-row gap-[56vw]">
        <Button
          className="my-3 flex basis-1/2 justify-start"
          onClick={downloadCSV}
        >
          Download CSV
        </Button>
        <div
          className={`my-3 flex basis-1/2 items-center justify-center rounded-3xl px-3 py-1 text-center text-2xl ${
            check.data === "Not submitted" ? "bg-red-800" : "bg-green-800"
          }`}
        >{`${
          check.data === "Not submitted" ? "Not Submitted" : "Submitted"
        }`}</div>
      </div>
      {characters.map((character, i) => (
        <div key={i}>
          <div>{character}</div>
          <Table className="text-2xl">
            <TableHeader>
              <TableRow>
                <TableHead>Ranking</TableHead>
                <TableHead>Team Name</TableHead>
                <TableHead>Played By</TableHead>
                <TableHead>Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.keys(totalScores[character]).map((team: string, i) => (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{team}</TableCell>
                  <TableCell>{names[character][team]}</TableCell>
                  <TableCell>{totalScores[character][team]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
}

export default Score;
