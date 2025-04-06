"use client";

import { api } from "~/trpc/react";
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
import React, { useEffect, useState } from "react";
import { type NextPage } from "next";
import { Role, type Criterias, type PlayCharacters } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Score from "~/components/Jury/score";
import TeamScore from "~/components/Jury/teamScore";
import { Button } from "~/components/ui/button";
import NotFound from "~/app/[locale]/not-found";

const Jury: NextPage = () => {
  const { data: sessionData } = useSession();

  const isAdmin = !sessionData?.user || sessionData?.user?.role !== Role.ADMIN;

  const criteriaList: Criterias[] = [
    "CRITERIA_1",
    "CRITERIA_2",
    "CRITERIA_3",
    "CRITERIA_4",
  ];
  const criteriaDisplayList: string[] = [
    "Criteria 1(30)",
    "Criteria 2(30)",
    "Criteria 3(30)",
    "Criteria 4(10)",
  ];
  const criteriaTeamDisplayList: string[] = [
    "Criteria 1(30)",
    "Criteria 2(30)",
    "Criteria 3(30)",
    "Criteria 4(10)",
  ];

  type ScoresState = Record<PlayCharacters, Record<Criterias, number>>;

  type TeamScoresState = Record<Criterias, number>;

  const [teamName, setTeamName] = useState<string>("Select a college");
  const [teamId, setTeamId] = useState<string>("");
  const [judgeName, setJudgeName] = useState<string>("Select a judge");
  const [judgeId, setJudgeId] = useState<string>("");
  const [scored, setScored] = useState<boolean>(true);
  const { data, isLoading } = api.admin.getTeams.useQuery(undefined, { enabled: !isAdmin });

  const characters: PlayCharacters[] = [
    "BHADRA_SENA",
    "RATNAVATI",
    "VATSYAKA",
    "VIDYULOCHANA",
    "DHRADAVARMA",
    "DHRADAVARMA_CHARAKA",
  ];

  // Initialize scores with all values set to 0
  const initialScores: ScoresState = {} as ScoresState;
  const criteriaScores: TeamScoresState = {} as TeamScoresState;

  characters.forEach((character) => {
    initialScores[character] = {} as ScoresState[PlayCharacters];

    criteriaList.forEach((criteria) => {
      initialScores[character][criteria] = 0;
    });
  });

  criteriaList.forEach((criteria) => {
    criteriaScores[criteria] = 0;
  });

  const [scores, setScores] = useState<ScoresState>(initialScores);
  const [cScores, setCScores] = useState<TeamScoresState>(criteriaScores);
  const [ready, setReady] = useState<boolean>(false);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [active, setActive] = useState<string>("");

  const totalScore = (character: PlayCharacters) => {
    if (scores[character] != null) {
      const keys = criteriaList;
      let sum = 0;
      keys.forEach((key) => {
        if (scores[character][key] !== 999) sum += scores[character][key];
      });
      return sum;
    }
    return 0;
  };

  const calculateFinalTotal = (): number => {
    let sum = 0;
    Object.keys(cScores).forEach((key) => {
      if (cScores[key as Criterias] !== 999) sum += cScores[key as Criterias];
    });
    return sum;
  };

  const res = api.admin.getScores.useQuery(
    {
      teamId: teamId,
      judgeId: judgeId,
    },
    {
      enabled: false,
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    if (res.error) {
      console.error(res.error);
      alert("Error fetching score");
    }
  }, [res.error]);

  const judge = api.admin.getJudges.useQuery(undefined, { enabled: !isAdmin });

  const setTeam = (newTeamId: string, teamName: string) => {
    if (newTeamId === teamId) return;
    setScores(initialScores);
    setCScores(criteriaScores);
    setRefetch(true);
    setReady(false);
    setTeamId(newTeamId);
    setTeamName(teamName);
  };

  const setJudge = (newJudgeId: string, judgeName: string) => {
    if (newJudgeId === judgeId) return;
    setScores(initialScores);
    setCScores(criteriaScores);
    setRefetch(true);
    setReady(false);
    setJudgeId(newJudgeId);
    setJudgeName(judgeName);
  };

  useEffect(() => {
    if (refetch) res.refetch().catch((err) => console.log(err));
    setRefetch(false);
  }, [teamId, judgeId, refetch, res]);

  useEffect(() => {
    if (res.data?.length ?? 0 > 0) {
      console.log("updating");
      res.data?.forEach((item) => {
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
      const team = res.data?.[0]?.judge.TeamScore;
      team?.forEach((team) => {
        setCScores((prevScores) => ({
          ...prevScores,
          [team.criteria?.name]: team.score,
        }));
      });
      setReady(true);
    }
    if (
      res.data?.length === 0 &&
      judge.data !== undefined &&
      teamId !== "" &&
      judgeId !== ""
    )
      setReady(true);
  }, [res.data, judge.data, teamId, judgeId]);

  const downloadCSV = () => {
    const array: string[] = criteriaDisplayList;
    array.unshift("Character");
    array.push("Total");
    const col = array.join(",") + "\n";

    const row = characters.map((character) => {
      const row = [
        character,
        criteriaList[0] !== undefined ? scores[character]?.[criteriaList[0]] : 0,
        criteriaList[1] !== undefined ? scores[character]?.[criteriaList[1]] : 0,
        criteriaList[2] !== undefined ? scores[character]?.[criteriaList[2]] : 0,
        criteriaList[3] !== undefined ? scores[character]?.[criteriaList[3]] : 0,
        totalScore(character),
      ];
      return row;
    });

    const csvfile = col + row.join("\n");
    const blob = new Blob([csvfile], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${teamName}_${judgeName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isAdmin) return <NotFound />;

  return sessionData?.user &&
    !isLoading &&
    !judge.isLoading &&
    judge.data !== undefined &&
    data !== undefined &&
    data.length > 0 ? (
    <div className="max-h-auto container flex min-h-[130vh] mt-[4.75rem] sm:mt-[5.75rem] md:mt-24 lg:mt-[6.25rem] w-full flex-col items-center">
      <h1 className="text-extrabold mt-4 flex w-full flex-row pb-2 text-3xl">
        <div className="flex basis-1/2 justify-start text-left text-4xl">
          Results
        </div>
        <br />
        <div className="flex basis-1/2 justify-end text-right text-2xl">
          {active === "result" ? (
            <div>
              <span>
                Judge -{" "}
                <span className="rounded-lg bg-white p-[2px] text-primary-100">
                  {judgeName}
                </span>
              </span>
              <br />
              <span>
                Team -{" "}
                <span className="rounded-lg bg-white p-[2px] text-primary-100">
                  {teamName}
                </span>
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
      </h1>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="bg-primary-100 p-2">
          <TabsTrigger
            value="results"
            onClick={() => setActive("result")}
            className={`mb-3 text-2xl ${
              active === "result" ? `rounded-lg bg-white text-primary-100` : ""
            }`}
          >
            Results
          </TabsTrigger>
          <TabsTrigger
            value="scoreBoard"
            onClick={() => setActive("score")}
            className={`mb-3 text-2xl  ${
              active === "score" ? `rounded-lg bg-white text-primary-100` : ""
            }`}
          >
            Character ScoreBoard
          </TabsTrigger>
          <TabsTrigger
            value="teamScoreBoard"
            onClick={() => setActive("team")}
            className={`mb-3 text-2xl  ${
              active === "team" ? `rounded-lg bg-white text-primary-100` : ""
            }`}
          >
            Team ScoreBoard
          </TabsTrigger>
        </TabsList>
        <TabsContent value="results" className="w-full">
          <div className="m-2 flex w-full flex-col items-center text-center md:flex-row">
            <div className="flex basis-1/2 flex-row justify-start gap-5">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex flex-row items-center gap-3 rounded-lg border border-white p-2 text-center">
                  <div className="text-2xl md:text-xl">Select a Team</div>
                  <ArrowDown></ArrowDown>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {!isLoading ? (
                    data?.map((team) => (
                      <DropdownMenuItem
                        className="text-xl"
                        key={team.id}
                        onSelect={() => setTeam(team.id, team.name)}
                      >
                        {team.name}
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <DropdownMenuItem className="text-xl">
                      No Judges
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex flex-row items-center gap-3 rounded-lg border border-white p-2 text-center">
                  <div className="text-2xl md:text-xl">Select a Judge</div>
                  <ArrowDown></ArrowDown>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {!isLoading ? (
                    judge.data?.map((judge) => (
                      <DropdownMenuItem
                        className="text-xl"
                        key={judge.userId}
                        onSelect={() => setJudge(judge.userId, judge.User.name)}
                      >
                        {judge.User.name}
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <DropdownMenuItem className="text-xl">
                      No teams
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex w-full justify-end">
              <Button onClick={downloadCSV}>Download CSV</Button>
            </div>
          </div>
          {teamName !== "Select a college" &&
          judgeName !== "Select a judge" &&
          scored &&
          ready ? (
            <div className="flex flex-col justify-center gap-6 md:flex-row">
              <div className="basis-3/5">
                <Table>
                  <TableHeader className="invisible align-middle md:visible">
                    <TableRow className="text-center text-2xl">
                      <TableHead className="text-center">Character</TableHead>
                      {criteriaDisplayList.map((criteria, i) => (
                        <TableHead key={i} className="text-center">
                          {criteriaDisplayList[i]}
                        </TableHead>
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
                <Table className="flex w-full flex-col items-center text-2xl">
                  <TableHeader className="flex w-full items-center justify-center border-b-[1px] border-b-white">
                    <TableRow className="border-none text-2xl">
                      <TableHead className="text-center">Team Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-2xl">
                    {criteriaTeamDisplayList.map((criteria, k) => (
                      <TableRow key={k}>
                        <TableCell>{criteria}</TableCell>
                        <TableCell>{criteriaList[k] !== undefined ? cScores[criteriaList[k]] : 0}</TableCell>
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
          ) : !ready &&
            teamName === "Select a college" &&
            judgeName === "Select a judge" ? (
            <div className="container py-40">
              <div className="h-full w-full">
                <div className="mb-[100vw] flex justify-center text-center text-2xl">
                  Please select a college or judge....
                </div>
              </div>
            </div>
          ) : !scored ? (
            <>
              <div className="m-4 mb-[100vw] flex justify-center p-4 text-center text-2xl">
                Scores has not been submitted...
              </div>
            </>
          ) : (
            <>
              <div className="m-4 mb-[100vw] flex justify-center p-4 text-center text-2xl">
                Loading Scores....
              </div>
            </>
          )}
        </TabsContent>
        <TabsContent value="scoreBoard">
          <Score />
        </TabsContent>
        <TabsContent value="teamScoreBoard">
          <TeamScore />
        </TabsContent>
      </Tabs>
    </div>
  ) : (
    <div className="container py-40">
      <div className="h-full w-full">
        <div className="mb-[100vh] flex justify-center text-center text-2xl ">
          {isLoading || judge.isLoading
            ? "Loading..."
            : "No teams scored at the moment...."}
        </div>
      </div>
    </div>
  );
};

export default Jury;
