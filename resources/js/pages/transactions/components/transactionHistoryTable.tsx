import { Button } from "@/components/ui/button";
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

// type CustomersProps = {
//     customers: Customer[];
// };

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

    const getPages = () => {
        const pages = [];
        for (let i = 1; i <= customers.last_page; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="space-y-4">
            <Table>
                <TableCaption>A list of past transactions</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="flex justify-end mr-16">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length > 0 ? (
                        data.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">
                                    {user.name}
                                </TableCell>
                                <TableCell>
                                    {formatDate(user.created_at)}
                                </TableCell>
                                <TableCell className="flex justify-end">
                                    <Button variant="outline">
                                        View History
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center">
                                No transactions found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={6} className="p-4">
                            <div className="flex justify-between items-center w-full">
                                <span>Total: {customers.total}</span>
                                <div>
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    onClick={() =>
                                                        goToPage(
                                                            customers.current_page -
                                                                1,
                                                        )
                                                    }
                                                    disabled={
                                                        customers.current_page ===
                                                        1
                                                    }
                                                />
                                            </PaginationItem>

                                            {getPages().map((page) => (
                                                <PaginationItem key={page}>
                                                    {page ===
                                                    customers.current_page ? (
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
                                                            customers.current_page +
                                                                1,
                                                        )
                                                    }
                                                    disabled={
                                                        customers.current_page ===
                                                        customers.last_page
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
