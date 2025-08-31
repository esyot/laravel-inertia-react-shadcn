import {
    Table,
    TableBody,
    TableCell,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";

type Customer = {
    id: number;
    name: string;
    municipal: string;
    barangay: string;
    purok?: string | null;
    code: string;
};

type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
};

type CustomerTableProps = {
    customers: Paginated<Customer>;
    onView?: (customer: Customer) => void; // for later
    onDelete?: (customer: Customer) => void; // for later
};

export function CustomerTable({ customers }: CustomerTableProps) {
    const goToPage = (page: number) => {
        if (page >= 1 && page <= customers.last_page) {
            router.get(`/customers?page=${page}`); // reload data from backend
        }
    };

    const handleView = (c: Customer) => {
        // temp redirect using code
        router.visit(`/customers/${c.code}`);
    };

    const getPages = () => {
        const pages = [];
        for (let i = 1; i <= customers.last_page; i++) {
            pages.push(i);
        }
        return pages;
    };

    const prevDisabled = customers.current_page === 1;
    const nextDisabled = customers.current_page === customers.last_page;

    return (
        <Table>
            <TableCaption>A list of customers with actions.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Municipal</TableHead>
                    <TableHead>Barangay</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {customers.data.map((customer, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">
                            {customer.name}
                        </TableCell>
                        <TableCell>{customer.municipal}</TableCell>
                        <TableCell>{customer.barangay}</TableCell>
                        <TableCell>{customer.code}</TableCell>
                        <TableCell className="text-right">
                            <Button
                                className="cursor-pointer"
                                variant="outline"
                                size="sm"
                                onClick={() => handleView(customer)}
                            >
                                View
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
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
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    goToPage(
                                                        customers.current_page -
                                                            1,
                                                    )
                                                }
                                                // disabled={
                                                //     customers.current_page === 1
                                                // }
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
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    goToPage(
                                                        customers.current_page +
                                                            1,
                                                    )
                                                }
                                                // disabled={
                                                //     customers.current_page ===
                                                //     customers.last_page
                                                // }
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
    );
}
