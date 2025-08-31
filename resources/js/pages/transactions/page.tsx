import Layout from "../layout";
import { users } from "../users/data/users";
import SectionHeader from "../components/section-header";
import SectionContent from "../components/section-content";

import { TransactionTable } from "./components/transactionHistoryTable";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Input from "@/components/composables/input";
import { ListFilter } from "lucide-react";
import DatePicker from "@/components/composables/date-picker";
import React from "react";
import Button from "@/components/composables/button";

interface FilterProps {
    onApply: (filters: {
        status: string;
        startDate: Date | undefined;
        endDate: Date | undefined;
    }) => void;
}

export default function Transaction() {
    const [startDate, setStartDate] = React.useState<Date>();
    const [endDate, setEndDate] = React.useState<Date>();

    return (
        <Layout>
            <SectionHeader className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Transactions</h1>

                <div className="flex gap-6 items-center">
                    <Popover>
                        <PopoverTrigger className=" hover:bg-sand/50 p-2 cursor-pointer block rounded">
                            <ListFilter size={16} />
                        </PopoverTrigger>
                        <PopoverContent className="space-y-4">
                            <h1 className="font-semibold">Filter Actions</h1>

                            <Input label="Code" placeholder="Code" />
                            <Input label="Name" placeholder="Name" />
                            <Input label="Municipal" placeholder="Municipal" />
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
                                <Button variant="outline" shape="rounded">
                                    Cancel
                                </Button>
                                <Button shape="rounded"> Submit</Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </SectionHeader>
            <SectionContent header={false}>
                <TransactionTable users={users} />
            </SectionContent>
        </Layout>
    );
}
