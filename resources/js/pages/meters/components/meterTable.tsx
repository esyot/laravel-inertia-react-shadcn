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
            router.get(`/meters?page=${page}`); // reload data from backend
        }
    };

    return (
        <div className="space-y-4">
            {/* Meter Reading Table */}
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
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            goToPage(readings.current_page - 1)
                                        }
                                        disabled={readings.current_page === 1}
                                    >
                                        Previous
                                    </Button>
                                    <span>
                                        Page {readings.current_page} of{" "}
                                        {readings.last_page}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            goToPage(readings.current_page + 1)
                                        }
                                        disabled={
                                            readings.current_page ===
                                            readings.last_page
                                        }
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}
