"use client";

import * as React from "react";
import axios from "axios";
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
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";

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

type Customer = {
    id: number;
    code: string;
};

export function AddMeterReadingDialog() {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [results, setResults] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearchCustomer = (val: string) => {
        setLoading(true);
        axios
            .get(`/customers/search?query=${search}`)
            .then((res) => {
                setResults(res.data);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        customer_code: "",
        month: "",
        year: new Date().getFullYear().toString(),
        meter_value: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post("/meters", {
            onSuccess: () => {
                reset();
                setSearch("");
                setResults([]);
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)}>Add Meter</Button>
            </DialogTrigger>
            <DialogContent className="sm:min-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Meter Reading</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    {/* Customer Code */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="customer_code" className="text-right">
                            Customer Code
                        </Label>
                        <div className="col-span-3">
                            <Input
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    const val = e.currentTarget.value;
                                    setSearch(val);
                                    handleSearchCustomer(val);
                                }}
                                placeholder="Enter your customer code (e.g. SAGB-SC-P1-NS8DSK31GP)"
                                className="w-full border-2 p-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent"
                            />

                            {loading && (
                                <div className="absolute bg-white w-full border-2 border-gray-200 rounded-xl shadow-lg mt-2 p-4 text-gray-600 text-lg">
                                    Searching...
                                </div>
                            )}

                            {results.length > 0 && (
                                <ul className="absolute bg-white w-full border-2 border-gray-200 rounded-xl shadow-lg mt-2 max-h-80 overflow-y-auto z-10 text-lg">
                                    {results.map((customer) => (
                                        <li
                                            key={customer.id}
                                            className="px-6 py-4 hover:bg-blue-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                                            onClick={() => {
                                                setSearch(customer.code);
                                                setData(
                                                    "customer_code",
                                                    customer.code,
                                                );
                                                setResults([]);
                                            }}
                                        >
                                            <div className="font-bold text-gray-800">
                                                {customer.code}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {errors.customer_code && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.customer_code}
                                </p>
                            )}
                            {/* <Input
                                id="customer_code"
                                type="text"
                                value={data.customer_code}
                                onChange={(e) =>
                                    setData("customer_code", e.target.value)
                                }
                                placeholder="Enter customer code"
                            />
                            {errors.customer_code && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.customer_code}
                                </p>
                            )} */}
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
