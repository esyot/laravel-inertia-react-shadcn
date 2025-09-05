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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DeleteDialog from "./delete-dialog";
type UserTableProps = {
    users: Paginated<User>;
    onView?: (user: User) => void;
    onDelete: (user: User) => void;
    showHistory?: boolean;
};

export function UserTable({ users, onDelete }: UserTableProps) {
    const data = users?.data ?? [];

    const goToPage = (page: number) => {
        if (page >= 1 && page <= users.last_page) {
            router.get(`/users?page=${page}`);
        }
    };

    return (
        <div className="space-y-4 px-4 border-strong overflow-hidden rounded-xl border">
            <Table>
                <TableCaption>A list of users with actions.</TableCaption>
                <TableHeader>
                    <TableRow className="text-weak border-strong hidden grid-cols-3 border-b pt-4 pb-3 text-sm font-medium md:grid">
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="flex justify-end mr-16 ">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody className="h-[calc(100vh-17.5rem)] divide-y divide-gray-200 overflow-y-scroll scroll-smooth">
                    {data.length > 0 ? (
                        data.map((user, index) => (
                            <TableRow
                                className="grid md:grid-cols-3 md:items-center"
                                key={index}
                            >
                                <TableCell className="text-md text-gray-700 leading-relaxed">
                                    {user.name}
                                </TableCell>
                                <TableCell className="text-md text-gray-700 leading-relaxed">
                                    {user.email}
                                </TableCell>
                                <TableCell className="flex items-center justify-end gap-2">
                                    <div className="hidden sm:flex gap-2 items-center gap-4">
                                        <ViewDialog user={user} />{" "}
                                        <UserChangePass user={user} />{" "}
                                        <DeleteDialog
                                            user={user}
                                            onDelete={onDelete}
                                        />
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
                                                className="shadow-2xl border border-gray-300 space-y-2 p-4 block flex flex-col items-start"
                                            >
                                                <DropdownMenuItem asChild>
                                                    <ViewDialog user={user} />
                                                </DropdownMenuItem>

                                                <DropdownMenuItem asChild>
                                                    <UserChangePass
                                                        user={user}
                                                    />
                                                </DropdownMenuItem>

                                                <DeleteDialog
                                                    user={user}
                                                    onDelete={onDelete}
                                                />
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={3}
                                className="text-center text-gray-500 py-4"
                            >
                                No users found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>
                            <div className="text-weak flex flex-col items-center justify-between gap-3 border-t px-6 py-3 text-sm font-medium md:flex-row">
                                <div className="flex items-center gap-3">
                                    <button
                                        className="h-8 rounded-full border px-3 py-1 font-bold text-[#222222] hover:bg-gray-100 disabled:opacity-60 disabled:hover:bg-transparent cursor-pointer"
                                        disabled={users.current_page <= 1}
                                        onClick={() =>
                                            goToPage(users.current_page - 1)
                                        }
                                    >
                                        Previous
                                    </button>
                                    <button
                                        className="h-8 rounded-full border px-3 py-1 font-bold text-[#222222] hover:bg-gray-100 disabled:opacity-60 disabled:hover:bg-transparent cursor-pointer"
                                        disabled={
                                            users.current_page >=
                                            users.last_page
                                        }
                                        onClick={() =>
                                            goToPage(users.current_page + 1)
                                        }
                                    >
                                        Next
                                    </button>
                                </div>
                                <span>
                                    Page {users.current_page} of{" "}
                                    {users.last_page}
                                </span>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}
