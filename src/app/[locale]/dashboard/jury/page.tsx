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
import { useEffect, useState } from "react";
import { type NextPage } from "next";
import Remarks from "~/components/Jury/remarks";
import Submit from "~/components/Jury/submit";
import type { Criteria, Characters } from "@prisma/client";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const Jury: NextPage = () => {
  const criteriaList: Criteria[] = [
    "CRITERIA_1",
    "CRITERIA_2",
    "CRITERIA_3",
    "CRITERIA_4",
  ];
  const criteriaDisplayList: string[] = [
    "ನೃತ್ಯ - ಅಭಿನಯ (30)",
    "ಮಾತುಗಾರಿಕೆ (30)",
    "ವೇಷದ ರೂಪ (30)",
    "ರಂಗತಂತ್ರ (10)",
  ];

  const criteriaTeamDisplayList: string[] = [
    "ನೃತ್ಯ - ಅಭಿನಯ (30)",
    "ಮಾತುಗಾರಿಕೆ (30)",
    "ರಂಗತಂತ್ರ (30)",
    "ಸಮಯದ ನಿಖರ ಬಳಕೆ (10)",
  ];

  type ScoresState = Record<Characters, Record<Criteria, number>>;

  type TeamScoresState = Record<Criteria, number>;

  const [teamName, setTeamName] = useState<string>("Select a college");
  const [teamId, setTeamId] = useState<string>("");
  const [scored, setScored] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const [settingCriteria, setSettingCriteria] =
    useState<Criteria>("CRITERIA_1");
  const [settingCharacter, setSettingCharacter] =
    useState<Characters>("BHADRA_SENA");
  const [settingCriteriaScore, setSettingCriteriaScore] =
    useState<Criteria>("CRITERIA_1");

  const characters: Characters[] = [
    "BHADRA_SENA",
    "RATNAVATI",
    "VATSYAKA",
    "VIDYULOCHANA",
    "DHRADAVARMA",
    "DHRADAVARMA_CHARAKA",
  ];
  const charactersDisplay: string[] = [
    "ಶಂತನು	ರಾಜವೇಷ",
    "ಮಂತ್ರಿ ಸುನೀತಿ",
    "ತಮಾಲಕೇತು",
    "ತಾಮ್ರಾಕ್ಷ",
    "ಸತ್ಯವತಿ",
    "ದಾಶರಾಜ",
    "ದೇವವ್ರತ",
  ];

  const displayTeam: string[] = ["ಅವನಿ", "ಅನಿಲ", "ಅಗ್ನಿ", "ಅಂಬರ", "ಅರ್ನಹ"];

  const scoreUpdate = api.jury.updateScores.useMutation();
  const criteriaTotal = api.jury.updateCriteriaScore.useMutation();
  const { data, isLoading } = api.jury.getTeams.useQuery();
  const user = useSession();

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
    value: number,
  ) => {
    setSettingCharacter(character);
    setSettingCriteria(criteria);
    if (value > 10 && criteria == "CRITERIA_4") {
      setError(true);
      toast.error("Score should be within 0-10", {
        position: "bottom-center",
        duration: 4000,
      });
      return;
    }
    if (value > 30) {
      setError(true);
      toast.error("Score should be within 0-30", {
        position: "bottom-center",
        duration: 4000,
      });
      return;
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

  const handleCriteriaScoreChange = (value: number, criteria: Criteria) => {
    setSettingCriteriaScore(criteria);
    if (value > 10 && criteria === "CRITERIA_4") {
      setError(true);
      toast.error("Score should be within 0-10", {
        position: "bottom-center",
        duration: 2000,
      });
      return;
    }
    if (value > 30) {
      setError(true);
      toast.error("Score should be within 0-30", {
        position: "bottom-center",
        duration: 2000,
      });
      return;
    }
    setError(false);
    setCScores((prevScores) => ({
      ...prevScores,
      [criteria]: value,
    }));
    criteriaTotal.mutate({
      criteriaName: criteria,
      score: value,
      teamId: teamId,
    });
  };

  const totalScore = (character: string) => {
    if (scores[character as Characters] != null) {
      const keys = Object.keys(scores[character as Characters]);
      // let sum = 0;
      // keys.forEach((key) => {
      //   if ((scores[character] as ScoresState)[key] !== 999)
      //     sum += (scores[character] as ScoresState)[key];
      // });
      // return sum;
    }
    return 0;
  };

  const calculateFinalTotal = (): number => {
    let sum = 0;
    Object.keys(cScores).forEach((key) => {
      if (cScores[key as Criteria] !== 999) sum += cScores[key as Criteria];
    });
    return sum;
  };

  const res = api.jury.getScores.useQuery(
    {
      teamId: teamId,
    },
    {
      enabled: false,
      staleTime: Infinity,
    },
  );

  useEffect(() => {
    if (res.error) {
      console.error(res.error);
      alert("Error fetching score");
    }
  }, [res.error]);

  const setTeam = (newTeamId: string, teamName: string) => {
    if (newTeamId === teamId) return;
    setScored(false);
    setScores(initialScores);
    setCScores(criteriaScores);
    setRefetch(true);
    setReady(false);
    setTeamId(newTeamId);
    setTeamName(teamName);
  };

  useEffect(() => {
    if (refetch) res.refetch().catch((err) => console.log(err));
    setRefetch(false);
  }, [teamId]);

  useEffect(() => {
    if (res.data?.length ?? 0 > 0) {
      if (res.data?.[0]?.judge.Submitted[0]?.submitted) setScored(true);
      console.log("updating");
      setUpdating(true);
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
      const team = res.data?.[0]?.judge.teamScore;
      team?.forEach((team) => {
        setCScores((prevScores) => ({
          ...prevScores,
          [team.criteria?.name]: team.score,
        }));
      });
      setReady(true);
      setUpdating(false);
    }
    if (res.data?.length === 0 && teamId !== "") setReady(true);
  }, [res.data]);

  const { data: sessionData } = useSession();
  if (sessionData?.user.role !== "JUDGE")
    return (
      <div className="mb-[100vh] mt-20 text-center text-2xl">
        Your not authorized to view this page
      </div>
    );

  return user.data?.user &&
    !isLoading &&
    data !== undefined &&
    data.length > 0 &&
    !updating ? (
    <div className="container flex w-full flex-col">
      <div className="mt-10 flex flex-row items-center justify-evenly pb-2">
        <h1 className="text-extrabold flex basis-1/2 justify-start text-4xl">
          Judge Dashboard - {teamName}
        </h1>
        <h1 className="flex basis-1/2 justify-end text-3xl">
          {user.data?.user.name}
        </h1>
      </div>
      <div className="m-2 flex w-full flex-col text-center md:flex-row">
        <div className="flex basis-1/2 justify-start">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row items-center gap-3 rounded-lg border border-white p-2 text-center">
              <div className="text-2xl md:text-xl">Select a team</div>
              <ArrowDown></ArrowDown>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {!isLoading ? (
                data?.map((team, i) => (
                  <DropdownMenuItem
                    className="text-xl"
                    key={team.id}
                    onSelect={(e) =>
                      setTeam(
                        team.id,
                        displayTeam[team?.TeamNumber?.number ?? 0] ?? "",
                      )
                    }
                  >
                    {displayTeam[team?.TeamNumber?.number ?? 0]}
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
        <Remarks
          teamId={teamId}
          isLoading={scoreUpdate.isPending}
          isLoadingCriteria={criteriaTotal.isPending}
        />
      </div>
      {teamName !== "Select a college" && !scored && ready && !isLoading ? (
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="basis-3/5">
            <Table>
              <TableHeader className="invisible align-middle md:visible">
                <TableRow className="text-center text-xl">
                  <TableHead className="text-center">ಪಾತ್ರಗಳು</TableHead>
                  {criteriaDisplayList.map((criteria, i) => (
                    <TableHead key={i} className="text-center">
                      {criteria}
                    </TableHead>
                  ))}
                  <TableHead>ಒಟ್ಟು</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-xl">
                {characters.map((character, i) => (
                  <TableRow key={i} className="text-center">
                    <TableCell className="md:m-0">
                      {charactersDisplay[i]}
                    </TableCell>
                    {criteriaList.map((criteria, j) => (
                      <TableCell key={j}>
                        <input
                          value={
                            scores[character]?.[criteria] === 999
                              ? ""
                              : scores[character]?.[criteria]
                          }
                          onChange={(e) =>
                            handleScoreChange(
                              character,
                              criteria,
                              parseInt(e.target.value, 10) || 0,
                            )
                          }
                          className={`w-24  rounded-lg border-2 bg-transparent text-center outline-none ${
                            scoreUpdate.isPending &&
                            settingCriteria === criteria &&
                            settingCharacter === character &&
                            !error
                              ? `border-red-800`
                              : `border-green-800`
                          }`}
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
            <Table className="flex w-full flex-col items-center text-xl">
              <TableHeader className="flex w-full items-center justify-center border-b-[1px] border-b-white">
                <TableRow className="border-none text-2xl">
                  <TableHead className="text-center">Team Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-xl">
                {criteriaTeamDisplayList.map((criteria, k) => (
                  <TableRow key={k}>
                    <TableCell>{criteria}</TableCell>
                    <TableCell>
                      <input
                        value={
                          criteriaList[k] && cScores[criteriaList[k]] === 999
                            ? ""
                            : criteriaList[k]
                            ? cScores[criteriaList[k]]
                            : ""
                        }
                        onChange={(e) =>
                          handleCriteriaScoreChange(
                            parseInt(e.target.value, 10) || 0,
                            criteriaList[k] ?? "CRITERIA_1",
                          )
                        }
                        className={`w-24  rounded-lg border-2 bg-transparent text-center outline-none ${
                          criteriaTotal.isPending &&
                          settingCriteriaScore === criteriaList[k] &&
                          !error
                            ? `border-red-800`
                            : `border-green-800`
                        }`}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>ಒಟ್ಟು</TableCell>
                  <TableCell>{calculateFinalTotal()}</TableCell>
                </TableRow>
                <Submit
                  scores={scores}
                  teamId={teamId}
                  teamName={teamName}
                  criteriaDisplayList={criteriaDisplayList}
                  criteriaList={criteriaList}
                  characters={characters}
                  setScored={setScored}
                  cScores={cScores}
                  criteriaTeamDisplayList={criteriaTeamDisplayList}
                  charactersDisplay={charactersDisplay}
                />
              </TableBody>
            </Table>
          </div>
        </div>
      ) : scored ? (
        <div className="container h-full py-2">
          <div className="h-full w-full">
            <div className="mb-20 flex justify-center text-center text-2xl ">
              ತೀರ್ಪಿಗಾಗಿ ಧನ್ಯವಾದಗಳು. ಇನ್ನೊಂದು ತಂಡವನ್ನು ನೀವು ಈಗ ಆಯ್ಕೆ
              ಮಾಡಿಕೊಳ್ಳಬಹುದು!
            </div>
          </div>
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
                      <TableCell>
                        {criteriaList[k] ? cScores[criteriaList[k]] : ""}
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
        </div>
      ) : !ready && teamName === "Select a college" && !scored && !updating ? (
        <>
          <div className="m-4 mb-96 flex h-full justify-center p-4 text-center text-2xl">
            Please select a team....
          </div>
        </>
      ) : (
        <>
          <div className="m-4 mb-[100vw] flex justify-center p-4 text-center text-2xl">
            Loading Scores....
          </div>
        </>
      )}
    </div>
  ) : (
    <div className="container py-40">
      <div className="h-full w-full">
        <div className="mb-[100vh] flex justify-center text-center text-2xl">
          {isLoading ? "Loading..." : "No teams to judge at the moment...."}
        </div>
      </div>
    </div>
  );
};

export default Jury;
