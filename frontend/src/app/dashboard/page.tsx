"use client";

import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button"
import { Search, Filter, Plus, ChevronDown } from "lucide-react";
import Table from "./components/table";
import UsersPagination from "./components/pagination";
import React, { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import  {useRouter} from "next/navigation";
import {PageWrapper} from "../../components/page-wrapper";

const API_URL = "http://localhost:5000/api";

export default function DashboardPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [addUser, setAddUser] = useState(false);
    const [pageActive, setPageActive] = useState(true);
    const [role, setRole] = React.useState("Standard");
    const [formData, setFormData] = useState({ username: "", email: "", password: "" })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    {/**Fetch all users */}
    useEffect(() => {

        async function fetchUsers() {
            setLoading(true);

            setTimeout(async () => {

                try {
                    const response = await fetch(`${API_URL}/admin/user/all`, {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });
                    if (!response.ok) {
                        setPageActive(true);

                        if (response.status === 400) {
                            const errorData = await response.json();
                            router.push("/login");
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

        {/**handle submit */}
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const fullForm = { ...formData, role: role };
        console.log("Form data submitted:", fullForm);

        //call API
        try {
            const response = await fetch(`${API_URL}/admin/user/add/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fullForm)
            });
            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 400) {
                    console.log("400: ", errorData.message, errorData.error)
                }
                throw new Error("Server did not return success")
            }
            setTimeout(() => {
                console.log("reached");
                setLoading(false);
                setPageActive(true);
            }, 2000);
        }
        catch (error) {
            console.error("Error: ", error)
        }
    }

    {/**change role */}
    const onChangeRole = async(id, role) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/admin/user/change-role/`, {
                method:"POST",
                credentials:'include',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({id:id, role:role})
            });
            if(!response.ok){
                setLoading(false);
                const {message} = await response.json()
                throw new Error("failed to change user role", message)
            }
            setTimeout(() => {setLoading(false);window.location.reload()}, 2000);
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <PageWrapper>
        <div>
            {loading && (
                <div className="flex flex-col gap-2 w-screen h-screen justify-center items-center">
                    <Spinner className="w-12 h-12 text-gray-500" />
                    <p>Loading </p>
                </div>
            )}
            {addUser && (
                <form onSubmit={handleSubmit} className="flex fixed inset-0 z-50 items-center justify-center m-auto">
                    <div className="absolute flex inset-0 bg-white/40 backdrop-blur-lg transition-opacity" onClick={() => { setPageActive(true); setAddUser(false) }}>
                        <FieldGroup onClick={(e) => e.stopPropagation()} className="max-w-md w-full relative z-10 bg-white rounded-xl shadow-xl border border-gray-100 p-6 transform  transition-all m-auto">
                            {/**Username */}
                            <Field>
                                <FieldLabel htmlFor="fieldgroup-name">Username</FieldLabel>
                                <Input onChange={handleChange} required id="fieldgroup-name" placeholder="Jordan Lee" name="username" />
                            </Field>

                            {/**Email */}
                            <Field>
                                <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
                                <Input
                                    id="fieldgroup-email"
                                    type="email"
                                    onChange={handleChange}
                                    name="email"
                                    placeholder="name@example.com"
                                    required
                                />
                                <FieldDescription>
                                    We&apos;ll send updates to this address.
                                </FieldDescription>
                            </Field>

                            {/**Password */}
                            <Field>
                                <FieldLabel htmlFor="fieldgroup-name">Password</FieldLabel>
                                <Input onChange={handleChange} required id="fieldgroup-name" type="password" name="password" placeholder="Jordan Lee" />
                            </Field>

                            {/**Role dropdown */}
                            <Field>
                                <FieldLabel htmlFor="input-group-url">Role</FieldLabel>
                                <InputGroup>
                                    <InputGroupInput name="role" onChange={handleChange} value={role} id="input-group-url" placeholder="example.com" readOnly />
                                    <InputGroupAddon align="inline-end">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild><ChevronDown className="w-4 h-4" /></DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-32">
                                                <DropdownMenuGroup>
                                                    <DropdownMenuLabel>Roles</DropdownMenuLabel>
                                                    <DropdownMenuRadioGroup value={role} onValueChange={setRole}>
                                                        <DropdownMenuRadioItem value="Administrator">Administrator</DropdownMenuRadioItem>
                                                        <DropdownMenuRadioItem value="Moderator">Moderator</DropdownMenuRadioItem>
                                                        <DropdownMenuRadioItem value="Standard">Standard</DropdownMenuRadioItem>
                                                    </DropdownMenuRadioGroup>
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Field>

                            {/**Submit */}
                            <Field orientation="horizontal">
                                <Button type="reset" variant="outline">
                                    Reset
                                </Button>
                                <Button type="submit">Submit</Button>
                            </Field>
                        </FieldGroup>
                    </div>
                </form>
            )}
            {pageActive &&
                <div>
                    {/* top content */}
                    <div className="flex flex-col gap-2 ">
                        <h3 className="text-lg font-bold">Dashboard</h3>
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
                        <Table users={users} changeUserRole={onChangeRole} />
                        <UsersPagination />
                    </div>
                </div >
            }
        </div>
        </PageWrapper>
    )
}


