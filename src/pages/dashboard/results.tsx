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
import { Criteria, Characters } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import Score from "~/components/Jury/score";

const Jury: NextPage = () => {

  const user = useSession()
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
  const [judgeName, setJudgeName] = useState<string>("Select a judge");
  const [judgeId, setJudgeId] = useState<string>("");
  const [scored,setScored] = useState<boolean>(false);
  const { data, isLoading } = api.jury.getTeams.useQuery();

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
  const [enable, setEnable] = useState<boolean>(true);
  const [active, setActive] = useState<string>("");

    const totalScore = (character: string) => {
      if (scores[character] != null) {
        const keys = Object.keys(scores[character]);
        let sum = 0;
        keys.forEach((key) => {
          if(scores[character][key]!==999)
            sum += scores[character][key];
        });
        return sum;
      }
      return 0;
    };

    const calculateFinalTotal = (): number => {
        let sum=0;
        Object.keys(cScores).forEach((key) => {
          if(cScores[key]!==999)
            sum+=cScores[key]
        });
        return sum
    };

    const res = api.admin.getScores.useQuery({
      teamId: teamId,
      judgeId: judgeId
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

    const judge = api.admin.getJudges.useQuery({
        teamId: " "
    },
    {
        onSuccess: () => {
            setEnable(false);
        },
        enabled: enable,
        staleTime: Infinity
    });
    
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

    const setJudge = (newJudgeId:string ,judgeName:string) => {
        if(newJudgeId === judgeId)
          return;
        setScored(false)
        setScores(initialScores)
        setCScores(criteriaScores)
        setRefetch(true);
        setReady(false);
        setJudgeId(newJudgeId);
        setJudgeName(judgeName);
      }

    useEffect(() => {
      if(refetch)
        res.refetch()
      setRefetch(false);
    },[teamId,judgeId])

    useEffect(() => {
      if(res.data?.length>0){
        if(res.data[0].judge.Submitted[0]?.submitted)
          setScored(true);
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
      if(res.data?.length === 0 && judge.data!==undefined && teamId !== '' && judgeId !== '')
        setReady(true);
    },[res.data])

    return user.data?.user && !isLoading && !judge.isLoading && judge.data!==undefined && data!==undefined && data.length>0 ? (
      <div className="container flex flex-col w-full items-center">
        <h1 className="text-extrabold mt-4 text-3xl pb-2 text-center">
          Results<br/>
          Judge - {judgeName}<br/>
          Team - {teamName}
        </h1>
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="bg-primary-100 p-2">
            <TabsTrigger value="results" onClick={e => {setActive("result")}} className={`text-2xl mb-3 ${active==="result" ? `bg-white rounded-lg text-primary-100`: ""}`}>Results</TabsTrigger>
            <TabsTrigger value="scoreBoard" onClick={e => {setActive("score")}} className={`text-2xl mb-3  ${active==="score" ? `bg-white rounded-lg text-primary-100`: ""}`}>ScoreBoard</TabsTrigger>
          </TabsList>
          <TabsContent value="results" className="w-full">
            <div className="flex md:flex-row flex-col w-full m-2 items-center text-center">
              <div className="flex flex-row gap-5 basis-1/2 justify-start">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex flex-row gap-3 border border-white rounded-lg p-2 text-center items-center">
                    <div className="md:text-xl text-2xl">Select a Team</div>
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
                      <DropdownMenuItem className="text-xl">No Judges</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex flex-row gap-3 border border-white rounded-lg p-2 text-center items-center">
                    <div className="md:text-xl text-2xl">Select a Judge</div>
                    <ArrowDown></ArrowDown>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {!isLoading ? (
                      judge.data?.map((judge ,i) => (
                        <DropdownMenuItem className="text-xl" key={judge.userId} onSelect={e => setJudge(judge.userId, judge.user.name)}>
                          {judge.user.name}
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <DropdownMenuItem className="text-xl">No teams</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
              {teamName !=="Select a college" && judgeName!=="Select a judge" && scored && ready ? (
              <div className="flex flex-col md:flex-row gap-6 justify-center">
                <div className="basis-3/5">
                  <Table>
                    <TableHeader className="invisible md:visible align-middle">
                      <TableRow className="text-2xl text-center">
                        <TableHead className="text-center">Character</TableHead>
                        {criteriaDisplayList.map((criteria, i) => (
                          <TableHead key={i} className="text-center">{criteria}</TableHead>
                        ))}
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="text-2xl">
                      {characters.map((character, i) => (
                        <TableRow key={i} className="text-center">
                          <TableCell className="md:m-0">{character}</TableCell>
                          {criteriaList.map((criteria, j) => (
                            <TableCell key={j}>
                              {scores[character]?.[criteria]}
                            </TableCell>
                          ))}
                          <TableCell>{totalScore(character)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="basis-1/4">
                  <Table className="flex flex-col text-2xl w-full items-center">
                    <TableHeader className="w-full flex items-center justify-center border-b-[1px] border-b-white">
                      <TableRow className="text-2xl border-none">
                        <TableHead className="text-center">Team Score</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="text-2xl">
                      {criteriaTeamDisplayList.map((criteria, k) => (
                        <TableRow key={k}>
                          <TableCell>{criteria}</TableCell>
                          <TableCell>
                              {cScores[criteriaList[k]]}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell>{calculateFinalTotal()}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
              ):
              !ready && teamName ==="Select a college" && judgeName==="Select a judge" && !scored  ? (
                    <div className="container py-40">
                      <div className="w-full h-full">
                          <div className="flex text-2xl justify-center text-center ">Please select a college or judge....</div>
                      </div>
                  </div>
                  )
                  :
                  !scored ? (
                    <><div className="text-2xl flex justify-center text-center p-4 m-4">Scores has not been submitted...</div></>
                  )
                :
              (
              <><div className="text-2xl flex justify-center text-center p-4 m-4">Loading Scores....</div></>
            )
          }
          </TabsContent>
          <TabsContent value="scoreBoard">
            <Score/>
          </TabsContent>
        </Tabs>
      </div>
    ) : (
      <div className="container py-40">
          <div className="w-full h-full">
              <div className="flex text-2xl justify-center text-center ">{(isLoading || judge.isLoading) ?"Loading...":"No teams to judge at the moment...."}</div>
          </div>
      </div>
    );
  };

export default Jury;
