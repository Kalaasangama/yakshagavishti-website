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

const Submit = ({ scores,teamId,teamName,criteriaDisplayList,criteriaList,characters }) => {

    const saveScores = () => {

    }

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

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button className="mt-4">Submit</Button>
            </Dialog.Trigger>
            <Dialog.Portal>
            <Dialog.Overlay className=" z-50 data-[state=open]:animate-overlayShow fixed inset-0" />
            <Dialog.Content className="z-50 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] w-[90vw] md:max-h-[175vh] md:w-[90vw] md:max-w-full translate-x-[-50%] translate-y-[-50%] bg-primary-100 rounded-lg p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                <Dialog.Title className="text-white m-0 text-2xl font-medium border-0 border-b-2 w-full mb-3 border-white">
                    Scores of {teamName}
                </Dialog.Title>
                <div className='flex flex-row gap-3'>
                    <div className="basis-4/5">
                    <Table className='text-white'>
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
                                {scores[character]?.[criteria] || 0}
                                </TableCell>
                            ))}
                            <TableCell>{totalScore(character)}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </div>
                    <div className="basis-1/5">
                    <Table className="flex flex-col text-2xl text-white">
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
                        </TableBody>
                    </Table>
                    <div className="mt-[25px] flex justify-end flex-col">
                        <Dialog.Close asChild>
                            <Button onClick={e => saveScores()}>
                            Confirm changes
                            </Button>
                        </Dialog.Close>
                        <div className='text-white text-sm'>
                            Note: Once submitted, scores can not be change without authorization
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
        </Dialog.Root>
    )
}

export default Submit;