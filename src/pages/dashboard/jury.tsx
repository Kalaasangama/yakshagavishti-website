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
import { useEffect, useState } from "react";
import { NextPage } from "next";
import Remarks from "~/components/Jury/remarks";
import Submit from "~/components/Jury/submit";

const Jury: NextPage = () => {
  const { data: sessionData } = useSession();
  const { data, isLoading } = api.jury.getTeams.useQuery();
  const [teamName, setTeamName] = useState<string>("Select a college");
  const [teamId, setTeamId] = useState<string>("");
  const [scored,setScored] = useState<boolean>(false);

  const ctx = api.useContext();

  type Character = "SHANTHANU" | "MANTRI_SUNEETHI" | "TAMAALAKETHU" | "TAAMRAAKSHA" | "SATHYAVATHI" | "DAASHARAJA" | "DEVAVRATHA";
  type Criteria = "CRITERIA_1" | "CRITERIA_2" | "CRITERIA_3";

  const criteriaList: Criteria[] = ["CRITERIA_1", "CRITERIA_2", "CRITERIA_3"];
  const criteriaDisplayList: string[] = ["Criteria 1", "Criteria 2", "Criteria 3"];

  type ScoresState = {
    [character in Character]: {
      [criteria in Criteria]: number;
    };
  };

  const characters : Character[] = [
    "SHANTHANU",
    "MANTRI_SUNEETHI",
    "TAMAALAKETHU",
    "TAAMRAAKSHA",
    "SATHYAVATHI",
    "DAASHARAJA",
    "DEVAVRATHA",
  ];

  // Initialize scores with all values set to 0
  const initialScores: ScoresState = {} as ScoresState;

  characters.forEach((character) => {
    initialScores[character] = {} as ScoresState[Character];

    criteriaList.forEach((criteria) => {
      initialScores[character][criteria] = 0;
    });
  });

  const [scores, setScores] = useState<ScoresState>(initialScores);
  const [ready, setReady] = useState<boolean>(false);

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

    const res = api.jury.getScores.useQuery({
      teamId: teamId
    },
    {
      onSuccess: () => {
        if(res.data !== undefined && res.data.length>0){
          console.log("updating")
            res.data.forEach((item) => {
              const character = item.characterPlayed.character;
              const criteria = item.criteria.name;
              // Update the scores state with the new value
              setScores((prevScores) => ({
                ...prevScores,
                [character]: {
                  ...prevScores[character],
                  [criteria]: item.score,
                },
              }));
            });
            setReady(true);
        }
      },
      onError: (error) => {
        console.error(error);
        alert("Error fetching score");
      },
    })

    const setTeam = (teamId:string ,teamName:string,isScored:boolean) => {
      setReady(false);
      if(isScored)
        setScored(true);
      else
        setScored(false)
      setTeamId(teamId);
      setTeamName(teamName);
      void ctx.jury.getScores.invalidate();
    }

    return !isLoading && data!==undefined && data.length>0 ? (
      <div className="container md:pt-20 pt-14 flex flex-col w-full">
        <h1 className="text-extrabold mt-10 text-4xl pb-2">
          Judge Dashboard - {teamName}
        </h1>
        <div className="flex md:flex-row flex-col w-full m-2 text-center">
          <div className="flex basis-1/2 justify-start">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex flex-row gap-3 border border-white rounded-lg p-2 text-center">
                <div className="md:text-xl text-2xl">Select a team</div>
                <ArrowDown></ArrowDown>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {!isLoading ? (
                  data?.map((team ,i) => (
                    <DropdownMenuItem className="text-xl" key={team.id} onSelect={e => setTeam(team.id, team.name, team.isScored)}>
                      {team.name}
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem className="text-xl">No teams</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Remarks
            teamId={teamId}
          />
        </div>
        {teamName !=="Select a college" && !scored && ready ? (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="basis-4/5">
            <Table>
              <TableHeader className="invisible md:visible">
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
                  <TableRow key={i} className="">
                    <TableCell className="md:m-0">{character}</TableCell>
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
                <Submit
                  scores = {scores}
                  teamId = {teamId}
                  teamName = {teamName}
                  criteriaDisplayList = {criteriaDisplayList}
                  criteriaList = {criteriaList}
                  characters = {characters}
                  scored = {scored}
                  setScored = {setScored}
                />
              </TableBody>
            </Table>
          </div>
        </div>
        ):
        scored ? (
              <div className="container py-40">
                <div className="w-full h-full">
                    <div className="flex text-2xl justify-center text-center ">Thank you for Judging... you can select any other team</div>
                </div>
            </div>
            )
            :
            !ready && teamName !=="Select a college" ? (
              <><div className="text-2xl flex justify-center text-center p-4 m-4">Please select a college....</div></>
            )
          :
        (
        <><div className="text-2xl flex justify-center text-center p-4 m-4">Please select a college....</div></>
      )
    }
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
