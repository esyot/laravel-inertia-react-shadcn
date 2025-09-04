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
import { MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User, Paginated } from "@/lib/interface/types";
import ViewDialog from "./view-dialog";
import UserChangePass from "./user-change-password";
import { router } from "@inertiajs/react";

type UserTableProps = {
    users: Paginated<User>;
    onView?: (user: User) => void;
    onDelete?: (user: User) => void;
    showHistory?: boolean;
};

export function UserTable({ users, onDelete }: UserTableProps) {
    const data = users?.data ?? [];
    const goToPage = (page: number) => {
        if (page >= 1 && page <= users.last_page) {
            router.get(`/transactions?page=${page}`);
        }
    };

    const getPages = () => {
        const pages = [];
        for (let i = 1; i <= users.last_page; i++) {
            pages.push(i);
        }
        return pages;
    };
    return (
        <div className="space-y-4 px-4">
            <Table>
                <TableCaption>A list of users with actions.</TableCaption>
                <TableHeader>
                    <TableRow className="bg-sand-dugout text-weak border-strong hidden grid-cols-3 border-b px-5 pt-4 pb-3 text-sm font-medium md:grid">
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="h-[calc(100vh-17.5rem)] divide-y divide-gray-200 overflow-y-scroll scroll-smooth">
                    {data.length > 0 ? (
                        data.map((user, index) => (
                            <TableRow
                                className="grid md:grid-cols-3 md:items-center"
                                key={index}
                            >
                                <TableCell className="text-sm font-medium text-[#222222]">
                                    {user.name}
                                </TableCell>
                                <TableCell className="text-sm font-medium text-[#222222] capitalize">
                                    {user.email}
                                </TableCell>
                                <TableCell className="flex justify-end gap-2">
                                    <div className="hidden sm:flex gap-2">
                                        <Button
                                            className="cursor-pointer"
                                            variant="outline"
                                            size="sm"
                                        >
                                            <ViewDialog user={user} />
                                        </Button>
                                        <Button
                                            variant="destructive"
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
                                    </div>

                                    <div className="sm:hidden">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="end"
                                                className="shadow-2xl border border-gray-300 space-y-2 p-6"
                                            >
                                                <DropdownMenuItem asChild>
                                                    <ViewDialog user={user} />
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="space-y-2 p-0 text-red-500 "
                                                    onClick={() =>
                                                        onDelete?.(user)
                                                    }
                                                >
                                                    Delete
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <UserChangePass
                                                        user={user}
                                                    />
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <div className="px-6 py-4 text-center text-gray-500">
                            No users found
                        </div>
                    )}
                    <div className="text-weak flex flex-col items-center justify-between gap-3 border-t px-6 py-3 text-sm font-medium md:flex-row">
                        <div className="flex items-center gap-3">
                            <button
                                className="h-8 rounded-full border px-3 py-1 font-bold text-[#222222] hover:bg-gray-100 disabled:opacity-60 disabled:hover:bg-transparent"
                                disabled={users.current_page <= 1}
                                onClick={() => goToPage(users.current_page - 1)}
                            >
                                Previous
                            </button>
                            <button
                                className="h-8 rounded-full border px-3 py-1 font-bold text-[#222222] hover:bg-gray-100 disabled:opacity-60 disabled:hover:bg-transparent"
                                disabled={users.current_page >= users.last_page}
                                onClick={() => goToPage(users.current_page + 1)}
                            >
                                Next
                            </button>
                        </div>
                        <span>
                            Page {users.current_page} of {users.last_page}
                        </span>
                    </div>
                </TableBody>
                <TableFooter>
                    <TableRow>
                        {/* <TableCell colSpan={5}>
                            Total Users: {users.length}
                        </TableCell> */}
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}
