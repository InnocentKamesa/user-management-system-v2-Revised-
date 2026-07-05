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


function NameDisplay({name, email}){
    return (
        <div className="flex flex-row gap-1">
            <Avatar className="">
               <AvatarImage src="https://github.com/shadcn.png" />
               <AvatarFallback>IK</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
                <p className="">{name}</p>
                <p className="text-muted-foreground">{email}</p>

            </div>          
        </div>
    )
}

interface User {
  id: number; 
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface UserListProps {
  users: User[]; // Accepts an array of users
}


export default function UsersTable({users}:UserListProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow className="*:px-4">
                    <TableHead>Id</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead>Created at</TableHead>
                    <TableHead>Updated at</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map( (user) => {
                    console.log(user.is_active);
                    return (
                <TableRow key={user.username}>
                    <TableCell className="font-medium">{user.id}</TableCell>       
                    <TableCell className="font-medium"><NameDisplay name={user.username} email={user.email}/></TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.is_active ? 'true' : 'false'}</TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell>{user.updatedAt}</TableCell>
                    <TableCell className="text-right"><EllipsisVertical className="h-4 w-4"/></TableCell>
                </TableRow>
                    )
                }
            )
        }
            </TableBody>
        </Table>
    )
}
