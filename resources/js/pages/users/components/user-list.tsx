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

import type { User } from "@/lib/interface/types";
import ViewDialog from "./view-dialog";
import UserChangePass from "./user-change-password";

type UserTableProps = {
    users: User[];
    onView?: (user: User) => void;
    onDelete?: (user: User) => void;
};

export function UserTable({ users, onView, onDelete }: UserTableProps) {
    return (
        <div className="space-y-4 px-4">
            <Table>
                <TableCaption>A list of users with actions.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
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
                            <TableCell className="flex justify-end gap-2">
                                <Button
                                    className="cursor-pointer"
                                    variant="outline"
                                    size="sm"
                                >
                                    <ViewDialog user={user} />
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="cursor-pointer"
                                    size="sm"
                                    onClick={() => onDelete?.(user)}
                                >
                                    Delete
                                </Button>
                                <Button
                                    className="cursor-pointer"
                                    variant="outline"
                                    size="sm"
                                >
                                    <UserChangePass user={user} />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={5}>
                            Total Users: {users.length}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}
