import AppLayout from "@/layouts/AppLayout";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import SectionContent from "../components/section-content";
import Layout from "../layout";

interface CustomerProps {
    customer: any;
    isAdmin?: boolean; // Add this prop to determine which layout to use
}

export default function Customer({ customer, isAdmin = false }: CustomerProps) {
    if (!customer) return <p className="text-center">Customer not found</p>;

    // Helpers
    const peso = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        maximumFractionDigits: 2,
    });

    const normalizeStatus = (s: string) => s || "";

    const getStatusColor = (status: string) => {
        const s = normalizeStatus(status);
        switch (s) {
            case "Unpaid":
                return "text-red-600";
            case "Overdue":
                return "text-orange-600";
            case "Paid":
                return "text-green-600";
            default:
                return "text-gray-600";
        }
    };

    // Simplified version - just use the status from the database
    const calculatePenaltyAndTotal = (bill: any) => {
        const amount = parseFloat(bill.amount_due) || 0;
        const payment = bill.payment_date ? new Date(bill.payment_date) : null;
        const due = bill.due_date ? new Date(bill.due_date) : null;

        let penalty = 0;

        // Only calculate penalty if payment was late
        if (payment && due && payment > due) {
            let months =
                (payment.getFullYear() - due.getFullYear()) * 12 +
                (payment.getMonth() - due.getMonth());
            if (months <= 0 && payment > due) months = 1;
            penalty = Math.max(0, months) * 100;
        }

        return {
            penalty,
            total: amount + penalty,
            status: bill.status, // Use the status from database
        };
    };

    // Current month
    const currentMonth = new Date().toLocaleString("default", {
        month: "long",
        year: "numeric",
    });

    // Sort all bills by billing month descending, then by payment date descending
    const sortedBills = [...customer.bills].sort((a: any, b: any) => {
        const dateA = new Date(a.billing_month);
        const dateB = new Date(b.billing_month);

        if (dateB.getTime() !== dateA.getTime()) {
            return dateB.getTime() - dateA.getTime();
        }

        const paymentA = new Date(a.payment_date).getTime();
        const paymentB = new Date(b.payment_date).getTime();
        return paymentB - paymentA;
    });

    const currentBill = sortedBills.find(
        (bill: any) => bill.billing_month === currentMonth,
    );

    const pastBills = sortedBills.filter(
        (bill: any) => bill.billing_month !== currentMonth,
    );

    const customerContent = (
        <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="w-full">
                <div>
                    <h1 className="text-2xl font-semibold mb-4">
                        {customer.name} — {customer.code}
                    </h1>
                </div>
                <div className="flex flex-row justify-between items-center gap-4 mb-4">
                    <p className="text-gray-600 text-sm">
                        {customer.municipal}, {customer.barangay}
                        {customer.purok && `, ${customer.purok}`}
                    </p>
                    <p
                        className={`font-semibold text-sm ${
                            customer.status === "Terminated"
                                ? "text-red-600"
                                : "text-green-600"
                        }`}
                    >
                        Account Status: {customer.status}
                    </p>
                </div>
            </div>
            {currentBill &&
                (() => {
                    const { penalty, total, status } =
                        calculatePenaltyAndTotal(currentBill);

                    return (
                        <Card className="mb-6 overflow-hidden">
                            <CardHeader className="bg-muted/50 py-4">
                                <CardTitle className="text-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                    <span>
                                        Current Bill —{" "}
                                        {currentBill.billing_month}
                                    </span>
                                    <span
                                        className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(status)} bg-muted`}
                                    >
                                        {status.charAt(0).toUpperCase() +
                                            status.slice(1)}
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 py-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Due Date
                                        </p>
                                        <p className="font-medium text-sm">
                                            {currentBill.due_date}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Payment Date
                                        </p>
                                        <p className="font-medium text-sm">
                                            {currentBill.payment_date
                                                ? new Date(
                                                      currentBill.payment_date,
                                                  ).toLocaleDateString()
                                                : "Not available"}
                                        </p>
                                    </div>
                                </div>
                                <div className="border-t pt-4 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span>Amount Due:</span>
                                        <span className="font-bold">
                                            {peso.format(
                                                Number(currentBill.amount_due),
                                            )}
                                        </span>
                                    </div>
                                    {penalty > 0 && (
                                        <div className="flex justify-between text-destructive text-sm">
                                            <span>Penalty:</span>
                                            <span className="font-bold">
                                                {peso.format(penalty)}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-lg font-bold border-t pt-3">
                                        <span>Total Amount Due:</span>
                                        <span>{peso.format(total)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })()}
            <h2 className="text-xl font-semibold mb-4">Past Bills</h2>
            {pastBills.length > 0 ? (
                <>
                    <div className="hidden md:block">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-sm">
                                        Month
                                    </TableHead>
                                    <TableHead className="text-sm">
                                        Due Date
                                    </TableHead>
                                    <TableHead className="text-sm">
                                        Amount Due
                                    </TableHead>
                                    <TableHead className="text-sm">
                                        Penalty
                                    </TableHead>
                                    <TableHead className="text-sm">
                                        Total Amount
                                    </TableHead>
                                    <TableHead className="text-sm">
                                        Payment Date
                                    </TableHead>
                                    <TableHead className="text-sm">
                                        Status
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pastBills.map((bill: any) => {
                                    const { penalty, total, status } =
                                        calculatePenaltyAndTotal(bill);
                                    return (
                                        <TableRow
                                            key={bill.id}
                                            className="text-sm"
                                        >
                                            <TableCell className="font-medium">
                                                {bill.billing_month}
                                            </TableCell>
                                            <TableCell>
                                                {bill.due_date}
                                            </TableCell>
                                            <TableCell>
                                                {peso.format(
                                                    Number(bill.amount_due),
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-red-400">
                                                    {penalty > 0
                                                        ? peso.format(penalty)
                                                        : "—"}
                                                </span>
                                            </TableCell>
                                            <TableCell className="font-semibold">
                                                {peso.format(total)}
                                            </TableCell>
                                            <TableCell>
                                                {bill.payment_date
                                                    ? new Date(
                                                          bill.payment_date,
                                                      ).toLocaleDateString()
                                                    : "—"}
                                            </TableCell>
                                            <TableCell
                                                className={`font-semibold ${getStatusColor(status)}`}
                                            >
                                                {status}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="md:hidden space-y-4">
                        {pastBills.map((bill: any) => {
                            const { penalty, total, status } =
                                calculatePenaltyAndTotal(bill);
                            return (
                                <Card key={bill.id} className="p-4">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-base">
                                                {bill.billing_month}
                                            </h3>
                                            <span
                                                className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(status)} bg-muted`}
                                            >
                                                {status}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-muted-foreground">
                                                    Due Date
                                                </p>
                                                <p>{bill.due_date}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">
                                                    Payment Date
                                                </p>
                                                <p>
                                                    {bill.payment_date
                                                        ? new Date(
                                                              bill.payment_date,
                                                          ).toLocaleDateString()
                                                        : "—"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="border-t pt-3 space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Amount:</span>
                                                <span>
                                                    {peso.format(
                                                        Number(bill.amount_due),
                                                    )}
                                                </span>
                                            </div>
                                            {penalty > 0 && (
                                                <div className="flex justify-between text-destructive text-sm">
                                                    <span>Penalty:</span>
                                                    <span>
                                                        {peso.format(penalty)}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex justify-between font-bold text-base border-t pt-2">
                                                <span>Total:</span>
                                                <span>
                                                    {peso.format(total)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </>
            ) : (
                <p className="text-center text-muted-foreground py-6 text-base">
                    No past bills available for this customer.
                </p>
            )}
        </div>
    );

    if (isAdmin) {
        return (
            <main>
                <Layout>
                    <SectionContent header={false}>
                        {customerContent}
                    </SectionContent>
                </Layout>
            </main>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-7xl overflow-hidden">
                <AppLayout>
                    <SectionContent header={false}>
                        {customerContent}
                    </SectionContent>
                </AppLayout>
            </div>
        </div>
    );
}
