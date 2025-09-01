import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { ListFilter } from "lucide-react";
import Input from "@/components/composables/input";
import Button from "@/components/composables/button";
import DatePicker from "@/components/composables/date-picker";

import { router, usePage } from "@inertiajs/react";
import React, { useState } from "react";

interface FilterProps {
    onApply: (filters: {
        status: string;
        startDate: Date | undefined;
        endDate: Date | undefined;
    }) => void;
}

export default function Filter({ filters }: any) {
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
    return (
        <>
            <main>
                <Popover>
                    <PopoverTrigger className="hover:bg-sand/50 p-2 cursor-pointer block rounded">
                        <ListFilter size={16} />
                    </PopoverTrigger>
                    <PopoverContent className="space-y-4">
                        <h1 className="font-semibold">Filter Actions</h1>

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
                                handleChange("municipal", e.target.value)
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
                                setDate={(d) => handleChange("startDate", d)}
                                placeholder="Start date"
                            />
                            <DatePicker
                                label="End"
                                date={form.endDate}
                                setDate={(d) => handleChange("endDate", d)}
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
                            <Button shape="rounded" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </main>
        </>
    );
}
