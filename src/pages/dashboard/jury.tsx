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
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

const Jury: NextPage = () => {
  const { data: sessionData } = useSession();
  const { data, isLoading } = api.jury.getTeams.useQuery();
  const criteriaList = ["CRITERIA_1", "CRITERIA_2", "CRITERIA_3"];
  const criteriaDisplayList = ["Criteria 1", "Criteria 2", "Criteria 3"];
  const [modal,setModal] = useState(false);

  const [scores, setScores] = useState({});
  const [remark, setRemark] = useState("");

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

  const saveRemark = () => {

  }

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
    <div className="container md:pt-20 pt-14 flex flex-col">
      <h1 className="text-extrabold mt-10 text-4xl pb-2">
        Judge Dashboard - {data[0].name}
      </h1>
      <div className="flex md:flex-row flex-col w-full m-2 text-center">
        <div className="flex basis-1/2 justify-start">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row gap-3 border border-white rounded-lg p-2 text-center">
              <div className="md:text-xl text-2xl">Select a college</div>
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
        <div className="flex basis-1/2 mt-4 md:mt-0 md:justify-end text-2xl md:text-xl">
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <Button>Remarks</Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] w-[90vw] md:max-h-[175vh] md:w-[130vw] md:max-w-[650px] translate-x-[-50%] translate-y-[-50%] bg-primary-100 rounded-lg p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-white m-0 text-2xl font-medium border-0 border-b-2 w-full mb-3 border-white">
                    Enter Remarks
                    </Dialog.Title>
                    <label className="text-white w-[90px] text-right text-2xl" htmlFor="name">
                        Remarks
                    </label>
                    <textarea
                        className="text-black shadow-violet7 focus:shadow-violet8 inline-flex h-[135px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-xl leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                        id="name"
                        placeholder="Type here....."
                        value={remark}
                        onChange={e => setRemark(e.target.value)}
                    />
                    <div className="mt-[25px] flex justify-end">
                    <Dialog.Close asChild>
                        <Button onClick={e => saveRemark()}>
                        Save changes
                        </Button>
                    </Dialog.Close>
                    </div>
                    <Dialog.Close asChild>
                    <button
                        className="text-white hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                        aria-label="Close"
                    >
                        <Cross2Icon />
                    </button>
                    </Dialog.Close>
                </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
      </div>
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
