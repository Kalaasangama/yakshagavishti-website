"use client";

import React, { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Button as RegButton } from "~/components/Button";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  DialogContent,
  DialogDescription,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { toast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import { ImSpinner9 } from "react-icons/im";
export default function CollegeReg({
  setFormToShow,
  setCollege,
}: {
  setFormToShow: Dispatch<SetStateAction<number>>;
  setCollege: Dispatch<SetStateAction<string>>;
}) {
  const [selectedCollege, setSelectedCollege] = useState<string>("");
  const [teamPassword, setTeamPassword] = useState("");
  const user = useSession()?.data?.user;
  const getColleges = api.team.getColleges.useQuery();
  const verifyPassword = api.team.checkPassword.useMutation({
    onError(error) {
      return toast({
        variant: "destructive",
        title: "Invalid Password!",
        description: error.message,
      });
    },
    onSuccess(data) {
      toast({
        variant: "default",
        title: "College signed in successfully!",
        description: data?.message,
      });
      setCollege(selectedCollege);
      if (user?.LeaderOf?.editRequested && !user.LeaderOf.isComplete) {
        return setFormToShow(4);
      } else if (user?.LeaderOf) {
        return setFormToShow(3);
      } else {
        return setFormToShow(2);
      }
    },
  });
  const form = useForm();
  const handleCollegeChange = (value: string) => {
    setSelectedCollege(value);
  };

  useEffect(() => {
    setCollege(user?.LeaderOf?.college_id ?? "");
    setSelectedCollege(user?.LeaderOf?.college_id ?? "");
  }, [setCollege, user?.LeaderOf?.college_id])

  const Passwordpattern = () => {
    if (selectedCollege) {
      verifyPassword.mutate({
        college_id: selectedCollege,
        password: teamPassword,
      });
    } else {
      toast({
        variant: "destructive",
        title: "No college selected!",
        description: "Please select a college.",
      });
      return false;
    }
  };

  return (
    <div className="">
      <Dialog>
        <DialogTrigger>
          <RegButton>{user?.LeaderOf ? "Edit Team" : "Create Team"}</RegButton>
        </DialogTrigger>
        <DialogContent className="bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-gray-950/50 via-slate-900 to-black text-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Team</DialogTitle>
            <DialogDescription>
              Fill in the information below. Click next when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Form {...form}>
              <form className="flex flex-col space-y-8">
                <FormField
                  control={form.control}
                  name="username"
                  render={() => (
                    <FormItem>
                      <FormLabel>Choose your College</FormLabel>
                      <div className="flex flex-col gap-6">
                        <div>
                          <Select
                            onValueChange={handleCollegeChange}
                            defaultValue={selectedCollege}
                            disabled={!!user?.LeaderOf?.college_id}
                          >
                            <FormControl className="text-black">
                              <SelectTrigger>
                                <SelectValue placeholder="Select your college" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {getColleges.isPending ? (
                                <SelectItem value="loading" disabled>
                                  <ImSpinner9 className="animate-spin" />
                                </SelectItem>
                              ) : (
                                getColleges.data ? getColleges.data.map((college) => (
                                  <SelectItem
                                    key={college.id}
                                    value={college.id}
                                  >
                                    {college.name}
                                  </SelectItem>
                                )) : (
                                  <SelectItem value="no-colleges" disabled>
                                    No colleges available
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                          <Label htmlFor="password">Enter team password</Label>
                          <Input
                            id="Team_Password"
                            placeholder="Team Password"
                            className="col-span-3 text-black"
                            type="password"
                            onChange={(e) => {
                              setTeamPassword(e.target.value);
                            }}
                            value={teamPassword}
                          />
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {verifyPassword.isPending ? (
                  <Button
                    type="submit"
                    size="sm"
                    className="w-[20%] self-center bg-black text-white"
                    variant={"default"}
                    disabled
                  >
                    <ImSpinner9 className="animate-spin" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    size="sm"
                    className="w-[20%] cursor-pointer self-center bg-white text-black hover:bg-black hover:text-white"
                    variant={"default"}
                    onClick={(e) => {
                      e.preventDefault();
                      Passwordpattern();
                    }}
                  >
                    Next
                  </Button>
                )}
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
