import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from "~/components/ui/button";
import { useEffect, useState } from 'react';
import { api } from '~/trpc/react';

const Remarks = (team: { teamId: string, isLoading: boolean, isLoadingCriteria:boolean }) => {
    const [remark, setRemark] = useState("");
    const remarks = api.jury.addRemark.useMutation();
    const getRemark = api.jury.getRemark.useQuery({
        teamId: team.teamId
    });

    const saveRemark = () => {
        remarks.mutate({
            teamId: team.teamId,
            remark: remark
        },{
            onError: (error) => {
                console.error(error);
                alert("Error adding remark");
            },
        })
    }

    useEffect(() => {
        setRemark(getRemark.data?.remark ?? "")
    },[getRemark.data])

    return (
    <div className="flex basis-1/2 mt-4 md:mt-0 md:justify-end text-2xl md:text-xl">
        <div className={`flex justify-end m-2 items-center border p-2 rounded-lg ${(team.isLoading || team.isLoadingCriteria) ? `border-red-800 bg-red-800`:`border-green-800 bg-green-800`}`}>
            {(team.isLoading || team.isLoadingCriteria) ? "Saving..." : "Saved"}
        </div>
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
                    <Button onClick={saveRemark}>
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
)}

export default Remarks;
