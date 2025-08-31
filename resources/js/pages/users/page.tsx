import { users } from "./data/users";
import { UserTable } from "./components/list";
import Layout from "../layout";
import { AddUserDialog } from "./components/user-dialog";
import SectionContent from "../components/section-content";
import { router, usePage } from "@inertiajs/react";
import SectionHeader from "../components/section-header";
import React from "react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Input from "@/components/composables/input";
import { ListFilter } from "lucide-react";
import DatePicker from "@/components/composables/date-picker";
import Button from "@/components/composables/button";

interface FilterProps {
    onApply: (filters: {
        status: string;
        startDate: Date | undefined;
        endDate: Date | undefined;
    }) => void;
}

export default function HomePage({ users }: any) {
    const { props }: any = usePage();
    const { flash } = props as any;

    const [startDate, setStartDate] = React.useState<Date>();
    const [endDate, setEndDate] = React.useState<Date>();

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
                    <SectionHeader className="flex justify-between items-center">
                        {flash.success && (
                            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                                {flash.success}
                            </div>
                        )}
                        {flash.delete && (
                            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                                {flash.delete}
                            </div>
                        )}

                        <h2 className="text-lg font-semibold">User List</h2>

                        <div className="flex gap-6 items-center">
                            <Popover>
                                <PopoverTrigger className=" hover:bg-sand/50 p-2 cursor-pointer block rounded">
                                    <ListFilter size={16} />
                                </PopoverTrigger>
                                <PopoverContent className="space-y-4">
                                    <h1 className="font-semibold">
                                        Filter Actions
                                    </h1>

                                    <Input label="Code" placeholder="Code" />
                                    <Input label="Name" placeholder="Name" />
                                    <Input
                                        label="Municipal"
                                        placeholder="Municipal"
                                    />
                                    <Input label="Meter" placeholder="Meter" />
                                    <Input label="Brgy" placeholder="Brgy" />

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
                                        <Button shape="rounded"> Submit</Button>
                                    </div>
                                </PopoverContent>
                            </Popover>

                            <AddUserDialog />
                        </div>
                    </SectionHeader>
                    <SectionContent header={true}>
                        <section>
                            <UserTable
                                users={users}
                                onView={handleView}
                                onDelete={handleDelete}
                            />
                        </section>
                    </SectionContent>
                </Layout>
            </main>
        </div>
    );
}
