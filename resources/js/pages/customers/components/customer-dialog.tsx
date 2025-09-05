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
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";

export function AddCustomerDialog() {
    const [open, setOpen] = React.useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        municipal: "",
        barangay: "",
        purok: "",
        status: "Active",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/customers", {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    onClick={() => setOpen(true)}
                    className="cursor-pointer"
                >
                    Add Customer
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Customer</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    {/* Name */}
                    {/* Name */}
                    <div className="grid gap-2 sm:grid-cols-4 sm:items-center">
                        <Label htmlFor="name" className="sm:text-right">
                            Name
                        </Label>
                        <div className="sm:col-span-3">
                            <Input
                                id="name"
                                placeholder="Enter name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Municipal */}
                    {/* Municipal */}
                    <div className="grid gap-2 sm:grid-cols-4 sm:items-center">
                        <Label htmlFor="municipal" className="sm:text-right">
                            Municipal
                        </Label>
                        <div className="sm:col-span-3">
                            <Input
                                id="municipal"
                                placeholder="Enter municipality"
                                value={data.municipal}
                                onChange={(e) =>
                                    setData("municipal", e.target.value)
                                }
                            />
                            {errors.municipal && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.municipal}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Barangay */}
                    <div className="grid gap-2 sm:grid-cols-4 sm:items-center">
                        <Label htmlFor="barangay" className="sm:text-right">
                            Barangay
                        </Label>
                        <div className="sm:col-span-3">
                            <Input
                                id="barangay"
                                placeholder="Enter barangay"
                                value={data.barangay}
                                onChange={(e) =>
                                    setData("barangay", e.target.value)
                                }
                            />
                            {errors.barangay && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.barangay}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Purok */}
                    {/* Purok */}
                    <div className="grid gap-2 sm:grid-cols-4 sm:items-center">
                        <Label htmlFor="purok" className="sm:text-right">
                            Purok
                        </Label>
                        <div className="sm:col-span-3">
                            <Input
                                id="purok"
                                placeholder="Enter purok"
                                value={data.purok}
                                onChange={(e) =>
                                    setData("purok", e.target.value)
                                }
                            />
                            {errors.purok && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.purok}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Status */}
                    <div className="grid gap-2 sm:grid-cols-4 sm:items-center">
                        <Label htmlFor="status" className="sm:text-right">
                            Status
                        </Label>

                        <div className="sm:col-span-3">
                            <Select
                                value={data.status}
                                onValueChange={(v) => setData("status", v)}
                            >
                                <SelectTrigger
                                    id="status"
                                    aria-invalid={!!errors.status}
                                    className={`w-full ${
                                        errors.status
                                            ? "border-red-500 focus:ring-red-500"
                                            : ""
                                    }`}
                                >
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Active">
                                        Active
                                    </SelectItem>
                                    <SelectItem value="Terminated">
                                        Terminated
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            {errors.status && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.status}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                        <Button
                            variant="outline"
                            className="cursor-pointer w-full sm:w-auto"
                            type="button"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full sm:w-auto"
                        >
                            <span className="inline-flex items-center gap-2 cursor-pointer">
                                {processing && (
                                    <svg
                                        className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            className="opacity-25"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                )}
                                {processing ? "Adding..." : "Add Customer"}
                            </span>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
