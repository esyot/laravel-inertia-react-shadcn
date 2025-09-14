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
        <div className="border-strong overflow-hidden rounded-xl border">
            <div className="bg-sand-dugout text-weak border-strong hidden grid-cols-4 border-b px-5 pt-4 pb-3 text-sm font-medium md:grid">
                <div>Name</div>
                <div>Email</div>
                <div>Device</div>
                <div className="flex justify-end mr-10">Timestamp</div>
            </div>

            <div className="h-[calc(100vh-17.5rem)] divide-y divide-gray-200 overflow-y-scroll scroll-smooth">
                {logs.data.length > 0 ? (
                    logs.data.map((log) => (
                        <div
                            key={log.id}
                            className="px-6 py-4 hover:bg-gray-50"
                        >
                            <div className="grid gap-3 md:grid-cols-4 md:items-center">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-[#222222] truncate">
                                        {log.name}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-600 font-mono">
                                    {log.email}
                                </div>
                                <div className="text-xs text-gray-600 font-mono">
                                    {log.device}
                                </div>
                                <div className="text-xs text-gray-600 flex items-center justify-end">
                                    {log.timestamp}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="px-6 py-4 text-center text-gray-500">
                        No logs found
                    </div>
                )}
            </div>

            <div className="text-weak flex flex-col items-center justify-between gap-3 border-t px-6 py-3 text-sm font-medium md:flex-row">
                <div className="flex items-center gap-3">
                    <button
                        className="h-8 rounded-full border px-3 py-1 font-bold text-[#222222] hover:bg-gray-100 disabled:opacity-60 disabled:hover:bg-transparent"
                        disabled={logs.current_page <= 1}
                        onClick={() => goToPage(logs.current_page - 1)}
                    >
                        Previous
                    </button>
                    <button
                        className="h-8 rounded-full border px-3 py-1 font-bold text-[#222222] hover:bg-gray-100 disabled:opacity-60 disabled:hover:bg-transparent"
                        disabled={logs.current_page >= logs.last_page}
                        onClick={() => goToPage(logs.current_page + 1)}
                    >
                        Next
                    </button>
                </div>
                <span>
                    Page {logs.current_page} of {logs.last_page} | Total:{" "}
                    {logs.total}
                </span>
            </div>
        </div>
    );
}
