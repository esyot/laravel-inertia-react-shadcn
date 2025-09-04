import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/interface/types";
// import { route } from "ziggy-js";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

type UserChangePassProps = {
    user: User;
};

export default function UserChangePass({ user }: UserChangePassProps) {
    const [open, setOpen] = useState(false);
    const { data, setData, put, processing, errors, reset } = useForm({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put("/user/password/update", {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="cursor-pointer font-semibold">
                Change Password
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                        Change Password for{" "}
                        <span className="text-indigo-600">{user.name}</span>
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        Enter your current password and your new password below.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5 mt-2">
                    <div className="space-y-2">
                        <Label
                            htmlFor="current_password"
                            className="text-sm font-medium text-gray-700"
                        >
                            Current Password
                        </Label>
                        <Input
                            type="password"
                            id="current_password"
                            placeholder="••••••••"
                            value={data.current_password}
                            onChange={(e) =>
                                setData("current_password", e.target.value)
                            }
                        />
                        {errors.current_password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.current_password}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="new_password"
                            className="text-sm font-medium text-gray-700"
                        >
                            New Password
                        </Label>
                        <Input
                            type="password"
                            id="new_password"
                            placeholder="••••••••"
                            value={data.new_password}
                            onChange={(e) =>
                                setData("new_password", e.target.value)
                            }
                        />
                        {errors.new_password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.new_password}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label
                            htmlFor="new_password_confirmation"
                            className="text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </Label>
                        <Input
                            type="password"
                            id="new_password_confirmation"
                            placeholder="••••••••"
                            value={data.new_password_confirmation}
                            onChange={(e) =>
                                setData(
                                    "new_password_confirmation",
                                    e.target.value,
                                )
                            }
                        />
                        {errors.new_password_confirmation && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.new_password_confirmation}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button
                            className="cursor-pointer"
                            type="submit"
                            disabled={processing}
                        >
                            {processing ? "Updating..." : "Update Password"}
                        </Button>
                        <Button
                            type="button"
                            className="cursor-pointer"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
