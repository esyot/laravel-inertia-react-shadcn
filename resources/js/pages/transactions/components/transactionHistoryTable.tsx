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

type User = {
    name: string;
    email: string;
    address: string;
    hasPaymentDue?: boolean;
};

type UserTableProps = {
    users: User[];
    showHistory?: boolean;
};

export function TransactionTable({
    users,
    showHistory = false,
}: UserTableProps) {
    return (
        <div className="space-y-4">
            <Table>
                <TableCaption>
                    {showHistory
                        ? "A list of past transactions."
                        : "Customers that may need to pay."}
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">
                                {user.name}
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.address}</TableCell>
                            <TableCell className="text-right">
                                {showHistory ? (
                                    <Button variant="outline" size="sm">
                                        View History
                                    </Button>
                                ) : user.hasPaymentDue ? (
                                    <Button variant="destructive" size="sm">
                                        Pay Now
                                    </Button>
                                ) : (
                                    <span className="text-gray-500">
                                        No Action
                                    </span>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={4}>Total: {users.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}
