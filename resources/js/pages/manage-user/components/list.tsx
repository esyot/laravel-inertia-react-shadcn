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
import { AddUserDialog } from "../components/user-dialog";

type User = {
    name: string;
    email: string;
    address: string;
};

type UserTableProps = {
    users: User[];
    onView?: (user: User) => void;
    onDelete?: (user: User) => void;
    onAdd?: () => void;
};

export function UserTable({ users, onView, onDelete, onAdd }: UserTableProps) {
    return (
        <div className="space-y-4">
            {/* Add User button */}
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">User List</h2>
                <AddUserDialog onAdd={onAdd} />
            </div>

            {/* User Table */}
            <Table>
                <TableCaption>A list of users with actions.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
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
                            <TableCell className="flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onView?.(user)}
                                >
                                    View
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => onDelete?.(user)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={4}>
                            Total Users: {users.length}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}
