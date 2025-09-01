import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import type { Log } from "@/lib/interface/types";

type UserLogsTableProps = {
    logs: Log[];
};

export function UserLogsTable({ logs }: UserLogsTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {logs.map((log, index) => (
                    <TableRow key={index}>
                        <TableCell>{log.name}</TableCell>
                        <TableCell>{log.device}</TableCell>
                        <TableCell>{log.timestamp}</TableCell>
                        <TableCell className="text-center">
                            <Button variant="outline">View Details</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={4}>Total Logs: {logs.length}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
