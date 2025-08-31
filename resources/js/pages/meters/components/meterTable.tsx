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

type MeterReading = {
    id: number;
    customer_id: number;
    month: string;
    year: number;
    meter_value: number;
    timestamp: string;
};

type MeterTableProps = {
    readings: MeterReading[];
    onDelete: (reading: MeterReading) => void;
};

export function MeterTable({ readings, onDelete }: MeterTableProps) {
    return (
        <div className="space-y-4">
            {/* Meter Reading Table */}
            <Table>
                <TableCaption>
                    A list of meter readings with actions.
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Customer ID</TableHead>
                        <TableHead>Month</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Meter Value</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {readings.map((reading, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">
                                {reading.customer_id}
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
                        <TableCell colSpan={6}>
                            Total Readings: {readings.length}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}
