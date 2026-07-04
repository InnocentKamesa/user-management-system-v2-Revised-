"use client";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button"
import { Search, Filter, Plus } from "lucide-react";
import Table from "./components/table";
import UsersPagination from "./components/pagination";
import { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"


const API_URL = "http://localhost:5000";

export default function UsersPage() {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [addUser, setAddUser] = useState(false);
    const [pageActive, setPageActive] = useState(true);

    useEffect(() => {

        async function fetchUsers() {
            setLoading(true);

            setTimeout(async () => {

                try {
                    const response = await fetch(`${API_URL}/admin/user/all`, {
                        method: "GET",
                        credentials: 'include',
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });
                    if (!response.ok) {
                        setPageActive(true);

                        if (response.status === 400) {
                            const errorData = await response.json();
                            console.error("Error fetching users:", errorData.message);
                        }

                        throw new Error("Failed to fetch users");

                    }
                    const data = await response.json();
                    console.log(data.users);
                    setUsers(data.users);
                    setPageActive(true);
                } catch (error) {
                    console.error("Error fetching users:", error);
                } finally {
                    setLoading(false);
                }
            }, 2000);


        }
        fetchUsers();
    }, [])
    return (
        <div>
            {loading && (
                <div className="flex w-screen justify-center items-center h-screen">
                    <Spinner className="w-12 h-12 text-gray-500" />
                </div>
            )}
            {addUser && (
                <form className="flex  bg-gray-100 m-auto shadow-md rounded-md p-4 max-w-[60%] max-h-[60%]">
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="fieldgroup-name">Username</FieldLabel>
                            <Input id="fieldgroup-name" placeholder="Jordan Lee" />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
                            <Input
                                id="fieldgroup-email"
                                type="email"
                                placeholder="name@example.com"
                            />
                            <FieldDescription>
                                We&apos;ll send updates to this address.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="fieldgroup-name">Password</FieldLabel>
                            <Input id="fieldgroup-name" type="password" placeholder="Jordan Lee" />
                        </Field>
                        <Field orientation="horizontal">
                            <Button type="reset" variant="outline">
                                Reset
                            </Button>
                            <Button onClick={() => {setAddUser(false); setPageActive(true)}} type="submit">Submit</Button>
                        </Field>
                    </FieldGroup>
                </form>
            )}
            {pageActive &&
                <div>
                    {/* top content */}
                    <div className="flex flex-col gap-2 ">
                        <h3 className="text-lg font-bold">User management</h3>
                        <p className="text-sm">Manage your team members and their permissions here.</p>
                    </div>

                    <div className="flex flex-col gap-2 mt-4">
                        {/* top table content*/}
                        <div className="flex flex-row items-center">
                            <p className="font-bold text-md">All Users</p>
                            <div className="flex flex-row gap-2 items-center ml-auto">
                                {/** Search */}
                                <Field className="p-3">
                                    <InputGroup>
                                        <InputGroupInput id="input-group-url" placeholder="Search" />
                                        <InputGroupAddon>
                                        </InputGroupAddon>
                                        <InputGroupAddon align="inline-end">
                                            <Search />
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Field>

                                {/** Filter*/}
                                <Button variant="outline" className="p-3" size="sm">
                                    <Filter /> Filter
                                </Button>

                                {/** Add user */}
                                <Button variant="outline" onClick={() => { setAddUser(true); setPageActive(false); }} className="p-3 text-white bg-black/90" size="sm">
                                    <Plus /> Add user
                                </Button>
                            </div>
                        </div>

                        {/** Users table */}
                        <Table users={users} />
                        <UsersPagination />
                    </div>
                </div >
            }
        </div>
    )
}
