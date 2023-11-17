import { useSession } from "next-auth/react";
import { api } from "../../utils/api";
import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableHeader,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ArrowDown } from "lucide-react";
import { useState } from "react";
import { NextPage } from "next";

const Jury: NextPage = () => {
  const { data: sessionData } = useSession();
  const { data, isLoading } = api.jury.getTeams.useQuery();
  const criteriaList = ["CRITERIA_1", "CRITERIA_2", "CRITERIA_3"];
  const criteriaDisplayList = ["Criteria 1", "Criteria 2", "Criteria 3"];

  const [scores, setScores] = useState({});

  const handleScoreChange = (
    character: string,
    criteria: string,
    value: number
  ) => {
    // Update the scores state with the new value
    setScores((prevScores) => ({
      ...prevScores,
      [character]: {
        ...prevScores[character],
        [criteria]: value,
      },
    }));
    console.log(scores);
  };

  const totalScore = (character: string) => {
    if (scores[character] != null) {
      const keys = Object.keys(scores[character]);
      let sum = 0;
      keys.forEach((key) => {
        sum += scores[character][key];
      });
      return sum;
    }
    return 0;
  };

  const totalCriteriaScore = (criteria: string) => {
    return characters.reduce((sum, character) => {
      return sum + (scores[character]?.[criteria] || 0);
    }, 0);
  };

  const calculateFinalTotal = (): number => {
    return criteriaList.reduce((sum, criteria) => {
      return sum + totalCriteriaScore(criteria);
    }, 0);
  };

  const characters = [
    "SHANTHANU",
    "MANTRI_SUNEETHI",
    "TAMAALAKETHU",
    "TAAMRAAKSHA",
    "SATHYAVATHI",
    "DAASHARAJA",
    "DEVAVRATHA",
  ];

  return !isLoading && data.length>0 ? (
    <div className="container pt-20">
      <h1 className="text-extrabold mt-10 text-4xl pb-2">
        Judge Dashboard - {data[0].name}
      </h1>
      <div className="flex flex-row w-full m-2">
        <div className="flex basis-1/2 justify-start">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row gap-3 border border-white rounded-lg p-2 text-center">
              <div className="text-xl">Select a college</div>
              <ArrowDown></ArrowDown>
            </DropdownMenuTrigger>
            <DropdownMenuContent onSelect={(e) => console.log(e)}>
              {!isLoading ? (
                data?.map((team) => (
                  <DropdownMenuItem className="text-xl" key={team.id}>
                    {team.name}
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem className="text-xl">No teams</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex basis-1/2 justify-end">
          <Button>Remarks</Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="basis-4/5">
          <Table>
            <TableHeader>
              <TableRow className="text-xl">
                <TableHead>Character</TableHead>
                {criteriaDisplayList.map((criteria, i) => (
                  <TableHead key={i}>{criteria}</TableHead>
                ))}
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-xl">
              {characters.map((character, i) => (
                <TableRow key={i}>
                  <TableCell>{character}</TableCell>
                  {criteriaList.map((criteria, j) => (
                    <TableCell key={j}>
                      <input
                        value={scores[character]?.[criteria] || 0}
                        onChange={(e) =>
                          handleScoreChange(
                            character,
                            criteria,
                            parseInt(e.target.value, 10)
                          )
                        }
                        className="bg-transparent border text-center border-white w-24 rounded-lg"
                      />
                    </TableCell>
                  ))}
                  <TableCell>{totalScore(character)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="basis-1/5">
          <Table className="flex flex-col text-2xl">
            <TableHeader>
              <TableRow className="text-2xl">
                <TableHead>Team Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {criteriaDisplayList.map((criteria, k) => (
                <TableRow key={k}>
                  <TableCell>{criteria}</TableCell>
                  <TableCell>{totalCriteriaScore(criteriaList[k])}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell>{calculateFinalTotal()}</TableCell>
              </TableRow>
              <Button className="mt-4">Submit</Button>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  ) : (
    <div className="container py-40">
        <div className="w-full h-full">
            <div className="flex text-2xl justify-center text-center ">{isLoading ?"Loading...":"No teams to judge at the moment...."}</div>
        </div>
    </div>
  );
};

export default Jury;
