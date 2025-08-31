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

export function TransactionTable({ users }: UserTableProps) {
    return (
        <div className="space-y-4">
            <Table>
                <TableCaption>A list of past transactions</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
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
                            <TableCell>4000.00</TableCell>
                            <TableCell>
                                {new Date(
                                    Date.now() -
                                        Math.floor(
                                            Math.random() *
                                                1000 *
                                                60 *
                                                60 *
                                                24 *
                                                30,
                                        ),
                                ).toLocaleString()}
                            </TableCell>

                            <TableCell>
                                <Button variant="outline">View History</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={5}>Total: {users.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}
