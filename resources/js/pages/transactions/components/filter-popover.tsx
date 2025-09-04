import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { ListFilter } from "lucide-react";
import Input from "@/components/composables/input";
import Button from "@/components/composables/button";
import DatePicker from "@/components/composables/date-picker";

import { router, usePage } from "@inertiajs/react";
import React, { useState } from "react";

export default function Filter({ filters }: any) {
    const { props }: any = usePage();

    const [form, setForm] = useState({
        name: filters?.name || "",
        startDate: filters?.startDate || undefined,
        endDate: filters?.endDate || undefined,
    });

    const handleChange = (key: string, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        router.get(
            "/transactions",
            { ...form },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handleCancel = () => {
        setForm({
            name: "",
            startDate: undefined,
            endDate: undefined,
        });

        router.get(
            "/transactions",
            {},
            { preserveState: false, preserveScroll: true },
        );
    };

    const FilterForm = () => (
        <div className="space-y-4">
            <h1 className="font-semibold">Filter Actions</h1>

            <Input
                label="Name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Name"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
        </div>
    );

    return (
        <main>
            {/* Desktop Popover */}
            <div className="hidden md:block">
                <Popover>
                    <PopoverTrigger className="hover:bg-sand/50 p-2 cursor-pointer block rounded">
                        <ListFilter size={16} />
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <FilterForm />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Mobile Drawer */}
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger className="hover:bg-sand/50 p-2 cursor-pointer block rounded">
                        <ListFilter size={16} />
                    </SheetTrigger>
                    <SheetContent
                        side="bottom"
                        className="h-[90vh] overflow-y-auto"
                    >
                        <SheetHeader>
                            <SheetTitle>Filter Actions</SheetTitle>
                        </SheetHeader>
                        <div className="mt-4">
                            <FilterForm />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </main>
    );
}

// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover";

// import { ListFilter } from "lucide-react";
// import Input from "@/components/composables/input";
// import Button from "@/components/composables/button";
// import DatePicker from "@/components/composables/date-picker";

// import { router, usePage } from "@inertiajs/react";
// import React, { useState } from "react";

// interface FilterProps {
//     onApply: (filters: {
//         status: string;
//         startDate: Date | undefined;
//         endDate: Date | undefined;
//     }) => void;
// }

// export default function Filter({ filters }: any) {
//     const { props }: any = usePage();

//     const [startDate, setStartDate] = React.useState<Date>();
//     const [endDate, setEndDate] = React.useState<Date>();

//     const [form, setForm] = useState({
//         name: filters?.name || "",
//         startDate: filters?.startDate || undefined,
//         endDate: filters?.endDate || undefined,
//     });

//     const handleChange = (key: string, value: any) => {
//         setForm((prev) => ({ ...prev, [key]: value }));
//     };

//     const handleSubmit = () => {
//         router.get(
//             "/transactions",
//             { ...form },
//             { preserveState: true, preserveScroll: true },
//         );
//     };

//     const handleCancel = () => {
//         setForm({
//             name: "",
//             startDate: undefined,
//             endDate: undefined,
//         });

//         router.get(
//             "/transactions",
//             {},
//             { preserveState: false, preserveScroll: true },
//         );
//     };
//     return (
//         <>
//             <main>
//                 <Popover>
//                     <PopoverTrigger className="hover:bg-sand/50 p-2 cursor-pointer block rounded">
//                         <ListFilter size={16} />
//                     </PopoverTrigger>
//                     <PopoverContent className="space-y-4">
//                         <h1 className="font-semibold">Filter Actions</h1>

//                         <Input
//                             label="Name"
//                             value={form.name}
//                             onChange={(e) =>
//                                 handleChange("name", e.target.value)
//                             }
//                             placeholder="Name"
//                         />

//                         <div className="grid grid-cols-2 gap-2">
//                             <DatePicker
//                                 label="Start"
//                                 date={form.startDate}
//                                 setDate={(d) => handleChange("startDate", d)}
//                                 placeholder="Start date"
//                             />
//                             <DatePicker
//                                 label="End"
//                                 date={form.endDate}
//                                 setDate={(d) => handleChange("endDate", d)}
//                                 placeholder="End date"
//                             />
//                         </div>

//                         <div className="mt-2 grid grid-cols-2 gap-2">
//                             <Button
//                                 variant="outline"
//                                 shape="rounded"
//                                 onClick={handleCancel}
//                             >
//                                 Cancel
//                             </Button>
//                             <Button shape="rounded" onClick={handleSubmit}>
//                                 Submit
//                             </Button>
//                         </div>
//                     </PopoverContent>
//                 </Popover>
//             </main>
//         </>
//     );
// }
