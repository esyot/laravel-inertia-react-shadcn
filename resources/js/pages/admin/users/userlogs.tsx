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

type UserLog = {
    id: number;
    user_id: number;
    name: string;
    device: string;
    timestamp: string;
};

type UserLogsTableProps = {
    logs: UserLog[];
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
                            {/* <Button 
                                variant="destructive"
                                onClick={() => handleDelete(log)}
                                >Delete
                            </Button> */}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total Logs: {logs.length}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
