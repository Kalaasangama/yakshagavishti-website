import { useSession } from "next-auth/react";
import { api } from "../utils/api";
import Image from "next/image";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "src/components/ui/table"
  
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]
  
  export default function TableDemo() {
    const {data:sessionData} = useSession();
    const {data,refetch} = api.admin.getRegisteredTeams.useQuery();
    const verifyIdMutation = api.admin.verifyId.useMutation();
    const editTeamAccessMutation = api.admin.grantEditAccess.useMutation();
    function verifyId(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      const userId = (e.target as HTMLElement)?.dataset?.userid;
      if (userId)
        verifyIdMutation.mutate(
          { userId: userId },
          {
            onSuccess: () => {
              refetch().catch((err) => console.log(err));
            },
            onError: (error) => {
              console.error(error);
              alert("Error reducing score");
            },
          }
        );
      else console.error("User ID is null or undefined");
    }
    function setEditAccess(
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      action: "Grant" | "Revoke"
    ) {
      const teamName = (e.target as HTMLElement)?.dataset?.teamname;
      if (teamName)
        editTeamAccessMutation.mutate(
          { teamName: teamName, action },
          {
            onError: (error) => {
              console.error(error);
              alert("Error reducing score");
            },
          }
        );
      else console.error("User ID is null or undefined");
    }

if(sessionData?.user){
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Members</TableHead>
            <TableHead>Names</TableHead>
            <TableHead>ID</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell className="text-right">{invoice.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
}