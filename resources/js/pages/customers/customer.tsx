import AppLayout from "@/layouts/public-layout";
import Layout from "@/layouts/private-layout";
import SectionContent from "@/components/section-content";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import Button from "@/components/composables/button";
import { ArrowLeft, ArrowUpDown } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface MeterReading {
    id: number;
    month: string;
    year: number;
    meter_value: number;
    consumption?: number;
    created_at: string;
}

interface Bill {
    id: number;
    billing_month: string;
    amount_due: string;
    penalty: number;
    status: string;
    due_date: string;
    total_amount_due: string;
    payment_date?: string;
}

interface Customer {
    id: number;
    name: string;
    municipal: string;
    barangay: string;
    purok?: string;
    code: string;
    status: string;
    bills: Bill[];
    meter_readings: MeterReading[];
    current_bill?: Bill;
}

interface CustomerProps {
    customer: Customer;
    isAdmin?: boolean;
    ratePerKwh?: number;
}

type SortField = "month" | "meter_value" | "consumption" | "created_at";
type SortOrder = "asc" | "desc";

const MONTHS = [
    { value: 1, name: "January" },
    { value: 2, name: "February" },
    { value: 3, name: "March" },
    { value: 4, name: "April" },
    { value: 5, name: "May" },
    { value: 6, name: "June" },
    { value: 7, name: "July" },
    { value: 8, name: "August" },
    { value: 9, name: "September" },
    { value: 10, name: "October" },
    { value: 11, name: "November" },
    { value: 12, name: "December" },
];

const MONTH_ORDER = MONTHS.map((m) => m.name);

