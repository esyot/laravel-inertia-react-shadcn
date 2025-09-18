import React from "react";
import Layout from "@/pages/layout";
import SectionContent from "@/components/section-content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, DollarSign, Gauge, ReceiptText } from "lucide-react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import SectionHeader from "@/components/section-header";
import { Link } from "@inertiajs/react";

type AnalyticsProps = {
    customers: {
        total: number;
        active: number;
        terminated: number;
    };
    bills: {
        total: number;
        paid: number;
        unpaid: number;
        overdue: number;
        total_amount_due: number;
    };
    meter_readings: {
        total: number;
        latest: {
            meter: any;
            id: number;
            month: string;
            year: number;
            meter_value: number;
        }[];
    };
};

export default function AdminDashboard({
    analytics,
}: {
    analytics: AnalyticsProps;
}) {
    const customerPieData = [
        { name: "Active", value: analytics.customers.active },
        { name: "Terminated", value: analytics.customers.terminated },
    ];

    const billBarData = [
        { name: "Paid", value: analytics.bills.paid },
        { name: "Unpaid", value: analytics.bills.unpaid },
        { name: "Overdue", value: analytics.bills.overdue },
    ];

    const COLORS = ["#22c55e", "#ef4444", "#f59e0b"];

    return (
        <main>
            <Layout>
                <SectionHeader>
                    <h1 className="font-semibold">Dashboard</h1>
                </SectionHeader>
                <SectionContent>
                    <div className="p-6 space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Link href="/customers">
                                <Card className="rounded-2xl shadow-sm">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Total Customers
                                        </CardTitle>
                                        <Users className="h-4 w-4 text-gray-500" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {analytics.customers.total}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                            <Card className="rounded-2xl shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Total Bills
                                    </CardTitle>
                                    <ReceiptText className="h-4 w-4 text-gray-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {analytics.bills.total}
                                    </div>
                                </CardContent>
                            </Card>

                            <Link href="/transactions">
                                <Card className="rounded-2xl shadow-sm">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Total Amount Due
                                        </CardTitle>
                                        <DollarSign className="h-4 w-4 text-gray-500" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            ₱
                                            {new Intl.NumberFormat("en-PH", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }).format(
                                                analytics.bills
                                                    .total_amount_due,
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                            <Link href="/meters">
                                <Card className="rounded-2xl shadow-sm">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Total Meter Readings
                                        </CardTitle>
                                        <Gauge className="h-4 w-4 text-gray-500" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {analytics.meter_readings.total}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card className="rounded-2xl shadow-sm">
                                <CardHeader>
                                    <CardTitle>Customers Status</CardTitle>
                                </CardHeader>
                                <CardContent className="h-72">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <PieChart>
                                            <Pie
                                                data={customerPieData}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={100}
                                                label
                                            >
                                                {customerPieData.map(
                                                    (_, index) => (
                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={
                                                                COLORS[
                                                                    index %
                                                                        COLORS.length
                                                                ]
                                                            }
                                                        />
                                                    ),
                                                )}
                                            </Pie>
                                            <Legend />
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <Card className="rounded-2xl shadow-sm">
                                <CardHeader>
                                    <CardTitle>Bills Status</CardTitle>
                                </CardHeader>
                                <CardContent className="h-72">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <BarChart data={billBarData}>
                                            <XAxis dataKey="name" />
                                            <YAxis allowDecimals={false} />
                                            <Tooltip />
                                            <Bar
                                                dataKey="value"
                                                fill="#3b82f6"
                                                radius={[6, 6, 0, 0]}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="rounded-2xl shadow-sm">
                            <CardHeader>
                                <CardTitle>Recent Meter Readings</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="divide-y divide-gray-200">
                                    {analytics.meter_readings.latest.map(
                                        (reading) => (
                                            <li
                                                key={reading.id}
                                                className="py-2 flex justify-between"
                                            >
                                                <span>
                                                    {reading.month}{" "}
                                                    {reading.year} —{" "}
                                                    {reading.meter.meter_no}
                                                </span>
                                                <span className="font-medium">
                                                    {reading.meter_value}
                                                </span>
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </SectionContent>
            </Layout>
        </main>
    );
}
