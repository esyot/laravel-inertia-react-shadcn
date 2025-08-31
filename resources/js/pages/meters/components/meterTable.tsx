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

type Customer = {
    code: string;
};
type MeterReading = {
    id: number;
    customer: Customer;
    customer_id: number;
    month: string;
    year: number;
    meter_value: number;
    created_at: string;
    updated_at: string;
};

type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
};

type MeterTableProps = {
    readings: Paginated<MeterReading>;
    onDelete: (reading: MeterReading) => void;
};

export function MeterTable({ readings, onDelete }: MeterTableProps) {
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
        <div className="space-y-4">
            <Table>
                <TableCaption>
                    A list of meter readings with actions.
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Month</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Meter Value</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {readings.data.map((reading) => (
                        <TableRow key={reading.id}>
                            <TableCell className="font-medium">
                                {reading.customer?.code}
                            </TableCell>
                            <TableCell>{reading.month}</TableCell>
                            <TableCell>{reading.year}</TableCell>
                            <TableCell>{reading.meter_value}</TableCell>
                            <TableCell>
                                {formatDate(reading.created_at)}
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                                {onDelete && (
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => onDelete(reading)}
                                    >
                                        Delete
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={6} className="p-4">
                            <div className="flex justify-between items-center w-full">
                                <span>Total: {readings.total}</span>
                                <div>
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    onClick={() =>
                                                        goToPage(
                                                            readings.current_page -
                                                                1,
                                                        )
                                                    }
                                                    disabled={
                                                        readings.current_page ===
                                                        1
                                                    }
                                                />
                                            </PaginationItem>

                                            {getPages().map((page) => (
                                                <PaginationItem key={page}>
                                                    {page ===
                                                    readings.current_page ? (
                                                        <PaginationLink
                                                            href="#"
                                                            className="bg-gray-200"
                                                        >
                                                            {page}
                                                        </PaginationLink>
                                                    ) : (
                                                        <PaginationLink
                                                            href="#"
                                                            onClick={() =>
                                                                goToPage(page)
                                                            }
                                                        >
                                                            {page}
                                                        </PaginationLink>
                                                    )}
                                                </PaginationItem>
                                            ))}

                                            <PaginationItem>
                                                <PaginationNext
                                                    onClick={() =>
                                                        goToPage(
                                                            readings.current_page +
                                                                1,
                                                        )
                                                    }
                                                    disabled={
                                                        readings.current_page ===
                                                        readings.last_page
                                                    }
                                                />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}
