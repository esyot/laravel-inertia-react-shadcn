import React from "react";
import { router } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import Layout from "../layout";
import SectionContent from "../components/section-content";

interface Customer {
    id: number;
    name: string;
    municipal: string;
    barangay: string;
    purok: string | null;
    code: string;
    status: "Active" | "Terminated";
    created_at: string;
    updated_at: string;
}

interface Props {
    customers: {
        data: Customer[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
}

export default function List({ customers }: Props) {
    const handleAddCustomer = () => {
        alert("Add customer functionality would open here!");
    };

    const handleRowClick = (customerCode: string) => {
        router.visit(`/customers/${customerCode}`);
    };

    const handleEdit = (customerCode: string, e: React.MouseEvent) => {
        e.stopPropagation();
        alert(`Edit customer ${customerCode}`);
    };

    const handleDelete = (customerCode: string, e: React.MouseEvent) => {
        e.stopPropagation();
        alert(`Delete customer ${customerCode}`);
    };

    return (
        <main>
            <Layout>
                <SectionContent header={false}>
                    <div className="mb-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-3 mb-3">
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900">
                                    Customers
                                </h1>
                                <p className="mt-1 text-sm text-gray-600">
                                    Showing {customers.from} to {customers.to}{" "}
                                    of {customers.total} results
                                </p>
                            </div>
                            <div className="flex gap-3 w-full sm:w-auto">
                                <div className="relative flex-1 sm:flex-initial">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search customers..."
                                        className="pl-8 sm:w-[300px]"
                                    />
                                </div>
                                <Button
                                    onClick={handleAddCustomer}
                                    className="bg-indigo-600 hover:bg-indigo-700"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Customer
                                </Button>
                            </div>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-center">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {customers.data.map((customer) => (
                                    <TableRow
                                        key={customer.id}
                                        className="cursor-pointer hover:bg-muted/50"
                                        onClick={() =>
                                            handleRowClick(customer.code)
                                        }
                                    >
                                        <TableCell className="pl-6 font-medium">
                                            {customer.name}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className="font-mono"
                                            >
                                                {customer.code}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">
                                                    {customer.barangay}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    {customer.municipal}
                                                    {customer.purok &&
                                                        `, ${customer.purok}`}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    customer.status === "Active"
                                                        ? "default"
                                                        : "destructive"
                                                }
                                                className={
                                                    customer.status === "Active"
                                                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                                                        : "bg-red-100 text-red-800 hover:bg-red-100"
                                                }
                                            >
                                                {customer.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        className="cursor-pointer"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">
                                                            Actions
                                                        </span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        onSelect={() =>
                                                            handleRowClick(
                                                                customer.code,
                                                            )
                                                        }
                                                    >
                                                        View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onSelect={(e) =>
                                                            handleEdit(
                                                                customer.code,
                                                                e as unknown as React.MouseEvent,
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="text-red-600"
                                                        onSelect={(e) =>
                                                            handleDelete(
                                                                customer.code,
                                                                e as unknown as React.MouseEvent,
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        <div className="mt-6">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href={
                                                customers.current_page > 1
                                                    ? `?page=${customers.current_page - 1}`
                                                    : "#"
                                            }
                                            className={
                                                customers.current_page === 1
                                                    ? "pointer-events-none opacity-50"
                                                    : ""
                                            }
                                        />
                                    </PaginationItem>

                                    {customers.links
                                        .slice(1, -1)
                                        .map((link, index) => (
                                            <PaginationItem key={index}>
                                                <PaginationLink
                                                    href={link.url || "#"}
                                                    isActive={link.active}
                                                    className={
                                                        !link.url
                                                            ? "pointer-events-none opacity-50"
                                                            : ""
                                                    }
                                                >
                                                    {link.label}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}

                                    <PaginationItem>
                                        <PaginationNext
                                            href={
                                                customers.current_page <
                                                customers.last_page
                                                    ? `?page=${customers.current_page + 1}`
                                                    : "#"
                                            }
                                            className={
                                                customers.current_page ===
                                                customers.last_page
                                                    ? "pointer-events-none opacity-50"
                                                    : ""
                                            }
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </SectionContent>
            </Layout>
        </main>
    );
}
