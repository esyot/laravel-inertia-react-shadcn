"use client";

import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { router, useForm } from "@inertiajs/react";

const ROLES = [
    "user",
    "supervisor",
    "lineman",
    "admin",
    "cashier",
    "auditor",
    "staff",
];

interface UserRoleDialogProps {
    user: {
        id: number;
        name: string;
        roles?: string[];
    };
}

export function UserRoleDialog({ user }: UserRoleDialogProps) {
    const [open, setOpen] = React.useState(false);
    const [pendingRoles, setPendingRoles] = React.useState<string[]>([]);

    const { post, processing } = useForm();

    const handleAddRole = (role: string) => {
        setPendingRoles((prev) => [...prev, role]);
    };

    const handleRemoveRole = (role: string) => {
        setPendingRoles((prev) => prev.filter((r) => r !== role));
    };

    const handleSave = () => {
        router.post(
            `/users/${user.id}/roles`,
            { roles: pendingRoles },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setOpen(false);
                },
            },
        );
    };
    const availableRoles = ROLES.filter((role) => !pendingRoles.includes(role));

    React.useEffect(() => {
        if (open) {
            setPendingRoles(user.roles || []);
        }
    }, [open, user.roles]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Manage Role
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Manage Roles for {user.name}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-sm mb-2">
                            Current Roles
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {pendingRoles.length > 0 ? (
                                pendingRoles.map((role, idx) => (
                                    <Badge
                                        key={idx}
                                        variant="secondary"
                                        className="cursor-pointer"
                                        onClick={() => handleRemoveRole(role)}
                                    >
                                        {role} ✕
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-gray-500 text-sm">
                                    No roles assigned
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm mb-2">Add Role</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {availableRoles.length > 0 ? (
                                availableRoles.map((role) => (
                                    <Button
                                        key={role}
                                        size="sm"
                                        variant="outline"
                                        disabled={processing}
                                        onClick={() => handleAddRole(role)}
                                    >
                                        {role}
                                    </Button>
                                ))
                            ) : (
                                <span className="text-gray-500 text-sm">
                                    All roles assigned
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={processing}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={processing}>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
