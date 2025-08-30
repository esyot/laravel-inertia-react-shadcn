import React from "react";
import AppLayout from "@/layouts/AppLayout";

export default function Page({ customer }: any) {
    if (!customer) return <p className="text-center">Customer not found</p>;

    // Helpers
    const peso = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        maximumFractionDigits: 2,
    });

    const normalizeStatus = (s: string) => (s || "").toLowerCase();

    const getStatusColor = (status: string) => {
        const s = normalizeStatus(status);
        switch (s) {
            case "unpaid":
                return "text-red-600";
            case "overdue":
                return "text-orange-600";
            case "paid":
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
            status: bill.status.toLowerCase(), // Use the status from database
        };
    };

    // Current month
    // Current month
    const currentMonth = new Date().toLocaleString("default", {
        month: "long",
        year: "numeric",
    });

    // Sort all bills by billing month descending, then by payment date descending
    // Sort by billing month descending, then by payment date descending
    const sortedBills = [...customer.bills].sort((a: any, b: any) => {
        // Convert billing months to dates for comparison
        const dateA = new Date(a.billing_month);
        const dateB = new Date(b.billing_month);

        // First sort by billing month (newest first)
        if (dateB.getTime() !== dateA.getTime()) {
            return dateB.getTime() - dateA.getTime();
        }

        // If same month, sort by payment date (newest first)
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
        <AppLayout>
            <div className="max-w-4xl mx-auto py-6">
                <div className="w-full">
                    <div>
                        <h1 className="text-2xl font-semibold mb-4">
                            {customer.name} — {customer.code}
                        </h1>
                    </div>
                    <div className="flex justify-between">
                        {/* Overall Customer Status */}
                        <p className="mb-6 text-gray-600">
                            {customer.municipal}, {customer.barangay}
                        </p>
                        <p
                            className={`mb-4 font-semibold ${
                                customer.status === "Terminated"
                                    ? "text-red-600"
                                    : "text-green-600"
                            }`}
                        >
                            Account Status: {customer.status}
                        </p>
                    </div>
                </div>

                {/* Current Month Bill Card */}
                {currentBill &&
                    (() => {
                        const { penalty, total, status } =
                            calculatePenaltyAndTotal(currentBill);

                        // Debug: check what's in the currentBill
                        console.log("Current Bill Data:", currentBill);
                        console.log("Payment Date:", currentBill.payment_date);
                        console.log(
                            "Payment Date Type:",
                            typeof currentBill.payment_date,
                        );

                        return (
                            <div className="mb-6 p-6 rounded-2xl shadow bg-white border">
                                <h2 className="text-xl font-semibold mb-2">
                                    Current Bill — {currentBill.billing_month}
                                </h2>

                                {/* Due Date */}
                                <p className="text-gray-600">
                                    Due Date: {currentBill.due_date}
                                </p>

                                {/* Amount Due */}
                                <p className="text-lg">
                                    Amount Due:{" "}
                                    <span className="font-bold">
                                        {peso.format(
                                            Number(currentBill.amount_due),
                                        )}
                                    </span>
                                </p>

                                {/* Penalty */}
                                {penalty > 0 && (
                                    <p className="text-gray-700">
                                        Penalty:{" "}
                                        <span className="text-red-400">
                                            {peso.format(penalty)}
                                        </span>
                                    </p>
                                )}

                                {/* Total */}
                                <p className="text-lg font-bold">
                                    Total Amount Due: {peso.format(total)}
                                </p>

                                {/* Payment Date */}
                                {currentBill.payment_date ? (
                                    <p className="text-gray-600">
                                        Paid on:{" "}
                                        {new Date(
                                            currentBill.payment_date,
                                        ).toLocaleDateString()}
                                    </p>
                                ) : (
                                    <p className="text-gray-600">
                                        Payment date: Not available
                                    </p>
                                )}

                                {/* Status */}
                                <p
                                    className={`font-semibold ${getStatusColor(status)}`}
                                >
                                    Status:{" "}
                                    {status.charAt(0).toUpperCase() +
                                        status.slice(1)}
                                </p>
                            </div>
                        );
                    })()}

                {/* Past Bills Table */}
                <h2 className="text-xl font-semibold mb-2">Past Bills</h2>
                {pastBills.length > 0 ? (
                    <table className="w-full border border-gray-200 rounded-lg shadow">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left">Month</th>
                                <th className="px-4 py-2 text-left">
                                    Due Date
                                </th>
                                <th className="px-4 py-2 text-left">
                                    Amount Due
                                </th>
                                <th className="px-4 py-2 text-left">Penalty</th>
                                <th className="px-4 py-2 text-left">
                                    Total Amount Due
                                </th>
                                <th className="px-4 py-2 text-left">
                                    Payment Date
                                </th>
                                <th className="px-4 py-2 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pastBills.map((bill: any) => {
                                const { penalty, total, status } =
                                    calculatePenaltyAndTotal(bill);
                                return (
                                    <tr key={bill.id} className="border-t">
                                        <td className="px-4 py-2">
                                            {bill.billing_month}
                                        </td>
                                        <td className="px-4 py-2">
                                            {bill.due_date}
                                        </td>
                                        <td className="px-4 py-2">
                                            {peso.format(
                                                Number(bill.amount_due),
                                            )}
                                        </td>
                                        <td className="px-4 py-2">
                                            <span className="text-red-400">
                                                {penalty > 0
                                                    ? peso.format(penalty)
                                                    : "—"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 font-semibold">
                                            {peso.format(total)}
                                        </td>
                                        <td className="px-4 py-2">
                                            {bill.payment_date
                                                ? new Date(
                                                      bill.payment_date,
                                                  ).toLocaleDateString()
                                                : "—"}
                                        </td>
                                        <td
                                            className={`px-4 py-2 font-semibold ${getStatusColor(status)}`}
                                        >
                                            {status}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <p>No past bills available for this customer.</p>
                )}
            </div>
        </AppLayout>
    );
}
