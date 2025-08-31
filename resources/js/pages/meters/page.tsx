import { MeterTable } from "./components/meterTable";
import Layout from "../layout";
import SectionContent from "../components/section-content";
import { router, usePage } from "@inertiajs/react";
import { AddMeterReadingDialog } from "./components/meterDialog";
import SectionHeader from "../components/section-header";
import React, { useState } from "react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { ListFilter } from "lucide-react";
import Input from "@/components/composables/input";
import Button from "@/components/composables/button";
import DatePicker from "@/components/composables/date-picker";

type Customer = {
    code: string;
};

interface FilterProps {
    onApply: (filters: {
        status: string;
        startDate: Date | undefined;
        endDate: Date | undefined;
    }) => void;
}

export default function Index({ readings, filters }: any) {
    const { props }: any = usePage();

    const [startDate, setStartDate] = React.useState<Date>();
    const [endDate, setEndDate] = React.useState<Date>();

    const [form, setForm] = useState({
        code: filters?.code || "",
        name: filters?.name || "",
        municipal: filters?.municipal || "",
        meter: filters?.meter || "",
        brgy: filters?.brgy || "",
        startDate: filters?.startDate || undefined,
        endDate: filters?.endDate || undefined,
    });

    const handleChange = (key: string, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        router.get(
            "/meters",
            { ...form },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handleCancel = () => {
        setForm({
            code: "",
            name: "",
            municipal: "",
            meter: "",
            brgy: "",
            startDate: undefined,
            endDate: undefined,
        });

        router.get(
            "/meters",
            {},
            { preserveState: false, preserveScroll: true },
        );
    };

    const handleDelete = (readings: any) => {
        if (confirm(`Are you sure you want to delete ${readings.name}?`)) {
            router.delete(`/meters/${readings.id}`);
        }
    };
    return (
        <main>
            <Layout>
                <SectionHeader className="flex items-center justify-between">
                    <h1 className="text-lg font-semibold">Meter Readings</h1>

                    <div className="flex gap-6 items-center">
                        <Popover>
                            <PopoverTrigger className="hover:bg-sand/50 p-2 cursor-pointer block rounded">
                                <ListFilter size={16} />
                            </PopoverTrigger>
                            <PopoverContent className="space-y-4">
                                <h1 className="font-semibold">
                                    Filter Actions
                                </h1>

                                <Input
                                    label="Code"
                                    value={form.code}
                                    onChange={(e) =>
                                        handleChange("code", e.target.value)
                                    }
                                    placeholder="Code"
                                />
                                <Input
                                    label="Name"
                                    value={form.name}
                                    onChange={(e) =>
                                        handleChange("name", e.target.value)
                                    }
                                    placeholder="Name"
                                />
                                <Input
                                    label="Municipal"
                                    value={form.municipal}
                                    onChange={(e) =>
                                        handleChange(
                                            "municipal",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Municipal"
                                />
                                <Input
                                    label="Meter"
                                    value={form.meter}
                                    onChange={(e) =>
                                        handleChange("meter", e.target.value)
                                    }
                                    placeholder="Meter"
                                />
                                <Input
                                    label="Brgy"
                                    value={form.brgy}
                                    onChange={(e) =>
                                        handleChange("brgy", e.target.value)
                                    }
                                    placeholder="Brgy"
                                />

                                <div className="grid grid-cols-2 gap-2">
                                    <DatePicker
                                        label="Start"
                                        date={form.startDate}
                                        setDate={(d) =>
                                            handleChange("startDate", d)
                                        }
                                        placeholder="Start date"
                                    />
                                    <DatePicker
                                        label="End"
                                        date={form.endDate}
                                        setDate={(d) =>
                                            handleChange("endDate", d)
                                        }
                                        placeholder="End date"
                                    />
                                </div>

                                <div className="mt-2 grid grid-cols-2 gap-2">
                                    <Button
                                        variant="outline"
                                        shape="rounded"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        shape="rounded"
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>

                        <AddMeterReadingDialog />
                    </div>
                </SectionHeader>
                <SectionContent header={false}>
                    <MeterTable readings={readings} onDelete={handleDelete} />
                </SectionContent>
            </Layout>
        </main>
    );
}
