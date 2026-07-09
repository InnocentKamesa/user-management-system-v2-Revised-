import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"



import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuPortal,
    DropdownMenuTrigger,
    DropdownMenuSubTrigger
} from "@/components/ui/dropdown-menu"


import { EllipsisVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


function NameDisplay({ name, email }) {
    return (
        <div className="flex flex-row gap-4 justify-center">
            <Avatar className="">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>IK</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
                <p className="">{name}</p>
                <p className="text-muted-foreground hidden md:block">{email}</p>

            </div>
        </div>
    )
}
function ActionsDropDown({changeUserRole, userId}) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <EllipsisVertical className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Edit User</DropdownMenuLabel>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Change role</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={() => changeUserRole(userId, "Administrator")}>Administrator</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => changeUserRole(userId, "Moderator")}>Moderator</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => changeUserRole(userId, "Standard")}>Standard</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>Change Password</DropdownMenuItem>
                    <DropdownMenuItem>Ban</DropdownMenuItem>
                    <DropdownMenuItem>Suspend</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-400">Deactivate</DropdownMenuItem>

                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
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
    changeUserRole: (userId: string, newRole: string) => void;
}


export default function UsersTable({ users, changeUserRole }: UserListProps) {
    return (
        <div>
            {/*mobile table */}
            <div className="md:hidden">
                <Table className="">

                    <TableHeader>
                        <TableRow className="">
                            <TableHead className="w-[20%]">Id</TableHead>
                            <TableHead className="w-[40%]">Name</TableHead>
                            <TableHead className="w-[20%]">Role</TableHead>
                            <TableHead className="w-[20%]">Active</TableHead>
                            <TableHead className="text-right w-[10%]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => {
                            console.log(user.is_active);
                            return (
                                <TableRow key={user.username} className=" ">
                                    <TableCell className="font-medium px-3">{user.id}</TableCell>
                                    <TableCell className="font-medium px-6"><NameDisplay name={user.username} email={user.email} /></TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{user.is_active ? 'true' : 'false'}</TableCell>
                                    <TableCell className="text-right"><ActionsDropDown changeUserRole={changeUserRole} userId={user.id}/></TableCell>
                                </TableRow>
                            )
                        }
                        )
                        }
                    </TableBody>
                </Table>
            </div>


            {/**Desktop table */}
            <Table className="hidden md:block">
                <TableHeader>
                    <TableRow className="*:px-4">
                        <TableHead className="w-[5%]">Id</TableHead>
                        <TableHead className="w-[20%]">Name</TableHead>
                        <TableHead className="w-[15%]">Role</TableHead>
                        <TableHead className="w-[10%]">Active</TableHead>
                        <TableHead className="w-[10%]">Created at</TableHead>
                        <TableHead className="w-[10%]">Updated at</TableHead>
                        <TableHead className="text-right w-[10%]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => {
                        console.log(user.is_active);
                        return (
                            <TableRow key={user.username}>
                                <TableCell className="font-medium">{user.id}</TableCell>
                                <TableCell className="font-medium"><NameDisplay name={user.username} email={user.email} /></TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.is_active ? 'true' : 'false'}</TableCell>
                                <TableCell>{user.createdAt}</TableCell>
                                <TableCell>{user.updatedAt}</TableCell>
                                <TableCell className="text-right"><ActionsDropDown changeUserRole={changeUserRole} userId={user.id} /></TableCell>
                            </TableRow>
                        )
                    }
                    )
                    }
                </TableBody>
            </Table>
        </div>
    )
}
