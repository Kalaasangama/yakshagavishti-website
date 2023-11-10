import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "src/components/ui/button"
import {Form, FormControl, FormDescription, FormItem, FormField, FormLabel, FormMessage} from "src/components/ui/form"
import { DialogContent, DialogDescription, Dialog, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "src/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "src/components/ui/select"
import { Input } from "src/components/ui/input"
import { Label } from 'src/components/ui/label'
import { toast } from '../ui/use-toast'
export default function CollegeReg() {
  const [selectedCollege, setSelectedCollege] = useState<string>("");
  const [teamPassword, setTeamPassword] = useState("");
  // const [stateForm, setStateForm] = useState("firstform");
    const form = useForm()	
    const handleCollegeChange = (value: string) => {
      setSelectedCollege(value);
      console.log(value);
    };

    const Passwordpattern = () => {
      const passwordRegex =
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      const phoneregx = "^[6-9][0-9]{9}$";
      if (selectedCollege) {
        if (teamPassword.match(passwordRegex)) {
          toast({
            variant: "default",
            title: "College Registered Successfully!",
            description: `Your college has been registered successfully.`,
          });
          // setStateForm("secondform");
        } else {
          toast({
            variant: "destructive",
            title: "Weak Password",
            description:
              "Password should contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number and atleast 1 special character ",
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "No college selected",
          description: "Please select a college!",
        });
        return false;
      }
    };
  
  return (
    <div className=''>
	  <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline" className=''>Create Team</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-gray-950/50 via-slate-900 to-black text-white">
        <DialogHeader>
          <DialogTitle>Create Team</DialogTitle>
          <DialogDescription>
          Fill in the information below. Click next when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose your College</FormLabel>
			  <div className='flex flex-col gap-6'>
				<div>
              <Select onValueChange={
													handleCollegeChange
												}
												defaultValue={selectedCollege}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your college" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="clonw0pqr0002x9jhoauzw7ov">Alvas College, Moodabidri</SelectItem>
                  <SelectItem value="clonw0pqq0000x9jhfb6la6qb">Dayanand Pai Satish Pai College Carstreet</SelectItem>
                  <SelectItem value="clonw0pqs0003x9jh2nnf2v5v">Govinda Dasa Degree College, Suratkal</SelectItem>
                  <SelectItem value="clo4ms7s30002vjjs7r9r9on1">SDM Law College, Mangalore</SelectItem>
                  <SelectItem value="clonw0pqr0001x9jhhushh0ig">SDPT First Grade College, Kateelu</SelectItem>
                </SelectContent>
              </Select>
			  </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="password" >Enter team password</Label>
      <Input id="Team_Password"
												placeholder="Team Password"
												className="col-span-3"
												type="password"
												onChange={(e) => {
													setTeamPassword(
														e.target.value
													);
												}}
												value={teamPassword} />
	  </div>
    </div>
            <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='bg-white text-white hover:bg-gray-200' variant={"button"}
								onClick={(e) => {
									e.preventDefault();
									Passwordpattern();
								}} >Next</Button>
      </form>
    </Form>
        </div>
              </DialogContent>
    </Dialog>
    </div>
  )
}

