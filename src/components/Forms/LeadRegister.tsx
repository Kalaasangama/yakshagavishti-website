import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { Button } from "src/components/ui/button"
import {Form, FormControl, FormDescription, FormItem, FormField, FormLabel, FormMessage} from "src/components/ui/form"
import { DialogContent, DialogDescription, Dialog, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "src/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "src/components/ui/select"
import { Input } from "src/components/ui/input"
import { Label } from 'src/components/ui/label'
import { Checkbox } from '../ui/checkbox'
import Dropzone from '../Dropzone'
import { toast } from '../ui/use-toast'

const roles = [
	{ label: "SHANTHANU", value: "cloe25kiq0000ileox49h4d1j" },
	{ label: "MANTRI SUNEETHI", value: "cloe265zk0002ileolpspexsb" },
	{ label: "TAAMRAAKSHA", value: "cloe27f110003ileorzfmoe05" },
	{ label: "TAMAALAKETHU", value: "cloe27f110004ileolbv67nnz" },
	{ label: "SATHYAVATHI", value: "cloe27f110005ileomce87hnz" },
	{ label: "DAASHARAJA", value: "cloe27f110006ileobsf7jpot" },
	{ label: "DEVAVRATHA", value: "cloe27f110007ileoc5l1vb44" },
];

let availableRoles: {
	label: string;
	value: string;
}[] = roles;

const LeadRegister = () => {
    const [files, setFiles] = useState<(File & { preview: string })[]>([]);
	const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
	const [selectedRole, setSelectedRole] = useState<string>("");
	const [LeaderCharacter, setLeaderCharacter] = useState<string | null>(null);
	const [LeaderContact, setLeaderContact] = useState<string>("");
	const [teammateEmail, setTeammateEmail] = useState("");

    const form = useForm()	
    const handleRoleChange = (value: string) => {
		setLeaderCharacter(value);
		console.log(roles);
		console.log(value);
	};

	//Field Validation for Team Lead
	const Passwordpattern = () => {
		const phoneregx = "^[6-9][0-9]{9}$";
		if (teammateEmail && teammateEmail.includes("@")) {	
				if (!LeaderContact.match(phoneregx)) {
					toast({
						variant: "destructive",
						title: "Invalid Phone number!",
						description: "Check the entered phone number",
					});
					return false;
				}
				toast({
					variant: "default",
					title: "Team Lead Registered Successfully!",
					description: `Team Leader has been registered successfully.`,
				});
				availableRoles = roles.filter(
					(roles) => roles.value !== LeaderCharacter
				);
				// setStateForm("secondform");	
		} else {
			toast({
				variant: "destructive",
				title: "Invalid Email ID!",
				description: "Please enter a valid email id.",
			});
			return false;
		}
		if(isCheckboxChecked){
			if (!LeaderCharacter) {
				toast({
					variant: "destructive",
					title: "No Character selected!",
					description: "Please select a Character.",
				});
				return false;
			}
			if (files.length === 0) {
				toast({
					variant: "destructive",
					title: "No ID uploaded!",
					description: "Please upload your ID.",
				});
				return false;
			}
		}
	};
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Team</Button>
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
			  <div className='flex flex-col gap-6'>
				<div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email" >Email</Label>
      <Input type="email" id="email" placeholder="Enter your Email" defaultValue={teammateEmail} onChange={(e) => {
																		if (e)
																			setTeammateEmail(e.target.value);
																	}} />
	  </div>
			  </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="phone" >Phone number</Label>
      <Input type="tel" id="phone" placeholder="Enter your Phone number" className="col-span-3"
												maxLength={10}
												minLength={10}
												defaultValue={LeaderContact}
												onChange={(e) => {setLeaderContact(e.target.value);
												}} />
	  </div>
    </div>        
    <div className="flex-cols flex gap-2">
												<div className="mt-1">
													<Checkbox
														name="character"
														id="character"
														className="bg-white"
														checked={isCheckboxChecked}
														onClick={() => {console.log("Checkbox clicked");
															if (isCheckboxChecked) {
																setSelectedRole("");
															}
															setIsCheckboxChecked(
																!isCheckboxChecked
															);
														}}
													/>
												</div>
												<div>
													<FormDescription className="mt-1 text-white">
														<label htmlFor="character">Do you have a Character in the play</label>
													</FormDescription>
												</div>
											</div>
											{isCheckboxChecked && (
												<React.Fragment>
													<FormLabel className="mt-4 text-white">
														Choose your Character
													</FormLabel>
													<Select
														onValueChange={
															handleRoleChange
														}
														defaultValue={
															LeaderCharacter
																? LeaderCharacter
																: undefined
														}>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Select the Character" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{roles.map(
																(item, key) => {
																	return (
																		<SelectItem key={key}
																			value={item.value}>
																			{
																				item.label
																			}
																		</SelectItem>
																	);
																}
															)}
														</SelectContent>
													</Select>
													<FormDescription>
														Choose the Character you
														are Playing.
													</FormDescription>
													<FormLabel className="mt-5 text-white">
														Drop Image of your ID
													</FormLabel>
													<div className="grid grid-cols-3">
														<div className="col-span-3">
															<Dropzone files={files} setFiles={setFiles}/>
														</div>
													</div>
													<FormMessage />
												</React.Fragment>
											)}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='bg-white text-white hover:bg-gray-200'
		variant={"button"}
		onClick={(e) => {
			e.preventDefault();
			Passwordpattern();
			// setLeaderRole();
		}}
		>Next</Button>
      </form>
    </Form>
        </div>
              </DialogContent>
    </Dialog>
  )
}
export default LeadRegister