import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from "../ui/button";
import {
    Table,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    TableHeader,
  } from "~/components/ui/table";
import { api } from '~/utils/api';
import { Dispatch, SetStateAction, useState } from 'react';
import { Characters, Criteria, criteria } from '@prisma/client';
import toast from 'react-hot-toast';

type ScoresState = {
  [character in Characters]: {
    [criteria in Criteria]: number;
  };
};

type TeamScoresState = {
  [criteria in Criteria]: number
}

const Submit = ({
    scores,
    teamId,
    teamName,
    criteriaDisplayList,
    criteriaList,
    characters,
    setScored,
    cScores,
    criteriaTeamDisplayList
 } : {
    scores : ScoresState,
    teamId : string,
    teamName : string,
    criteriaDisplayList : string[], 
    criteriaList : Criteria[],
    characters : Characters[],
    setScored: Dispatch<SetStateAction<boolean>>,
    cScores: TeamScoresState,
    criteriaTeamDisplayList: string[]
 }
    ) => {
    const scoreUpdate = api.jury.updateScores.useMutation();
    const criteriaTotal = api.jury.updateCriteriaScore.useMutation();
    const [open, setOpen] = useState<boolean>(false)

    const saveScores = () => {
        characters.forEach((character) => {
          criteriaList.forEach((criteria) => {
            scoreUpdate.mutate({
              teamId: teamId,
              criteriaName: criteria,
              characterId: character,
              score: scores[character][criteria],
            });
          });
        });   
        criteriaList.forEach((criteria) => {
          criteriaTotal.mutate({
            criteriaName: criteria,
            score: cScores[criteria],
            teamId: teamId,
            final: true
          })
        })
        setScored(true);
      };

    const totalScore = (character: Characters) => {
        if (scores[character] != null) {
          const keys = criteriaList;
          let sum = 0;
          keys.forEach((key) => {
            sum += scores[character][key];
          });
          return sum;
        }
        return 0;
      };
    
      const calculateFinalTotal = (): number => {
        let sum=0;
        Object.keys(cScores).forEach((key) => {
          sum+=cScores[key]
        });
        return sum
      };

      const checkIfAllFieldsIsScored = () => {
        let flag = 0;
        characters.forEach((character) => {
          criteriaList.forEach((criteria) => {
              if(scores[character][criteria]===999)
                flag = 1;
          })
        });
        criteriaList.forEach((criteria) => {
          if(cScores[criteria]===999)
            flag=1;
        })
        if(flag === 1){
          toast.error("Please enter scores in all the fields", {
            position: "bottom-center"
        })}else{
          setOpen(true)
        }
      }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button onClick={e => checkIfAllFieldsIsScored()} className="mt-4">Submit</Button>
            </Dialog.Trigger>
            {open ? (
              <Dialog.Portal>
              <Dialog.Overlay className=" z-50 data-[state=open]:animate-overlayShow inset-0" />
              <Dialog.Content className="z-50 data-[state=open]:animate-contentShow h-auto scroll-m-1 fixed top-[50%] left-[50%] w-[80dvw] max-h-[90dvh] md:max-h-[90dvh] md:w-[80dvw] md:max-w-full translate-x-[-50%] translate-y-[-50%] bg-primary-100 rounded-lg p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                  <Dialog.Title className="text-white m-0 text-2xl font-medium border-0 border-b-2 w-full mb-3 border-white">
                      Scores of {teamName}
                  </Dialog.Title>
                  <div className='flex gap-3 flex-col md:flex-row'>
                      <div className="basis-3/4">
                      <Table className='text-white'>
                          <TableHeader className="invisible md:visible">
                          <TableRow className="text-l">
                              <TableHead>Character</TableHead>
                              {criteriaDisplayList.map((criteria, i) => (
                              <TableHead key={i}>{criteria}</TableHead>
                              ))}
                              <TableHead>Total</TableHead>
                          </TableRow>
                          </TableHeader>
                          <TableBody className="text-l">
                          {characters.map((character, i) => (
                              <TableRow key={i} className="">
                              <TableCell className="md:m-0">{character}</TableCell>
                              {criteriaList.map((criteria, j) => (
                                  <TableCell key={j}>
                                  {scores[character]?.[criteria] || 0}
                                  </TableCell>
                              ))}
                              <TableCell>{totalScore(character)}</TableCell>
                              </TableRow>
                          ))}
                          </TableBody>
                      </Table>
                      </div>
                      <div className="basis-1/4">
                      <Table className="flex flex-col text-l text-white">
                          <TableHeader>
                          <TableRow className="text-l">
                              <TableHead>Team Score</TableHead>
                          </TableRow>
                          </TableHeader>
                          <TableBody>
                          {criteriaTeamDisplayList.map((criteria, k) => (
                              <TableRow key={k}>
                              <TableCell>{criteria}</TableCell>
                              <TableCell>{cScores[criteriaList[k]]}</TableCell>
                              </TableRow>
                          ))}
                          <TableRow>
                              <TableCell>Total</TableCell>
                              <TableCell>{calculateFinalTotal()}</TableCell>
                          </TableRow>
                          </TableBody>
                      </Table>
                      <div className="mt-[25px] flex justify-end flex-col">
                          <Dialog.Close asChild>
                              <Button onClick={e => saveScores()}>
                              Confirm changes
                              </Button>
                          </Dialog.Close>
                          <div className='text-white text-sm'>
                              Note: Once submitted, scores can not be changed without authorization
                          </div>
                      </div>
                      <Dialog.Close asChild>
                      <button
                          className="text-white hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                          aria-label="Close"
                      >
                          <Cross2Icon />
                      </button>
                      </Dialog.Close>
                      </div>
                  </div>
              </Dialog.Content>
              </Dialog.Portal>
              ) : (<></>)
            }
        </Dialog.Root>
    )
}

export default Submit;