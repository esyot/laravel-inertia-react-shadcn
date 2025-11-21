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
import FilterSelect from "./filter-select";
import { router, usePage } from "@inertiajs/react";
import React, { useState, useEffect, useCallback } from "react";

export default function Filter({ filters: initialFilters }: any) {
    // Provide safe default values
    const safeFilters = initialFilters || {};

    const [form, setForm] = useState({
        name: safeFilters.name || "",
        customerCode: safeFilters.customerCode || "",
        paymentMethod: safeFilters.paymentMethod || "",
        minPrice: safeFilters.minPrice || "",
        maxPrice: safeFilters.maxPrice || "",
        startDate: safeFilters.startDate || undefined,
        endDate: safeFilters.endDate || undefined,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Sync form state with incoming filters
    useEffect(() => {
        if (initialFilters) {
            setForm({
                name: initialFilters.name || "",
                customerCode: initialFilters.customerCode || "",
                paymentMethod: initialFilters.paymentMethod || "",
                minPrice: initialFilters.minPrice || "",
                maxPrice: initialFilters.maxPrice || "",
                startDate: initialFilters.startDate || undefined,
                endDate: initialFilters.endDate || undefined,
            });
        }
    }, [initialFilters]);

    const paymentMethods = [
        { value: "", label: "All Payment Methods" },
        { value: "cash", label: "Cash" },
        { value: "credit_card", label: "Credit Card" },
        { value: "debit_card", label: "Debit Card" },
        { value: "bank_transfer", label: "Bank Transfer" },
        { value: "digital_wallet", label: "Digital Wallet" },
    ];

    const handleChange = useCallback((key: string, value: any) => {
        if ((key === "minPrice" || key === "maxPrice") && value !== "") {
            value = Number(value);
        }
        setForm((prev) => ({ ...prev, [key]: value }));
    }, []);

    const handleSubmit = useCallback(() => {
        setIsSubmitting(true);
        router.get(
            "/transactions",
            { ...form },
            {
                preserveState: true,
                preserveScroll: true,
                onFinish: () => setIsSubmitting(false),
            },
        );
    }, [form]);

    const handleCancel = useCallback(() => {
        const resetForm = {
            name: "",
            customerCode: "",
            minPrice: "",
            maxPrice: "",
            paymentMethod: "",
            startDate: undefined,
            endDate: undefined,
        };

        setForm(resetForm);
        router.get(
            "/transactions",
            {},
            { preserveState: false, preserveScroll: true },
        );
    }, []);

    const FilterForm = () => (
        <div className="space-y-4">
            <h1 className="font-semibold">Filter Actions</h1>

            <Input
                label="Name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Customer Name"
            />

            <Input
                label="Customer Code"
                value={form.customerCode}
                onChange={(e) => handleChange("customerCode", e.target.value)}
                placeholder="Customer Code"
            />

            <FilterSelect
                label="Payment Method"
                value={form.paymentMethod}
                onChange={(value) => handleChange("paymentMethod", value)}
                options={paymentMethods}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <DatePicker
                    label="Start Date"
                    date={form.startDate}
                    setDate={(d) => handleChange("startDate", d)}
                    placeholder="Start date"
                />
                <DatePicker
                    label="End Date"
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
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button
                    shape="rounded"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Applying..." : "Submit"}
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
                    <PopoverContent
                        className="w-80"
                        align="end"
                        sideOffset={10}
                    >
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
// import {
//     Sheet,
//     SheetContent,
//     SheetHeader,
//     SheetTitle,
//     SheetTrigger,
// } from "@/components/ui/sheet";
// import { ListFilter } from "lucide-react";
// import Input from "@/components/composables/input";
// import Button from "@/components/composables/button";
// import DatePicker from "@/components/composables/date-picker";
// import FilterSelect from "./filter-select";
// import { router, usePage } from "@inertiajs/react";
// import React, { useState, useEffect, useCallback } from "react";

// // Define interface for DebouncedInput props
// interface DebouncedInputProps {
//     value: string | number;
//     onChange: (value: string | number) => void;
//     label: string;
//     type?: string;
//     placeholder?: string;
// }

// // Debounced Input Component with TypeScript
// const DebouncedInput: React.FC<DebouncedInputProps> = ({
//     value,
//     onChange,
//     ...props
// }) => {
//     const [internalValue, setInternalValue] = useState<string | number>(
//         value || "",
//     );

//     useEffect(() => {
//         setInternalValue(value || "");
//     }, [value]);

//     useEffect(() => {
//         const timeoutId = setTimeout(() => {
//             if (internalValue !== value) {
//                 onChange(internalValue);
//             }
//         }, 300);

//         return () => clearTimeout(timeoutId);
//     }, [internalValue, onChange, value]);

//     return (
//         <Input
//             value={internalValue}
//             onChange={(e) => setInternalValue(e.target.value)}
//             {...props}
//         />
//     );
// };

// export default function Filter({ filters: initialFilters }: any) {
//     // Provide safe default values
//     const safeFilters = initialFilters || {};

//     const [form, setForm] = useState({
//         name: safeFilters.name || "",
//         customerCode: safeFilters.customerCode || "",
//         paymentMethod: safeFilters.paymentMethod || "",
//         minPrice: safeFilters.minPrice || "",
//         maxPrice: safeFilters.maxPrice || "",
//         startDate: safeFilters.startDate || undefined,
//         endDate: safeFilters.endDate || undefined,
//     });

//     const [isSubmitting, setIsSubmitting] = useState(false);

//     // Sync form state with incoming filters
//     useEffect(() => {
//         if (initialFilters) {
//             setForm({
//                 name: initialFilters.name || "",
//                 customerCode: initialFilters.customerCode || "",
//                 paymentMethod: initialFilters.paymentMethod || "",
//                 minPrice: initialFilters.minPrice || "",
//                 maxPrice: initialFilters.maxPrice || "",
//                 startDate: initialFilters.startDate || undefined,
//                 endDate: initialFilters.endDate || undefined,
//             });
//         }
//     }, [initialFilters]);

//     const paymentMethods = [
//         { value: "", label: "All Payment Methods" },
//         { value: "cash", label: "Cash" },
//         { value: "credit_card", label: "Credit Card" },
//         { value: "debit_card", label: "Debit Card" },
//         { value: "bank_transfer", label: "Bank Transfer" },
//         { value: "digital_wallet", label: "Digital Wallet" },
//     ];

//     const handleChange = useCallback((key: string, value: any) => {
//         if ((key === "minPrice" || key === "maxPrice") && value !== "") {
//             value = Number(value);
//         }
//         setForm((prev) => ({ ...prev, [key]: value }));
//     }, []);

//     const handleSubmit = useCallback(() => {
//         setIsSubmitting(true);
//         router.get(
//             "/transactions",
//             { ...form },
//             {
//                 preserveState: true,
//                 preserveScroll: true,
//                 onFinish: () => setIsSubmitting(false),
//             },
//         );
//     }, [form]);

//     const handleCancel = useCallback(() => {
//         const resetForm = {
//             name: "",
//             customerCode: "",
//             paymentMethod: "",
//             startDate: undefined,
//             endDate: undefined,
//         };

//         setForm(resetForm);
//         router.get(
//             "/transactions",
//             {},
//             { preserveState: false, preserveScroll: true },
//         );
//     }, []);

//     const FilterForm = () => (
//         <div className="space-y-4">
//             <h1 className="font-semibold">Filter Actions</h1>

//             <DebouncedInput
//                 label="Name"
//                 value={form.name}
//                 onChange={(value) => handleChange("name", value)}
//                 placeholder="Customer Name"
//             />

//             <DebouncedInput
//                 label="Customer Code"
//                 value={form.customerCode}
//                 onChange={(value) => handleChange("customerCode", value)}
//                 placeholder="Customer Code"
//             />

//             <FilterSelect
//                 label="Payment Method"
//                 value={form.paymentMethod}
//                 onChange={(value) => handleChange("paymentMethod", value)}
//                 options={paymentMethods}
//             />

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                 <DatePicker
//                     label="Start Date"
//                     date={form.startDate}
//                     setDate={(d) => handleChange("startDate", d)}
//                     placeholder="Start date"
//                 />
//                 <DatePicker
//                     label="End Date"
//                     date={form.endDate}
//                     setDate={(d) => handleChange("endDate", d)}
//                     placeholder="End date"
//                 />
//             </div>

//             <div className="mt-2 grid grid-cols-2 gap-2">
//                 <Button
//                     variant="outline"
//                     shape="rounded"
//                     onClick={handleCancel}
//                     disabled={isSubmitting}
//                 >
//                     Cancel
//                 </Button>
//                 <Button
//                     shape="rounded"
//                     onClick={handleSubmit}
//                     disabled={isSubmitting}
//                 >
//                     {isSubmitting ? "Applying..." : "Submit"}
//                 </Button>
//             </div>
//         </div>
//     );

//     return (
//         <main>
//             {/* Desktop Popover */}
//             <div className="hidden md:block">
//                 <Popover>
//                     <PopoverTrigger className="hover:bg-sand/50 p-2 cursor-pointer block rounded">
//                         <ListFilter size={16} />
//                     </PopoverTrigger>
//                     <PopoverContent
//                         className="w-80"
//                         align="end"
//                         sideOffset={10}
//                     >
//                         <FilterForm />
//                     </PopoverContent>
//                 </Popover>
//             </div>

//             {/* Mobile Drawer */}
//             <div className="md:hidden">
//                 <Sheet>
//                     <SheetTrigger className="hover:bg-sand/50 p-2 cursor-pointer block rounded">
//                         <ListFilter size={16} />
//                     </SheetTrigger>
//                     <SheetContent
//                         side="bottom"
//                         className="h-[90vh] overflow-y-auto"
//                     >
//                         <SheetHeader>
//                             <SheetTitle>Filter Actions</SheetTitle>
//                         </SheetHeader>
//                         <div className="mt-4">
//                             <FilterForm />
//                         </div>
//                     </SheetContent>
//                 </Sheet>
//             </div>
//         </main>
//     );
// }
