import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartAreaInteractive } from "@/components/ui/chart-area-interactive";

import Layout from "../layout";
import { ChevronRight, TriangleAlert, TriangleAlertIcon } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function Page() {
    return (
        <main>
            <Layout>
                <section className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                    {/* Top Row Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Account Summary */}
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
                                    Juan Dela Cruz
                                </p>
                                <p>
                                    <span className="font-medium">
                                        Account No.:
                                    </span>{" "}
                                    123456789
                                </p>
                                <p>
                                    <span className="font-medium">
                                        Meter No.:
                                    </span>{" "}
                                    MTR-00123
                                </p>
                            </CardContent>
                        </Card>

                        {/* Current Bill */}
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

                        {/* Outstanding Balance */}
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
                                    href="/payments"
                                    className="text-blue-600 hover:underline text-sm font-medium flex items-center"
                                >
                                    View Full History <ChevronRight />
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* Consumption Chart */}
                    <div className="mt-6">
                        <ChartAreaInteractive />
                    </div>
                </section>
            </Layout>
        </main>
    );
}
