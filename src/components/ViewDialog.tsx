import React, { useState } from 'react'
import ViewTeam from 'src/components/ViewTeam'
import { Button } from "src/components/ui/button"
import { DialogContent, DialogDescription, Dialog, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "src/components/ui/dialog"

export default function CollegeReg() {
 
  
  return (
    <div className=''>
	  <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline" className=''>View Team</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-gray-950/50 via-slate-900 to-black text-white">
        <DialogHeader>
          <DialogTitle>View Team</DialogTitle>
          <DialogDescription>
          View your team details here.
          </DialogDescription>
        </DialogHeader>
       <ViewTeam />
              </DialogContent>
    </Dialog>
    </div>
  )
}

