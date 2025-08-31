import {
    Table,
    TableBody,
    TableCell,
    TableCaption,
    TableHead,
    TableHeader,
    TableFooter,
    TableRow,
} from "@/components/ui/table";
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

type CustomerTableProps = {
    customers: Customer[];
    onView?: (customer: Customer) => void; // for later
    onDelete?: (customer: Customer) => void; // for later
};

export function CustomerTable({ customers }: CustomerTableProps) {
    const handleView = (c: (typeof customers)[number]) => {
        // temp redirect using code
        router.visit(`/customers/${c.code}`);
    };

    if (!customers.length) {
        return (
            <div className="text-sm text-muted-foreground p-4">
                No customers found.
            </div>
        );
    }

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
                {customers.map((customer, index) => (
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
                    <TableCell colSpan={5}>
                        Total Customers: {customers.length}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
