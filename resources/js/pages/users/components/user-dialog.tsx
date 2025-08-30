import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleAlert } from "lucide-react";
import { route } from "ziggy-js";

type User = {
    name: string;
    email: string;
    address: string;
    password: string;
};

type AddUserDialogProps = {
    onAdd?: (user: User) => void;
};

export function AddUserDialog({ onAdd }: AddUserDialogProps) {
    const [open, setOpen] = React.useState(false);
    const { data, setData, post, processing, errors, clearErrors, setError } =
        useForm<User>({
            name: "",
            email: "",
            address: "",
            password: "",
        });

    React.useEffect(() => {
        console.log("Current errors:", errors);
    }, [errors]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        clearErrors();

        console.log("Submitting form with data:", data);
        console.log("Route being called:", route("users.store"));

        const frontendErrors: any = {};
        if (!data.name.trim()) frontendErrors.name = "Name is required";
        if (!data.email.trim()) frontendErrors.email = "Email is required";
        if (!data.address.trim())
            frontendErrors.address = "Address is required";
        if (!data.password.trim())
            frontendErrors.password = "Password is required";
        else if (data.password.length < 8)
            frontendErrors.password = "Password must be at least 8 characters";

        if (Object.keys(frontendErrors).length > 0) {
            console.log("Frontend validation errors:", frontendErrors);

            Object.entries(frontendErrors).forEach(([field, message]) => {
                setError(field as keyof User, message as string);
            });

            return;
        }

        post(route("users.store"), {
            onSuccess: (page) => {
                console.log("Form submitted successfully", page);
                if (onAdd) onAdd(data);
                setData({ name: "", email: "", address: "", password: "" });
                setOpen(false);
            },
            onError: (errors) => {
                console.log("Form submission failed with errors:", errors);
            },
            onFinish: () => {
                console.log("Form submission finished");
            },
        });
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            setData({ name: "", email: "", address: "", password: "" });
            clearErrors();
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button>Add User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive">
                            <CircleAlert className="h-4 w-4" />
                            <AlertTitle>Validation Error</AlertTitle>
                            <AlertDescription>
                                <ul className="list-disc list-inside space-y-1">
                                    {Object.entries(errors).map(
                                        ([key, message]) => (
                                            <li key={key}>
                                                <strong>{key}:</strong>{" "}
                                                {Array.isArray(message)
                                                    ? message[0]
                                                    : message}
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name *
                        </Label>
                        <div className="col-span-3 space-y-1">
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                placeholder="Enter name"
                                className={errors.name ? "border-red-500" : ""}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">
                                    {Array.isArray(errors.name)
                                        ? errors.name[0]
                                        : errors.name}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email *
                        </Label>
                        <div className="col-span-3 space-y-1">
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                placeholder="Enter email"
                                className={errors.email ? "border-red-500" : ""}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">
                                    {Array.isArray(errors.email)
                                        ? errors.email[0]
                                        : errors.email}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="address" className="text-right">
                            Address *
                        </Label>
                        <div className="col-span-3 space-y-1">
                            <Input
                                id="address"
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                placeholder="Enter address"
                                className={
                                    errors.address ? "border-red-500" : ""
                                }
                            />
                            {errors.address && (
                                <p className="text-sm text-red-500">
                                    {Array.isArray(errors.address)
                                        ? errors.address[0]
                                        : errors.address}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            Password *
                        </Label>
                        <div className="col-span-3 space-y-1">
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                placeholder="Enter password (min 8 chars)"
                                className={
                                    errors.password ? "border-red-500" : ""
                                }
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500">
                                    {Array.isArray(errors.password)
                                        ? errors.password[0]
                                        : errors.password}
                                </p>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={processing}>
                            {processing ? "Saving..." : "Save User"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
