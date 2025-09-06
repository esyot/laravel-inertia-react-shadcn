import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import type { Log, Paginated } from "@/lib/interface/types";
import { router } from "@inertiajs/react";

type UserLogsTableProps = {
    logs: Paginated<Log>;
};

export function UserLogsTable({ logs }: UserLogsTableProps) {
    const data = logs?.data ?? [];

    const goToPage = (page: number) => {
        if (page >= 1 && page <= logs.last_page) {
            router.get(`/logs?page=${page}`);
        }
    };

    return (
        <div className="space-y-4 px-4 border-strong overflow-hidden rounded-xl border">
            <Table>
                <TableHeader>
                    <TableRow className="text-weak border-strong hidden grid-cols-3 border-b pt-4 pb-3 text-sm font-medium md:grid">
                        <TableHead className="flex items-center">
                            Name
                        </TableHead>
                        <TableHead className="flex items-center">
                            Device
                        </TableHead>
                        <TableHead className="flex justify-end mr-16 items-center">
                            Timestamp
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="h-[calc(100vh-17.5rem)] divide-y divide-gray-200 overflow-y-scroll scroll-smooth">
                    {data.length > 0 ? (
                        data.map((log, index) => (
                            <TableRow
                                className="grid md:grid-cols-3 md:items-center"
                                key={index}
                            >
                                <TableCell className="text-md text-gray-700 leading-relaxed sm:font-normal font-bold">
                                    {log.name}
                                </TableCell>
                                <TableCell className="text-md text-gray-700 leading-relaxed">
                                    {log.device}
                                </TableCell>
                                <TableCell className="text-md text-gray-700 leading-relaxed flex md:justify-end mr-10 flex items-center justify-between">
                                    {log.timestamp}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={3}
                                className="text-center text-gray-500 py-4"
                            >
                                No logs found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>
                            <div className="text-weak flex flex-col items-center justify-between gap-3 border-t px-6 py-3 text-sm font-medium md:flex-row">
                                <div className="flex items-center gap-3">
                                    <button
                                        className="h-8 rounded-full border px-3 py-1 font-bold text-[#222222] hover:bg-gray-100 disabled:opacity-60 disabled:hover:bg-transparent cursor-pointer"
                                        disabled={logs.current_page <= 1}
                                        onClick={() =>
                                            goToPage(logs.current_page - 1)
                                        }
                                    >
                                        Previous
                                    </button>
                                    <button
                                        className="h-8 rounded-full border px-3 py-1 font-bold text-[#222222] hover:bg-gray-100 disabled:opacity-60 disabled:hover:bg-transparent cursor-pointer"
                                        disabled={
                                            logs.current_page >= logs.last_page
                                        }
                                        onClick={() =>
                                            goToPage(logs.current_page + 1)
                                        }
                                    >
                                        Next
                                    </button>
                                </div>
                                <span>
                                    Page {logs.current_page} of {logs.last_page}
                                </span>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}
