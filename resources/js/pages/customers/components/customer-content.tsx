import { useRef } from "react";

import Button from "@/components/composables/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type Customer = {
    id: number;
    name: string;
    code: string;
    municipal: string;
    barangay: string;
    purok?: string;
    status: string;
    bills: Array<{
        id: number;
        billing_month: string;
        amount_due: string;
        payment_date?: string;
        due_date?: string;
        status: string;
    }>;
};

export default function CustomerContent({
    customer,
    user,
}: {
    customer: Customer;
    user?: any;
}) {
    const printRef = useRef<HTMLDivElement>(null);
    // Print Receipt
    const handlePrint = () => {
        const printContents = printRef.current?.innerHTML;
        if (printContents) {
            const printWindow = window.open("", "", "height=700,width=900");
            if (printWindow) {
                printWindow.document.write(`
                <html>
                  <head>
                    <title>Receipt</title>
                    <link rel="stylesheet" href="/css/receipt.css">
                  </head>
                  <body>
                    <div class="receipt">
                      <div class="header">
                        <img src="/assets/images/logo.jpg" alt="Company Logo" class="logo"/>
                        <h1>Receipt</h1>
                        <p>${new Date().toLocaleDateString()}</p>
                      </div>
                      <div class="section">
                        ${printContents}
                      </div>
                    </div>
                    <div class="footer">
                    Thank you for your payment! <br>
                  </div>
                  </body>
                </html>
            `);
                printWindow.document.close();
                printWindow.onload = function () {
                    printWindow.focus();
                    printWindow.print();
                };
            }
        }
    };

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

    const calculatePenaltyAndTotal = (bill: any) => {
        const amount = parseFloat(bill.amount_due) || 0;
        const payment = bill.payment_date ? new Date(bill.payment_date) : null;
        const due = bill.due_date ? new Date(bill.due_date) : null;

        let penalty = 0;

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
            status: bill.status,
        };
    };

    const currentMonth = new Date().toLocaleString("default", {
        month: "long",
        year: "numeric",
    });

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
    return (
        <main>
            <div
                className={cn(
                    "",
                    !user && "py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto",
                )}
            >
                <div className="w-full">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="w-fit -ml-2 -mt-2 cursor-pointer "
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <div>
                        <h1 className="text-3xl font-semibold mb-6">
                            {customer.name} — {customer.code}
                        </h1>
                    </div>
                    <div className="flex flex-row justify-between items-center gap-6 mb-6">
                        <p className="text-gray-600 text-base lg:text-lg">
                            {customer.municipal}, {customer.barangay}
                            {customer.purok && `, ${customer.purok}`}
                        </p>
                        <p
                            className={`font-semibold text-base lg:text-lg ${
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
                            <Card className="mb-8 overflow-hidden">
                                <CardHeader className="bg-muted/100 pb-4 pt-6">
                                    <CardTitle className="text-xl lg:text-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                        <span>
                                            Current Bill —{" "}
                                            {currentBill.billing_month}
                                        </span>
                                        <span
                                            className={`text-sm lg:text-base font-semibold px-4 py-2 rounded-full ${getStatusColor(status)} bg-muted`}
                                        >
                                            {status.charAt(0).toUpperCase() +
                                                status.slice(1)}
                                        </span>
                                    </CardTitle>
                                    <button
                                        onClick={handlePrint}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Print Receipt
                                    </button>
                                </CardHeader>
                                <CardContent
                                    ref={printRef}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-base text-muted-foreground">
                                                Due Date
                                            </p>
                                            <p className="font-medium text-base lg:text-lg">
                                                {currentBill.due_date}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-base text-muted-foreground">
                                                Payment Date
                                            </p>
                                            <p className="font-medium text-base lg:text-lg">
                                                {currentBill.payment_date
                                                    ? new Date(
                                                          currentBill.payment_date,
                                                      ).toLocaleDateString()
                                                    : "Not available"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="border-t pt-6 space-y-4">
                                        <div className="flex justify-between text-base lg:text-lg">
                                            <span>Amount Due:</span>
                                            <span className="font-bold">
                                                {peso.format(
                                                    Number(
                                                        currentBill.amount_due,
                                                    ),
                                                )}
                                            </span>
                                        </div>
                                        {penalty > 0 && (
                                            <div className="flex justify-between text-destructive text-base lg:text-lg">
                                                <span>Penalty:</span>
                                                <span className="font-bold">
                                                    {peso.format(penalty)}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-xl lg:text-2xl font-bold border-t pt-4">
                                            <span>Total Amount Due:</span>
                                            <span>{peso.format(total)}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })()}
                <h2 className="text-2xl font-semibold mb-6">Past Bills</h2>
                {pastBills.length > 0 ? (
                    <>
                        <div className="hidden md:block">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-base">
                                            Month
                                        </TableHead>
                                        <TableHead className="text-base">
                                            Due Date
                                        </TableHead>
                                        <TableHead className="text-base">
                                            Amount Due
                                        </TableHead>
                                        <TableHead className="text-base">
                                            Penalty
                                        </TableHead>
                                        <TableHead className="text-base">
                                            Total Amount
                                        </TableHead>
                                        <TableHead className="text-base">
                                            Payment Date
                                        </TableHead>
                                        <TableHead className="text-base">
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
                                                className="text-base"
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
                                                            ? peso.format(
                                                                  penalty,
                                                              )
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

                        <div className="md:hidden space-y-6">
                            {pastBills.map((bill: any) => {
                                const { penalty, total, status } =
                                    calculatePenaltyAndTotal(bill);
                                return (
                                    <Card key={bill.id} className="p-6">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-semibold text-lg">
                                                    {bill.billing_month}
                                                </h3>
                                                <span
                                                    className={`text-sm font-semibold px-3 py-2 rounded-full ${getStatusColor(status)} bg-muted`}
                                                >
                                                    {status}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-6 text-base">
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
                                            <div className="border-t pt-4 space-y-3">
                                                <div className="flex justify-between text-base">
                                                    <span>Amount:</span>
                                                    <span>
                                                        {peso.format(
                                                            Number(
                                                                bill.amount_due,
                                                            ),
                                                        )}
                                                    </span>
                                                </div>
                                                {penalty > 0 && (
                                                    <div className="flex justify-between text-destructive text-base">
                                                        <span>Penalty:</span>
                                                        <span>
                                                            {peso.format(
                                                                penalty,
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between font-bold text-lg border-t pt-3">
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
                    <p className="text-center text-muted-foreground py-10 text-lg">
                        No past bills available for this customer.
                    </p>
                )}
            </div>
        </main>
    );
}
