import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/components/utils/dataFormatter";
import { router } from "@inertiajs/react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import { DeleteAlertDialog } from "./delete-dialog";
import type { Meter } from "@/lib/interface/types";

type Customer = {
    code: string;
};

type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
};

type MeterProps = {
    readings: Paginated<Meter>;
    onDelete: (reading: Meter) => void;
};

export function MeterTable({ readings, onDelete }: MeterProps) {
    const data = readings?.data ?? [];

    const goToPage = (page: number) => {
        if (page >= 1 && page <= readings.last_page) {
            router.get(`/meters?page=${page}`);
        }
    };

    const getPages = () => {
        const pages = [];
        for (let i = 1; i <= readings.last_page; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="border-strong overflow-hidden rounded-xl border">
            <div className="bg-sand-dugout text-weak border-strong hidden grid-cols-6 border-b px-5 pt-4 pb-3 text-sm font-medium md:grid">
                <div>Code</div>
                <div>Month</div>
                <div>Year</div>
                <div>Meter Value</div>
                <div>Timestamp</div>
                <div className="flex justify-end mr-16">Action</div>
            </div>

            <div className="h-[calc(100vh-17.5rem)] divide-y divide-gray-200 overflow-y-scroll scroll-smooth">
                {data.length > 0 ? (
                    data.map((reading) => (
                        <div
                            key={reading.id}
                            className="px-6 py-4 hover:bg-gray-50"
                        >
                            <div className="grid gap-3 md:grid-cols-6 md:items-center">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-[#222222]">
                                        {reading.customer?.code}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-[#222222]">
                                        {reading.month}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-[#222222]">
                                        {reading.year}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-[#222222]">
                                        {reading.meter_value}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <span className="text-sm font-medium text-[#222222] capitalize">
                                        {formatDate(reading.created_at)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-end">
                                    <DeleteAlertDialog
                                        itemName={`meter reading for ${reading.customer?.code}`}
                                        onConfirm={() => onDelete(reading)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="px-6 py-4 text-center text-gray-500">
                        No transactions found
                    </div>
                )}
            </div>

            <div className="text-weak flex flex-col items-center justify-between gap-3 border-t px-6 py-3 text-sm font-medium md:flex-row">
                <div className="flex items-center gap-3">
                    <button
                        className="h-8 rounded-full border px-3 py-1 font-bold text-[#222222] hover:bg-gray-100 disabled:opacity-60 disabled:hover:bg-transparent"
                        disabled={readings.current_page <= 1}
                        onClick={() => goToPage(readings.current_page - 1)}
                    >
                        Previous
                    </button>
                    <button
                        className="h-8 rounded-full border px-3 py-1 font-bold text-[#222222] hover:bg-gray-100 disabled:opacity-60 disabled:hover:bg-transparent"
                        disabled={readings.current_page >= readings.last_page}
                        onClick={() => goToPage(readings.current_page + 1)}
                    >
                        Next
                    </button>
                </div>
                <span>
                    Page {readings.current_page} of {readings.last_page}
                </span>
            </div>
        </div>
    );
}