export default function Customer({
    customer,
    isAdmin = false,
    ratePerKwh = 11,
}: CustomerProps) {
    const printRef = useRef<HTMLDivElement>(null);
    const [selectedYear, setSelectedYear] = useState<number>(() => {
        // Get all available years from meter readings
        const years =
            customer.meter_readings?.map((reading) => reading.year) || [];

        // If there are meter readings, use the most recent year
        if (years.length > 0) {
            return Math.max(...years);
        }

        // Fallback to current year if no meter readings exist
        return new Date().getFullYear();
    });
    const [sortField, setSortField] = useState<SortField>("month");
    const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
    const [filteredMeterReadings, setFilteredMeterReadings] = useState<
        MeterReading[]
    >([]);

    const formatNumber = useCallback((value: unknown): string => {
        if (value === null || value === undefined) return "0.00";
        const num =
            typeof value === "number" ? value : parseFloat(value as string);
        return isNaN(num) ? "0.00" : num.toFixed(2);
    }, []);

    const availableYears = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const years = new Set<number>();

        years.add(currentYear);

        customer.meter_readings?.forEach((reading: MeterReading) => {
            years.add(Number(reading.year));
        });

        return Array.from(years).sort((a, b) => b - a);
    }, [customer.meter_readings]);

    const normalizeYear = useCallback((year: number | string): number => {
        return typeof year === "string" ? parseInt(year, 10) : year;
    }, []);

    const filterAndSortReadings = useCallback(() => {
        if (!customer.meter_readings?.length) {
            setFilteredMeterReadings([]);
            return;
        }

        let filtered = customer.meter_readings.filter(
            (reading: MeterReading) => {
                return normalizeYear(reading.year) === selectedYear;
            },
        );

        filtered.sort((a: MeterReading, b: MeterReading) => {
            let aValue: any, bValue: any;

            switch (sortField) {
                case "month":
                    aValue = MONTH_ORDER.indexOf(a.month);
                    bValue = MONTH_ORDER.indexOf(b.month);
                    break;
                case "meter_value":
                    aValue = a.meter_value;
                    bValue = b.meter_value;
                    break;
                case "consumption":
                    aValue = a.consumption || 0;
                    bValue = b.consumption || 0;
                    break;
                case "created_at":
                    aValue = new Date(a.created_at).getTime();
                    bValue = new Date(b.created_at).getTime();
                    break;
                default:
                    return 0;
            }

            return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
        });

        setFilteredMeterReadings(filtered);
    }, [
        selectedYear,
        sortField,
        sortOrder,
        customer.meter_readings,
        normalizeYear,
    ]);

    useEffect(() => {
        filterAndSortReadings();
    }, [filterAndSortReadings]);

    const handleSort = useCallback((field: SortField) => {
        setSortField((prevField) => {
            if (prevField === field) {
                setSortOrder((prevOrder) =>
                    prevOrder === "asc" ? "desc" : "asc",
                );
            } else {
                setSortOrder("asc");
            }
            return field;
        });
    }, []);

    const getSortIcon = useCallback(
        (field: SortField) => {
            if (sortField !== field)
                return <ArrowUpDown className="ml-1 h-3 w-3" />;
            return sortOrder === "asc" ? (
                <ArrowUpDown className="ml-1 h-3 w-3 rotate-180" />
            ) : (
                <ArrowUpDown className="ml-1 h-3 w-3" />
            );
        },
        [sortField, sortOrder],
    );

    const handlePrint = useCallback(() => {
        const printContents = printRef.current?.innerHTML;
        if (!printContents) return;

        const printWindow = window.open("", "", "height=700,width=900");
        if (!printWindow) return;

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
        printWindow.focus();
        printWindow.print();
    }, []);

    const peso = useMemo(
        () =>
            new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
                maximumFractionDigits: 2,
            }),
        [],
    );

    const getStatusColor = useCallback((status: string) => {
        switch (status) {
            case "Unpaid":
                return "text-red-600";
            case "Overdue":
                return "text-orange-600";
            case "Paid":
                return "text-green-600";
            default:
                return "text-gray-600";
        }
    }, []);

    const calculatePenaltyAndTotal = useCallback((bill: Bill) => {
        const amount = parseFloat(bill.amount_due) || 0;
        const payment = bill.payment_date ? new Date(bill.payment_date) : null;
        const due = bill.due_date ? new Date(bill.due_date) : null;

        let penalty = 0;

        if (payment && due && payment > due) {
            const monthsDiff =
                (payment.getFullYear() - due.getFullYear()) * 12 +
                (payment.getMonth() - due.getMonth());
            penalty = Math.max(0, monthsDiff) * 100;
        }

        return {
            penalty,
            total: amount + penalty,
            status: bill.status,
        };
    }, []);

    const calculateBill = useCallback(
        (consumption: number) => consumption * ratePerKwh,
        [ratePerKwh],
    );

    const { currentBill, pastBills } = useMemo(() => {
        if (!customer.bills?.length)
            return { currentBill: null, pastBills: [] };

        const sortedBills = [...customer.bills].sort((a, b) => {
            return (
                new Date(b.billing_month).getTime() -
                new Date(a.billing_month).getTime()
            );
        });

        const currentMonthName = new Date().toLocaleString("default", {
            month: "long",
            year: "numeric",
        });

        const currentBill = sortedBills.find(
            (bill) => bill.billing_month === currentMonthName,
        );

        const pastBills = sortedBills.filter(
            (bill) => bill.billing_month !== currentMonthName,
        );

        return { currentBill, pastBills };
    }, [customer.bills]);

    if (!customer) return <p className="text-center">Customer not found</p>;

    const customerContent = (
        <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="w-full">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="w-fit -ml-2 -mt-2 cursor-pointer"
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

            {currentBill && (
                <Card className="mb-8 overflow-hidden">
                    <CardHeader className="bg-muted/100 pb-4 pt-6">
                        <CardTitle className="text-xl lg:text-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <span>
                                Current Bill — {currentBill.billing_month}
                            </span>
                            <span
                                className={`text-sm lg:text-base font-semibold px-4 py-2 rounded-full ${getStatusColor(
                                    currentBill.status,
                                )} bg-muted`}
                            >
                                {currentBill.status.charAt(0).toUpperCase() +
                                    currentBill.status.slice(1)}
                            </span>
                        </CardTitle>
                        <button
                            onClick={handlePrint}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-4"
                        >
                            Print Receipt
                        </button>
                    </CardHeader>
                    <CardContent ref={printRef} className="space-y-6">
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
                                        Number(currentBill.amount_due),
                                    )}
                                </span>
                            </div>
                            {currentBill.penalty > 0 && (
                                <div className="flex justify-between text-destructive text-base lg:text-lg">
                                    <span>Penalty:</span>
                                    <span className="font-bold">
                                        {peso.format(currentBill.penalty)}
                                    </span>
                                </div>
                            )}
                            <div className="flex justify-between text-xl lg:text-2xl font-bold border-t pt-4">
                                <span>Total Amount Due:</span>
                                <span>
                                    {peso.format(
                                        Number(currentBill.total_amount_due),
                                    )}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {isAdmin && (
                <Card className="mb-8">
                    <CardHeader className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <CardTitle className="text-xl lg:text-2xl">
                            Meter Readings - {selectedYear}
                        </CardTitle>
                        <div className="flex flex-row gap-4 w-full sm:w-auto">
                            <div className="w-full sm:w-40">
                                <label className="text-sm font-medium mb-2 block">
                                    Year
                                </label>
                                <Select
                                    value={selectedYear.toString()}
                                    onValueChange={(value) =>
                                        setSelectedYear(parseInt(value))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableYears.map((year) => (
                                            <SelectItem
                                                key={year}
                                                value={year.toString()}
                                            >
                                                {year}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="w-full sm:w-48">
                                <label className="text-sm font-medium mb-2 block">
                                    Sort By
                                </label>
                                <Select
                                    value={`${sortField}-${sortOrder}`}
                                    onValueChange={(value) => {
                                        const [field, order] = value.split(
                                            "-",
                                        ) as [SortField, SortOrder];
                                        setSortField(field);
                                        setSortOrder(order);
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="month-asc">
                                            Month (A-Z)
                                        </SelectItem>
                                        <SelectItem value="month-desc">
                                            Month (Z-A)
                                        </SelectItem>
                                        <SelectItem value="meter_value-asc">
                                            Meter Reading (Low-High)
                                        </SelectItem>
                                        <SelectItem value="meter_value-desc">
                                            Meter Reading (High-Low)
                                        </SelectItem>
                                        <SelectItem value="consumption-asc">
                                            Consumption (Low-High)
                                        </SelectItem>
                                        <SelectItem value="consumption-desc">
                                            Consumption (High-Low)
                                        </SelectItem>
                                        <SelectItem value="created_at-asc">
                                            Date (Oldest)
                                        </SelectItem>
                                        <SelectItem value="created_at-desc">
                                            Date (Newest)
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {filteredMeterReadings.length > 0 ? (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead
                                                className="cursor-pointer hover:bg-gray-100"
                                                onClick={() =>
                                                    handleSort("month")
                                                }
                                            >
                                                <div className="flex items-center">
                                                    Month/Year
                                                    {getSortIcon("month")}
                                                </div>
                                            </TableHead>
                                            <TableHead
                                                className="cursor-pointer hover:bg-gray-100"
                                                onClick={() =>
                                                    handleSort("meter_value")
                                                }
                                            >
                                                <div className="flex items-center">
                                                    Meter Reading (kWh)
                                                    {getSortIcon("meter_value")}
                                                </div>
                                            </TableHead>
                                            <TableHead
                                                className="cursor-pointer hover:bg-gray-100"
                                                onClick={() =>
                                                    handleSort("consumption")
                                                }
                                            >
                                                <div className="flex items-center">
                                                    Consumption (kWh)
                                                    {getSortIcon("consumption")}
                                                </div>
                                            </TableHead>
                                            <TableHead>Rate (₱/kWh)</TableHead>
                                            <TableHead>
                                                Estimated Amount
                                            </TableHead>
                                            <TableHead
                                                className="cursor-pointer hover:bg-gray-100"
                                                onClick={() =>
                                                    handleSort("created_at")
                                                }
                                            >
                                                <div className="flex items-center">
                                                    Recorded Date
                                                    {getSortIcon("created_at")}
                                                </div>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredMeterReadings.map(
                                            (reading: MeterReading) => (
                                                <TableRow key={reading.id}>
                                                    <TableCell>
                                                        {reading.month}{" "}
                                                        {reading.year}
                                                    </TableCell>
                                                    <TableCell>
                                                        {formatNumber(
                                                            reading.meter_value,
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {reading.consumption
                                                            ? formatNumber(
                                                                  reading.consumption,
                                                              )
                                                            : "N/A"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {formatNumber(
                                                            ratePerKwh,
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {reading.consumption
                                                            ? peso.format(
                                                                  calculateBill(
                                                                      reading.consumption,
                                                                  ),
                                                              )
                                                            : "N/A"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Date(
                                                            reading.created_at,
                                                        ).toLocaleDateString()}
                                                    </TableCell>
                                                </TableRow>
                                            ),
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <p className="text-center text-muted-foreground py-6">
                                No meter readings found for {selectedYear}
                            </p>
                        )}
                    </CardContent>
                </Card>
            )}

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
                                {pastBills.map((bill: Bill) => {
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

                    <div className="md:hidden space-y-6">
                        {pastBills.map((bill: Bill) => {
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
                                                className={`text-sm font-semibold px-3 py-2 rounded-full ${getStatusColor(
                                                    status,
                                                )} bg-muted`}
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
                                                        Number(bill.amount_due),
                                                    )}
                                                </span>
                                            </div>
                                            {penalty > 0 && (
                                                <div className="flex justify-between text-destructive text-base">
                                                    <span>Penalty:</span>
                                                    <span>
                                                        {peso.format(penalty)}
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
