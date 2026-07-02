import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { EllipsisVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


function NameDisplay(){
    return (
        <div className="flex flex-row gap-1">
            <Avatar className="">
               <AvatarImage src="https://github.com/shadcn.png" />
               <AvatarFallback>IK</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
                <p className="">Innocent</p>
                <p className="text-muted-foreground">innocentkamesa05@gmail.com</p>

            </div>          
        </div>
    )
}


export default function UsersTable() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]"><input type="radio"/></TableHead>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Access</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Created at</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium"><input type="radio"/></TableCell>
                    <TableCell className="font-medium"><NameDisplay/></TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell>Today</TableCell>
                    <TableCell className="text-right"><EllipsisVertical className="h-4 w-4"/></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}
