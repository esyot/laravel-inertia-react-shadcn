import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import { formatDate } from "@/components/utils/dataFormatter";

type User = {
    name: string;
    hasPaymentDue?: boolean;
};

import type { Customer, Paginated } from "@/lib/interface/types";
import { router } from "@inertiajs/react";

type UserTableProps = {
    customers: Paginated<Customer>;
    showHistory?: boolean;
};

export function TransactionTable({ customers }: UserTableProps) {
    const data = customers?.data ?? [];

    const goToPage = (page: number) => {
        if (page >= 1 && page <= customers.last_page) {
            router.get(`/transactions?page=${page}`);
        }
    };

    const handlePaginate = (url: string) => {
        router.visit(url, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getPages = () => {
        const pages = [];
        for (let i = 1; i <= customers.last_page; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="border-strong overflow-hidden rounded-xl border">
            <div className="bg-sand-dugout text-weak border-strong hidden grid-cols-6  border-b px-5 pt-4 pb-3 text-sm font-medium md:grid">
                <div>Name</div>
                <div>Code</div>
                <div>Amount Paid</div>
                <div>Payment Method</div>
                <div>Date</div>
                <div className="flex justify-end mr-16">Action</div>
            </div>

            <div className="h-[calc(100vh-17.5rem)] divide-y divide-gray-200 overflow-y-scroll scroll-smooth">
                {data.length > 0 ? (
                    data.map((user) => (
                        <div
                            key={user.id}
                            className="px-6 py-4 hover:bg-gray-50"
                        >
                            <div className="grid gap-3 md:grid-cols-6 md:items-center">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-[#222222]">
                                        {user.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-gray-600 font-mono">
                                        {user.code || "—"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-semibold text-[#222222]">
                                        {user.last_paid_bill
                                            ? `₱${Number(user.last_paid_bill.amount_due).toFixed(2)}`
                                            : "—"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-[#222222]">
                                        {user.last_paid_bill?.transaction
                                            ?.payment_method
                                            ? user.last_paid_bill.transaction.payment_method
                                                  .replace(/_/g, " ")
                                                  .toUpperCase()
                                            : "—"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <span className="text-sm text-[#222222] capitalize">
                                        {formatDate(user.created_at)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-end">
                                    <Button variant="outline">
                                        View History
                                    </Button>
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
                        disabled={customers.current_page <= 1}
                        onClick={() => goToPage(customers.current_page - 1)}
                    >
                        Previous
                    </button>
                    <button
                        className="h-8 rounded-full border px-3 py-1 font-bold text-[#222222] hover:bg-gray-100 disabled:opacity-60 disabled:hover:bg-transparent"
                        disabled={customers.current_page >= customers.last_page}
                        onClick={() => goToPage(customers.current_page + 1)}
                    >
                        Next
                    </button>
                </div>
                <span>
                    Page {customers.current_page} of {customers.last_page}
                </span>
            </div>
        </div>
    );
}
