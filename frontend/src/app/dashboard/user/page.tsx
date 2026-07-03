import {
    Field,
} from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button"
import { Search, Filter, Plus } from "lucide-react";
import Table from "./components/table";
import UsersPagination from "./components/pagination";

export default function UsersPage() {
    return (
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
                        <Button variant="outline" className="p-3 text-white bg-black/90" size="sm">
                            <Plus /> Add user
                        </Button>
                    </div>
                </div>

                {/** Users table */}
                <Table />
                <UsersPagination />
            </div>
        </div>
    )
}