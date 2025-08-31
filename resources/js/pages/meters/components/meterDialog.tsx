"use client";

import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export function AddMeterReadingDialog() {
    const [open, setOpen] = React.useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        customer_id: "",
        month: "",
        year: new Date().getFullYear().toString(),
        meter_value: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post("/meters", {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)}>Add Meter</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Meter Reading</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    {/* Customer ID */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="customer_id" className="text-right">
                            Customer ID
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="customer_id"
                                type="number"
                                value={data.customer_id}
                                onChange={(e) =>
                                    setData("customer_id", e.target.value)
                                }
                                placeholder="Enter customer ID"
                            />
                            {errors.customer_id && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.customer_id}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Month */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="month" className="text-right">
                            Month
                        </Label>
                        <div className="col-span-3">
                            <select
                                id="month"
                                value={data.month}
                                onChange={(e) =>
                                    setData("month", e.target.value)
                                }
                                className="w-full border rounded-md p-2"
                            >
                                <option value="">-- Select Month --</option>
                                {MONTHS.map((m) => (
                                    <option key={m} value={m}>
                                        {m}
                                    </option>
                                ))}
                            </select>
                            {errors.month && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.month}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Year */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="year" className="text-right">
                            Year
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="year"
                                type="number"
                                value={data.year}
                                onChange={(e) =>
                                    setData("year", e.target.value)
                                }
                                placeholder="Enter year"
                            />
                            {errors.year && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.year}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Meter Value */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="meter_value" className="text-right">
                            Meter Value
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="meter_value"
                                type="number"
                                value={data.meter_value}
                                onChange={(e) =>
                                    setData("meter_value", e.target.value)
                                }
                                placeholder="Enter meter value"
                            />
                            {errors.meter_value && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.meter_value}
                                </p>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? "Saving..." : "Save"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
