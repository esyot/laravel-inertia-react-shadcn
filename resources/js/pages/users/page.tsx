import { users } from "./data/users";
import { UserTable } from "./components/list";
import Layout from "../layout";
import { AddUserDialog } from "./components/user-dialog";
import SectionContent from "../components/section-content";
import SectionHeader from "../components/section-header";
import { router, usePage } from "@inertiajs/react";
import React, { useState } from "react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Input from "@/components/composables/input";
import { ListFilter } from "lucide-react";
import DatePicker from "@/components/composables/date-picker";
import Button from "@/components/composables/button";
import { UserLogsTable } from "../admin/users/userlogs";
import { cn } from "@/lib/utils";

export default function HomePage({ users, logs }: any) {
    const { props }: any = usePage();
    const { flash } = props as any;

    const [startDate, setStartDate] = React.useState<Date>();
    const [endDate, setEndDate] = React.useState<Date>();
    const [activeTab, setActiveTab] = useState<"users" | "logs">("users");

    const handleView = (user: any) => {
        alert(`Viewing ${user.name}`);
    };

    const handleDelete = (user: any) => {
        if (confirm(`Are you sure you want to delete ${user.name}?`)) {
            router.delete(`/users/${user.id}`);
        }
    };

    return (
        <div>
            <main>
                <Layout>
                    {flash.success && (
                        <div className="m-2 rounded-md p-3 bg-green-100 text-green-700 rounded">
                            {flash.success}
                        </div>
                    )}
                    {flash.delete && (
                        <div className="m-2 rounded-md p-3 bg-red-100 text-red-700 rounded">
                            {flash.delete}
                        </div>
                    )}

                    <SectionHeader>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4">
                            <div>
                                <nav className="flex space-x-6 border-b border-gray-200">
                                    <button
                                        className={cn(
                                            "pb-2 transition",
                                            activeTab === "users"
                                                ? "border-b-2 border-blue-500 text-blue-600 font-semibold"
                                                : "text-gray-500 hover:text-gray-700",
                                        )}
                                        onClick={() => setActiveTab("users")}
                                    >
                                        Users
                                    </button>
                                    <button
                                        className={cn(
                                            "pb-2 transition",
                                            activeTab === "logs"
                                                ? "border-b-2 border-blue-500 text-blue-600 font-semibold"
                                                : "text-gray-500 hover:text-gray-700",
                                        )}
                                        onClick={() => setActiveTab("logs")}
                                    >
                                        User Logs
                                    </button>
                                </nav>
                            </div>

                            {/* Right side: Filter + Add button */}
                            <div className="flex items-center gap-4">
                                <Popover>
                                    <PopoverTrigger className="hover:bg-gray-100 p-2 cursor-pointer rounded border">
                                        <ListFilter size={16} />
                                    </PopoverTrigger>
                                    <PopoverContent className="space-y-4 w-72">
                                        <h1 className="font-semibold text-sm">
                                            Filter Actions
                                        </h1>
                                        <Input
                                            label="Code"
                                            placeholder="Code"
                                        />
                                        <Input
                                            label="Name"
                                            placeholder="Name"
                                        />
                                        <Input
                                            label="Municipal"
                                            placeholder="Municipal"
                                        />
                                        <Input
                                            label="Meter"
                                            placeholder="Meter"
                                        />
                                        <Input
                                            label="Brgy"
                                            placeholder="Brgy"
                                        />
                                        <div className="grid grid-cols-2 gap-2">
                                            <DatePicker
                                                label="Start"
                                                date={startDate}
                                                setDate={setStartDate}
                                                placeholder="Start date"
                                            />
                                            <DatePicker
                                                label="End"
                                                date={endDate}
                                                setDate={setEndDate}
                                                placeholder="End date"
                                            />
                                        </div>
                                        <div className="mt-2 grid grid-cols-2 gap-2">
                                            <Button
                                                variant="outline"
                                                shape="rounded"
                                            >
                                                Cancel
                                            </Button>
                                            <Button shape="rounded">
                                                Submit
                                            </Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                                <AddUserDialog />
                            </div>
                        </div>
                    </SectionHeader>

                    <SectionContent header={true}>
                        {activeTab === "users" && (
                            <UserTable
                                users={users}
                                onView={handleView}
                                onDelete={handleDelete}
                            />
                        )}
                        {activeTab === "logs" && <UserLogsTable logs={logs} />}
                    </SectionContent>
                </Layout>
            </main>
        </div>
    );
}
