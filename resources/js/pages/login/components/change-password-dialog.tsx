"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, router } from "@inertiajs/react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/interface/types";

type ChangePasswordProps = {
    user: User;
};

export default function ChangePasswordDialog({ user }: ChangePasswordProps) {
    const mustForce = useMemo(
        () => Boolean(user && !user.is_password_changed),
        [user],
    );
    const [open, setOpen] = useState(false);

    const { data, setData, patch, processing, errors, reset } = useForm({
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        if (mustForce) setOpen(true);
    }, [mustForce]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch("/password", {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };

    const handleCancel = () => {
        router.post("/logout");
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(next) => {
                if (!mustForce) setOpen(next);
            }}
        >
            <DialogContent
                onInteractOutside={(e) => {
                    if (mustForce) e.preventDefault();
                }}
                onEscapeKeyDown={(e) => {
                    if (mustForce) e.preventDefault();
                }}
            >
                <DialogHeader>
                    <DialogTitle>Password change required</DialogTitle>
                    <DialogDescription>
                        Hi {user?.name}, please set a new password to continue.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                    {/* Password */}
                    <div>
                        <Input
                            type="password"
                            placeholder="New password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                            minLength={8}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <Input
                            type="password"
                            placeholder="Confirm new password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                            minLength={8}
                        />
                    </div>

                    <div className="flex gap-2">
                        <Button
                            type="submit"
                            disabled={processing}
                            className=""
                        >
                            {processing ? "Updating..." : "Update Password"}
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            className=""
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
