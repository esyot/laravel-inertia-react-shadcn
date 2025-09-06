"use client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChartAreaInteractive } from "@/components/ui/chart-area-interactive";

import Layout from "@/layouts/private-layout";
import { ChevronRight, Plus, X, CheckCircle, AlertCircle } from "lucide-react";
import { Link, usePage, useForm, router } from "@inertiajs/react";

import SectionHeader from "@/components/section-header";
import SectionContent from "@/components/section-content";

import { User, Customer } from "@/lib/interface/types";
import { useState, useEffect } from "react";

type SharedProps = {
    auth: { user: User | null };
    must_change_password: boolean;
    customers: Customer[];
};

export default function CustomerDashboard() {
    const { props } = usePage<SharedProps & { flash: { success?: string } }>();
    const user = props.auth?.user;
    const customers = props.customers || [];
    const successMessage = props.flash?.success;
    const errorMessage = props.errors?.code;

    const [showAddCodeForm, setShowAddCodeForm] = useState(false);

    // ✅ Success fade-out state
    const [visibleSuccess, setVisibleSuccess] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (successMessage) {
            setVisibleSuccess(true);
            setShowSuccess(true);
            const timer = setTimeout(() => setShowSuccess(false), 3000); // fade out
            const removeTimer = setTimeout(
                () => setVisibleSuccess(false),
                3700,
            ); // remove DOM
            return () => {
                clearTimeout(timer);
                clearTimeout(removeTimer);
            };
        }
    }, [successMessage]);

    // ✅ Error fade-out state
    const [visibleError, setVisibleError] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (errorMessage) {
            setVisibleError(true);
            setShowError(true);
            const timer = setTimeout(() => setShowError(false), 3000);
            const removeTimer = setTimeout(() => setVisibleError(false), 3700);
            return () => {
                clearTimeout(timer);
                clearTimeout(removeTimer);
            };
        }
    }, [errorMessage]);

    const {
        data: codeData,
        setData: setCodeData,
        post: postCode,
        processing: codeProcessing,
        errors: codeErrors,
        reset: resetCode,
    } = useForm({
        code: "",
    });

    const handleAddCode = (e: React.FormEvent) => {
        e.preventDefault();
        postCode("/customer-codes", {
            onSuccess: () => {
                resetCode();
                setShowAddCodeForm(false);
            },
            preserveScroll: true,
        });
    };

    const handleRemoveCode = (customerId: number) => {
        if (confirm("Are you sure you want to remove this customer code?")) {
            router.delete(`/customer-codes/${customerId}`, {
                preserveScroll: true,
            });
        }
    };

    if (!user) return null;

    return (
        <main>
            <Layout>
                <SectionContent header={false}>
                    {/* ✅ Flash Messages with fade-out + DOM removal */}
                    {visibleSuccess && (
                        <div
                            className={`mb-4 p-3 rounded-lg bg-green-100 text-green-800 flex items-center gap-2 transition-opacity duration-700 ${
                                showSuccess ? "opacity-100" : "opacity-0"
                            }`}
                        >
                            <CheckCircle className="h-5 w-5" />
                            <span>{successMessage}</span>
                        </div>
                    )}

                    {visibleError && (
                        <div
                            className={`mb-4 p-3 rounded-lg bg-red-100 text-red-800 flex items-center gap-2 transition-opacity duration-700 ${
                                showError ? "opacity-100" : "opacity-0"
                            }`}
                        >
                            <AlertCircle className="h-5 w-5" />
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    <Card className="shadow-md rounded-2xl mb-6">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center justify-between">
                                <span>My Code</span>
                                <Button
                                    size="sm"
                                    onClick={() =>
                                        setShowAddCodeForm(!showAddCodeForm)
                                    }
                                    className="flex items-center gap-1"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Code
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {showAddCodeForm && (
                                <form
                                    onSubmit={handleAddCode}
                                    className="mb-4 p-4 bg-slate-50 rounded-lg"
                                >
                                    <div className="grid gap-2">
                                        <Label htmlFor="new-code">
                                            Add Customer Code
                                        </Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="new-code"
                                                value={codeData.code}
                                                onChange={(e) =>
                                                    setCodeData(
                                                        "code",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Enter customer code"
                                                className="flex-1"
                                            />
                                            <Button
                                                type="submit"
                                                disabled={codeProcessing}
                                            >
                                                {codeProcessing
                                                    ? "Adding..."
                                                    : "Add"}
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => {
                                                    setShowAddCodeForm(false);
                                                    resetCode();
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                        {codeErrors.code && (
                                            <p className="text-sm text-red-500 flex items-center gap-1">
                                                <AlertCircle className="h-4 w-4" />
                                                {codeErrors.code}
                                            </p>
                                        )}
                                    </div>
                                </form>
                            )}

                            {customers.length === 0 ? (
                                <div className="text-center py-6 text-slate-500">
                                    <p>No customer codes added yet.</p>
                                    <p className="text-sm">
                                        Add your first customer code to get
                                        started.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {customers.map((customer) => (
                                        <div
                                            key={customer.id}
                                            className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                                        >
                                            <div className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-600" />
                                                <span className="font-mono">
                                                    {customer.code}
                                                </span>
                                                <span className="text-sm text-slate-500">
                                                    ({customer.name})
                                                </span>
                                            </div>
                                            {customers.length > 1 && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleRemoveCode(
                                                            customer.id,
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-800 hover:bg-red-50"
                                                >
                                                    <X className="h-4 w-4" />
                                                    Remove
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <Card className="shadow-md rounded-2xl">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">
                                    Account Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    <span className="font-medium">
                                        Customer Name:
                                    </span>{" "}
                                    {user.name}
                                </p>
                                <p>
                                    <span className="font-medium">
                                        Customer Codes:
                                    </span>{" "}
                                    {customers.length}
                                </p>
                                <p>
                                    <span className="font-medium">Email:</span>{" "}
                                    {user.email}
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="shadow-md rounded-2xl">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-lg font-semibold">
                                    Current Bill
                                </CardTitle>
                                <p className="text-yellow-600 font-medium flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-triangle-alert"
                                    >
                                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
                                        <path d="M12 9v4" />
                                        <path d="M12 17h.01" />
                                    </svg>
                                    <span>Unpaid</span>
                                </p>
                            </CardHeader>

                            <CardContent>
                                <p className="text-2xl font-bold text-red-600">
                                    ₱ 1,250.00
                                </p>
                                <p>
                                    <span className="font-medium">
                                        Billing Period:
                                    </span>{" "}
                                    Sept 1 – Sept 30, 2025
                                </p>
                                <p>
                                    <span className="font-medium">
                                        Due Date:
                                    </span>{" "}
                                    Sept 30, 2025
                                </p>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Button
                                    variant="destructive"
                                    className="cursor-pointer"
                                >
                                    Pay Now
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card className="shadow-md rounded-2xl">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-lg font-semibold">
                                    Outstanding Balance
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="mb-1">
                                <p className="text-2xl font-bold text-blue-600">
                                    ₱ 1,250.00
                                </p>
                                <p>
                                    <span className="font-medium">
                                        Overdue Bills:
                                    </span>{" "}
                                    ₱ 1,250.00
                                </p>
                                <p>
                                    <span className="font-medium">
                                        Penalties:
                                    </span>{" "}
                                    ₱ 150.00
                                </p>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Link
                                    href="/bills"
                                    className="text-blue-600 hover:underline text-sm font-medium flex items-center"
                                >
                                    View Bills <ChevronRight />
                                </Link>
                            </CardFooter>
                        </Card>

                        <Card className="shadow-md rounded-2xl">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-lg font-semibold">
                                    Recent Payments
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="mb-2">
                                <ul className="space-y-2 text-sm">
                                    <li className="flex justify-between">
                                        <span>August 15, 2025</span>
                                        <span className="font-medium text-green-600">
                                            ₱ 1,200.00
                                        </span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>July 15, 2025</span>
                                        <span className="font-medium text-green-600">
                                            ₱ 1,180.00
                                        </span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>June 15, 2025</span>
                                        <span className="font-medium text-green-600">
                                            ₱ 1,250.00
                                        </span>
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Link
                                    href="/transactions"
                                    className="text-blue-600 hover:underline text-sm font-medium flex items-center"
                                >
                                    View Full History <ChevronRight />
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>

                    <div className="mt-6">
                        <ChartAreaInteractive />
                    </div>
                </SectionContent>
            </Layout>
        </main>
    );
}
