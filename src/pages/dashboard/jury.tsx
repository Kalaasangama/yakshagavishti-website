import { api } from "../../utils/api";
import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableHeader,
} from "~/components/ui/table";
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
import { Criteria, Characters } from "@prisma/client";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const Jury: NextPage = () => {

  const criteriaList: Criteria[] = ["CRITERIA_1", "CRITERIA_2", "CRITERIA_3", "CRITERIA_4"];
  const criteriaDisplayList: string[] = ["Criteria 1(30)", "Criteria 2(30)", "Criteria 3(30)", "Criteria 4(10)"];
  const criteriaTeamDisplayList: string[] = ["Criteria 1(30)", "Criteria 2(30)", "Criteria 3(30)", "Criteria 4(10)"];

  type ScoresState = {
    [character in Characters]: {
      [criteria in Criteria]: number;
    };
  };

  type TeamScoresState = {
    [criteria in Criteria]: number
  }

  const [teamName, setTeamName] = useState<string>("Select a college");
  const [teamId, setTeamId] = useState<string>("");
  const [scored,setScored] = useState<boolean>(false);
  const [settingCriteria, setSettingCriteria] = useState<Criteria>("CRITERIA_1");
  const [settingCharacter, setSettingCharacter] = useState<Characters>("DAASHARAJA");
  const [settingCriteriaScore, setSettingCriteriaScore] = useState<Criteria>("CRITERIA_1");

  const scoreUpdate = api.jury.updateScores.useMutation();
  const criteriaTotal = api.jury.updateCriteriaScore.useMutation();
  const { data, isLoading } = api.jury.getTeams.useQuery();
  const ctx = api.useContext();
  const user = useSession();

  const characters : Characters[] = [
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
  const criteriaScores: TeamScoresState = {} as TeamScoresState;

  characters.forEach((character) => {
    initialScores[character] = {} as ScoresState[Characters];

    criteriaList.forEach((criteria) => {
      initialScores[character][criteria] = 999;
    });
  });

  criteriaList.forEach((criteria) => {
    criteriaScores[criteria] = 999;
  });

  const [scores, setScores] = useState<ScoresState>(initialScores);
  const [cScores, setCScores] = useState<TeamScoresState>(criteriaScores);
  const [ready, setReady] = useState<boolean>(false);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

    const handleScoreChange = (
      character: Characters,
      criteria: Criteria,
      value: number
    ) => {
      setSettingCharacter(character)
      setSettingCriteria(criteria)
      if(value>10 && criteria=="CRITERIA_4"){
        setError(true);
        toast.error("Score should be within 0-10", {
          position: "bottom-center",
          duration: 4000,
        })
        return
      }
      if(value>30){
        setError(true);
        toast.error("Score should be within 0-30", {
          position: "bottom-center",
          duration: 4000,
        })
        return
      }
      setError(false);
      // Update the scores state with the new value
      setScores((prevScores) => ({
        ...prevScores,
        [character]: {
          ...prevScores[character],
          [criteria]: value,
        },
      }));
      scoreUpdate.mutate({
        teamId: teamId,
        criteriaName: criteria,
        characterId: character,
        score: value,
      });
    };

    const totalScore = (character: Characters) => {
      if (scores[character] != null) {
        const keys = criteriaList;
        let sum = 0;
        keys.forEach((key) => {
          if(scores[character][key]!==999)
            sum += scores[character][key];
        });
        return sum;
      }
      return 0;
    };

    const handleCriteriaScoreChange = (value: number, criteria: Criteria) => {
        setSettingCriteriaScore(criteria);
        if(value>10 && criteria==="CRITERIA_4"){
          setError(true);
          toast.error("Score should be within 0-10", {
            position: "bottom-center",
            duration: 2000,
          })
          return
        }
        if(value>30){
          setError(true);
          toast.error("Score should be within 0-30", {
            position: "bottom-center",
            duration: 2000,
          })
          return
        }
        setError(false);
        setCScores((prevScores) => ({
          ...prevScores,
          [criteria]: value
        }))
        criteriaTotal.mutate({
          criteriaName: criteria,
          score: value,
          teamId: teamId
        })
    }

    const calculateFinalTotal = (): number => {
      let sum=0;
      Object.keys(cScores).forEach((key) => {
        if(cScores[key]!==999)
          sum+=cScores[key]
      });
      return sum
    };

    const res = api.jury.getScores.useQuery({
      teamId: teamId,
    },
    {
      onError: (error) => {
        console.error(error);
        alert("Error fetching score");
      },
      enabled: false,
      staleTime: Infinity
    },
    )

    const setTeam = (newTeamId:string ,teamName:string) => {
      if(newTeamId === teamId)
        return;
      setScored(false)
      setScores(initialScores)
      setCScores(criteriaScores)
      setRefetch(true);
      setReady(false);
      setTeamId(newTeamId);
      setTeamName(teamName);
    }

    useEffect(() => {
      if(refetch)
        res.refetch().catch((err) => console.log(err))
      setRefetch(false);
    },[teamId])

    useEffect(() => {
      if(res.data?.length>0){
        if(res.data[0].judge.Submitted[0]?.submitted)
          return setScored(true);
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
          const team = res.data[0]?.judge.teamScore;
          team.forEach((team) => {
            setCScores((prevScores) => ({
              ...prevScores,
              [team.criteria?.name]: team.score
            }))
          })
          setReady(true);
      }
      if(res.data?.length === 0 && teamId !== '')
        setReady(true);
    },[res.data])

    return user.data?.user && !isLoading && data!==undefined && data.length>0 ? (
      <div className="container flex flex-col w-full">
        <h1 className="text-extrabold mt-10 text-4xl pb-2">
          Judge Dashboard - {teamName}
        </h1>
        <div className="flex md:flex-row flex-col w-full m-2 text-center">
          <div className="flex basis-1/2 justify-start">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex flex-row gap-3 border border-white rounded-lg p-2 text-center items-center">
                <div className="md:text-xl text-2xl">Select a team</div>
                <ArrowDown></ArrowDown>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {!isLoading ? (
                  data?.map((team ,i) => (
                    <DropdownMenuItem className="text-xl" key={team.id} onSelect={e => setTeam(team.id, team.name)}>
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
            isLoading={scoreUpdate.isLoading}
            isLoadingCriteria={criteriaTotal.isLoading}
          />
        </div>
        {teamName !=="Select a college" && !scored && ready ? (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="basis-3/5">
            <Table>
              <TableHeader className="invisible md:visible align-middle">
                <TableRow className="text-xl text-center">
                  <TableHead className="text-center">Character</TableHead>
                  {criteriaDisplayList.map((criteria, i) => (
                    <TableHead key={i} className="text-center">{criteria}</TableHead>
                  ))}
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-xl">
                {characters.map((character, i) => (
                  <TableRow key={i} className="text-center">
                    <TableCell className="md:m-0">{character}</TableCell>
                    {criteriaList.map((criteria, j) => (
                      <TableCell key={j}>
                        <input
                          value={scores[character]?.[criteria]===999 ? "" : scores[character]?.[criteria]}
                          onChange={(e) =>
                            handleScoreChange(
                              character,
                              criteria,
                              parseInt(e.target.value, 10) || 0
                            )
                          }
                          className={`outline-none  bg-transparent border-2 text-center w-24 rounded-lg ${scoreUpdate.isLoading && settingCriteria===criteria && settingCharacter===character && !error ? `border-red-800`:`border-green-800`}`}
                        />
                      </TableCell>
                    ))}
                    <TableCell>{totalScore(character)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="basis-1/4">
            <Table className="flex flex-col text-xl w-full items-center">
              <TableHeader className="w-full flex items-center justify-center border-b-[1px] border-b-white">
                <TableRow className="text-2xl border-none">
                  <TableHead className="text-center">Team Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-xl">
                {criteriaTeamDisplayList.map((criteria, k) => (
                  <TableRow key={k}>
                    <TableCell>{criteria}</TableCell>
                    <TableCell>
                    <input
                          value={cScores[criteriaList[k]]===999 ? "" : cScores[criteriaList[k]]}
                          onChange={(e) => handleCriteriaScoreChange(
                            parseInt(e.target.value, 10) || 0, 
                            criteriaList[k])
                          }
                          className={`outline-none  bg-transparent border-2 text-center w-24 rounded-lg ${criteriaTotal.isLoading && settingCriteriaScore===criteriaList[k] && !error ? `border-red-800`:`border-green-800`}`}
                        />
                    </TableCell>
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
                  setScored = {setScored}
                  cScores = {cScores}
                  criteriaTeamDisplayList = {criteriaTeamDisplayList}
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
            !ready && teamName ==="Select a college" && !scored ? (
              <><div className="text-2xl flex justify-center text-center p-4 m-4">Please select a college....</div></>
            )
          :
        (
        <><div className="text-2xl flex justify-center text-center p-4 m-4">Loading Scores....</div></>
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
