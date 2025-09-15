import AppLayout from "@/layouts/public-layout";
import Confirmation from "@/components/composables/confirmation";
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
import { router } from "@inertiajs/react";
import Button from "@/components/composables/button";
import { ArrowLeft, ArrowUpDown } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface MeterReading {
    id: number;
    month: string;
    year: number;
    prev_meter_value: number;
    curr_meter_value: number;
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
    meter_readings: MeterReading[];
}

interface CustomerProps {
    customer: Customer;
    isAdmin?: boolean;
    ratePerKwh?: number;
    bills: Bill[];
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
    bills,
}: CustomerProps) {
    const printRef = useRef<HTMLDivElement>(null);
    const [selectedYear, setSelectedYear] = useState<number>(() => {
        const years =
            customer.meter_readings?.map((reading) => reading.year) || [];

        if (years.length > 0) {
            return Math.max(...years);
        }

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
                    aValue = a.curr_meter_value;
                    bValue = b.curr_meter_value;
                    break;
                case "consumption":
                    aValue = a.curr_meter_value - a.prev_meter_value;
                    bValue = b.curr_meter_value - b.prev_meter_value;
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

    const getCurrentMonthMeterReading = useCallback(() => {
        if (!customer.meter_readings?.length) return null;

        const currentMonth = new Date().toLocaleString("default", {
            month: "long",
        });
        const currentYear = new Date().getFullYear();

        return customer.meter_readings.find(
            (reading) =>
                reading.month === currentMonth && reading.year === currentYear,
        );
    }, [customer.meter_readings]);

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
    const [open, setOpen] = useState(false);

    // Working part
    const handleStatusClick = (status: string, customerId: number) => {
        const newStatus = status === "Active" ? "Terminated" : "Active";

        router.put(`/customers/${customerId}/status`, {
            status: newStatus,
        });
        setOpen(false);
    };

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
        if (!bills?.length) return { currentBill: null, pastBills: [] };

        const sortedBills = [...bills].sort((a, b) => {
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
    }, [bills]);

    if (!customer) return <p className="text-center">Customer not found</p>;

    const formatCurrency = (price: number) => {
        return new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
        }).format(price);
    };

    type BillSortField =
        | "billing_month"
        | "due_date"
        | "amount_due"
        | "penalty"
        | "total_amount"
        | "payment_date"
        | "status";

    const [selectedBillYear, setSelectedBillYear] = useState<string>("2025");
    const [billSortField, setBillSortField] =
        useState<BillSortField>("billing_month");
    const [billSortOrder, setBillSortOrder] = useState<SortOrder>("asc");

    const billYears = useMemo(() => {
        if (!pastBills?.length) return ["2025"];
        const years = Array.from(
            new Set(
                pastBills.map((bill) =>
                    new Date(bill.billing_month).getFullYear().toString(),
                ),
            ),
        ).sort((a, b) => parseInt(b) - parseInt(a));

        // Ensure 2025 is included if not already present
        if (!years.includes("2025")) {
            years.unshift("2025");
        }

        return years;
    }, [pastBills]);

    const filteredSortedPastBills = useMemo(() => {
        if (!pastBills?.length) return [];

        let filtered = [...pastBills];

        // Filter by selected year
        filtered = filtered.filter((bill) => {
            const year = new Date(bill.billing_month).getFullYear().toString();
            return year === selectedBillYear;
        });

        filtered.sort((a, b) => {
            let aValue: any, bValue: any;

            switch (billSortField) {
                case "billing_month":
                    aValue = new Date(a.billing_month).getTime();
                    bValue = new Date(b.billing_month).getTime();
                    break;
                case "due_date":
                    aValue = new Date(a.due_date).getTime();
                    bValue = new Date(b.due_date).getTime();
                    break;
                case "amount_due":
                    aValue = parseFloat(a.amount_due);
                    bValue = parseFloat(b.amount_due);
                    break;
                case "penalty":
                    aValue = a.penalty;
                    bValue = b.penalty;
                    break;
                case "total_amount":
                    aValue = parseFloat(a.total_amount_due);
                    bValue = parseFloat(b.total_amount_due);
                    break;
                case "payment_date":
                    aValue = a.payment_date
                        ? new Date(a.payment_date).getTime()
                        : 0;
                    bValue = b.payment_date
                        ? new Date(b.payment_date).getTime()
                        : 0;
                    break;
                case "status":
                    aValue = a.status;
                    bValue = b.status;
                    break;
                default:
                    return 0;
            }

            if (typeof aValue === "string" && typeof bValue === "string") {
                return billSortOrder === "asc"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            return billSortOrder === "asc" ? aValue - bValue : bValue - aValue;
        });

        return filtered;
    }, [pastBills, selectedBillYear, billSortField, billSortOrder]);

    const handleSortBills = (field: BillSortField) => {
        setBillSortField((prev) => {
            if (prev === field) {
                setBillSortOrder((prevOrder) =>
                    prevOrder === "asc" ? "desc" : "asc",
                );
            } else {
                setBillSortOrder("asc");
            }
            return field;
        });
    };

    const getSortIconBills = (field: BillSortField) => {
        if (billSortField !== field)
            return <ArrowUpDown className="ml-1 h-3 w-3" />;
        return billSortOrder === "asc" ? (
            <ArrowUpDown className="ml-1 h-3 w-3 rotate-180" />
        ) : (
            <ArrowUpDown className="ml-1 h-3 w-3" />
        );
    };

    const customerContent = (
        <div className="">
            <div className="w-full">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="w-fit -ml-2 cursor-pointer"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold ">
                        {customer.name} — {customer.code}
                    </h1>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-6 mb-4 sm:mb-6">
                    <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                        {customer.municipal}, {customer.barangay}
                        {customer.purok && `, ${customer.purok}`}
                    </p>
                    <p
                        className={`font-semibold text-sm sm:text-base lg:text-lg ${
                            customer.status === "Terminated"
                                ? "text-red-600"
                                : "text-green-600"
                        }`}
                    >
                        Status:
                        {/* Working part */}
                        <Button
                            variant="destructive"
                            onClick={() => setOpen(true)}
                            className={
                                customer.status === "Terminated"
                                    ? "ml-2 bg-red-100 text-red-800"
                                    : "ml-2 bg-green-100 text-green-800"
                            }
                        >
                            {customer.status}
                        </Button>
                        <Confirmation
                            open={open}
                            title={
                                customer.status === "Active"
                                    ? "Deactivate Customer"
                                    : "Activate Customer"
                            }
                            message={
                                customer.status === "Active"
                                    ? "Are you sure you want to deactivate this customer?"
                                    : "Are you sure you want to activate this customer?"
                            }
                            confirmText={
                                customer.status === "Active"
                                    ? "Deactivate"
                                    : "Activate"
                            }
                            cancelText="Cancel"
                            onConfirm={() =>
                                handleStatusClick(customer.status, customer.id)
                            }
                            onCancel={() => setOpen(false)}
                        />
                    </p>
                </div>
            </div>

            {currentBill && (
                <Card className="mb-6 sm:mb-8 overflow-hidden">
                    <CardHeader className="bg-muted/100 pb-4 pt-6">
                        <CardTitle className="text-lg sm:text-xl md:text-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <span>
                                Current Bill — {currentBill.billing_month}
                            </span>
                            <span
                                className={`text-xs sm:text-sm lg:text-base font-semibold px-3 py-1 sm:px-4 sm:py-2 rounded-full ${getStatusColor(
                                    currentBill.status,
                                )} bg-muted`}
                            >
                                {currentBill.status.charAt(0).toUpperCase() +
                                    currentBill.status.slice(1)}
                            </span>
                        </CardTitle>
                        <button
                            onClick={handlePrint}
                            className="px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-4"
                        >
                            Print Receipt
                        </button>
                    </CardHeader>
                    <CardContent
                        ref={printRef}
                        className="space-y-4 sm:space-y-6"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                                <p className="text-sm sm:text-base text-muted-foreground">
                                    Due Date
                                </p>
                                <p className="font-medium text-sm sm:text-base lg:text-lg">
                                    {currentBill.due_date}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm sm:text-base text-muted-foreground">
                                    Payment Date
                                </p>
                                <p className="font-medium text-sm sm:text-base lg:text-lg">
                                    {currentBill.payment_date
                                        ? new Date(
                                              currentBill.payment_date,
                                          ).toLocaleDateString()
                                        : "Not available"}
                                </p>
                            </div>
                        </div>
                        <div className="border-t pt-4 sm:pt-6 space-y-3 sm:space-y-4">
                            <div className="flex justify-between text-sm sm:text-base lg:text-lg">
                                <span>Amount Due:</span>
                                <span className="font-bold">
                                    {getCurrentMonthMeterReading()
                                        ? peso.format(
                                              calculateBill(
                                                  getCurrentMonthMeterReading()!
                                                      .curr_meter_value -
                                                      getCurrentMonthMeterReading()!
                                                          .prev_meter_value,
                                              ),
                                          )
                                        : peso.format(
                                              Number(currentBill.amount_due),
                                          )}
                                </span>
                            </div>
                            {currentBill.penalty > 0 && (
                                <div className="flex justify-between text-destructive text-sm sm:text-base lg:text-lg">
                                    <span>Penalty:</span>
                                    <span className="font-bold">
                                        {peso.format(currentBill.penalty)}
                                    </span>
                                </div>
                            )}
                            <div className="flex justify-between text-lg sm:text-xl md:text-2xl font-bold border-t pt-3 sm:pt-4">
                                <span>Total Amount Due:</span>
                                <span>
                                    {getCurrentMonthMeterReading()
                                        ? peso.format(
                                              calculateBill(
                                                  getCurrentMonthMeterReading()!
                                                      .curr_meter_value -
                                                      getCurrentMonthMeterReading()!
                                                          .prev_meter_value,
                                              ) + currentBill.penalty,
                                          )
                                        : peso.format(
                                              Number(
                                                  currentBill.total_amount_due,
                                              ),
                                          )}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {isAdmin && (
                <Card className="mb-6 sm:mb-8">
                    <CardHeader className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <CardTitle className="text-lg sm:text-xl md:text-2xl">
                            Meter Readings - {selectedYear}
                        </CardTitle>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                            <div className="w-full sm:w-40">
                                <label className="text-xs sm:text-sm font-medium mb-1 sm:mb-2 block">
                                    Year
                                </label>
                                <Select
                                    value={selectedYear.toString()}
                                    onValueChange={(value) =>
                                        setSelectedYear(parseInt(value))
                                    }
                                >
                                    <SelectTrigger className="text-xs sm:text-sm">
                                        <SelectValue placeholder="Select year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableYears.map((year) => (
                                            <SelectItem
                                                key={year}
                                                value={year.toString()}
                                                className="text-xs sm:text-sm"
                                            >
                                                {year}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {filteredMeterReadings.length > 0 ? (
                            <div className="overflow-x-auto">
                                <Table className="min-w-full">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead
                                                className="cursor-pointer hover:bg-gray-100 text-xs sm:text-sm"
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
                                                className="cursor-pointer hover:bg-gray-100 text-xs sm:text-sm"
                                                onClick={() =>
                                                    handleSort("meter_value")
                                                }
                                            >
                                                <div className="flex items-center">
                                                    Prev (kWh)
                                                    {getSortIcon("meter_value")}
                                                </div>
                                            </TableHead>
                                            <TableHead
                                                className="cursor-pointer hover:bg-gray-100 text-xs sm:text-sm"
                                                onClick={() =>
                                                    handleSort("meter_value")
                                                }
                                            >
                                                <div className="flex items-center">
                                                    Curr (kWh)
                                                    {getSortIcon("meter_value")}
                                                </div>
                                            </TableHead>
                                            <TableHead
                                                className="cursor-pointer hover:bg-gray-100 text-xs sm:text-sm"
                                                onClick={() =>
                                                    handleSort("consumption")
                                                }
                                            >
                                                <div className="flex items-center">
                                                    Cons. (kWh)
                                                    {getSortIcon("consumption")}
                                                </div>
                                            </TableHead>
                                            <TableHead className="text-xs sm:text-sm">
                                                Rate (₱/kWh)
                                            </TableHead>
                                            <TableHead className="text-xs sm:text-sm">
                                                Est. Amount
                                            </TableHead>
                                            <TableHead
                                                className="cursor-pointer hover:bg-gray-100 text-xs sm:text-sm"
                                                onClick={() =>
                                                    handleSort("created_at")
                                                }
                                            >
                                                <div className="flex items-center">
                                                    Recorded
                                                    {getSortIcon("created_at")}
                                                </div>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredMeterReadings.map(
                                            (reading: MeterReading) => {
                                                const consumption =
                                                    reading.curr_meter_value -
                                                    reading.prev_meter_value;
                                                return (
                                                    <TableRow key={reading.id}>
                                                        <TableCell className="text-xs sm:text-sm">
                                                            {reading.month}{" "}
                                                            {reading.year}
                                                        </TableCell>
                                                        <TableCell className="text-xs sm:text-sm">
                                                            {formatNumber(
                                                                reading.prev_meter_value,
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-xs sm:text-sm">
                                                            {formatNumber(
                                                                reading.curr_meter_value,
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-xs sm:text-sm">
                                                            {formatNumber(
                                                                consumption,
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-xs sm:text-sm">
                                                            {formatNumber(
                                                                ratePerKwh,
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-xs sm:text-sm">
                                                            {formatCurrency(
                                                                consumption *
                                                                    ratePerKwh,
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-xs sm:text-sm">
                                                            {new Date(
                                                                reading.created_at,
                                                            ).toLocaleDateString()}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            },
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <p className="text-center text-muted-foreground py-4 sm:py-6 text-sm sm:text-base">
                                No meter readings found for {selectedYear}
                            </p>
                        )}
                    </CardContent>
                </Card>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-0">
                    Past Bills
                </h2>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                    <div className="w-full sm:w-40">
                        <label className="text-xs sm:text-sm font-medium mb-1 sm:mb-2 block">
                            Year
                        </label>
                        <Select
                            value={selectedBillYear.toString()}
                            onValueChange={(value) =>
                                setSelectedBillYear(value)
                            }
                        >
                            <SelectTrigger className="text-xs sm:text-sm">
                                <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                                {billYears.map((year) => (
                                    <SelectItem
                                        key={year}
                                        value={year.toString()}
                                        className="text-xs sm:text-sm"
                                    >
                                        {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {filteredSortedPastBills.length > 0 ? (
                <>
                    <div className="hidden md:block">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead
                                        onClick={() =>
                                            handleSortBills("billing_month")
                                        }
                                        className="cursor-pointer"
                                    >
                                        <div className="flex items-center">
                                            Month{" "}
                                            {getSortIconBills("billing_month")}
                                        </div>
                                    </TableHead>
                                    <TableHead
                                        onClick={() =>
                                            handleSortBills("due_date")
                                        }
                                        className="cursor-pointer"
                                    >
                                        <div className="flex items-center">
                                            Due Date{" "}
                                            {getSortIconBills("due_date")}
                                        </div>
                                    </TableHead>
                                    <TableHead
                                        onClick={() =>
                                            handleSortBills("amount_due")
                                        }
                                        className="cursor-pointer"
                                    >
                                        <div className="flex items-center">
                                            Amount Due{" "}
                                            {getSortIconBills("amount_due")}
                                        </div>
                                    </TableHead>
                                    <TableHead
                                        onClick={() =>
                                            handleSortBills("penalty")
                                        }
                                        className="cursor-pointer"
                                    >
                                        <div className="flex items-center">
                                            Penalty{" "}
                                            {getSortIconBills("penalty")}
                                        </div>
                                    </TableHead>
                                    <TableHead
                                        onClick={() =>
                                            handleSortBills("total_amount")
                                        }
                                        className="cursor-pointer"
                                    >
                                        <div className="flex items-center">
                                            Total Amount{" "}
                                            {getSortIconBills("total_amount")}
                                        </div>
                                    </TableHead>
                                    <TableHead
                                        onClick={() =>
                                            handleSortBills("payment_date")
                                        }
                                        className="cursor-pointer"
                                    >
                                        <div className="flex items-center">
                                            Payment Date{" "}
                                            {getSortIconBills("payment_date")}
                                        </div>
                                    </TableHead>
                                    <TableHead
                                        onClick={() =>
                                            handleSortBills("status")
                                        }
                                        className="cursor-pointer"
                                    >
                                        <div className="flex items-center">
                                            Status {getSortIconBills("status")}
                                        </div>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredSortedPastBills.map((bill: Bill) => {
                                    const { penalty, total, status } =
                                        calculatePenaltyAndTotal(bill);

                                    return (
                                        <TableRow
                                            key={bill.id}
                                            className="text-sm sm:text-base"
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

                    <div className="md:hidden space-y-4 sm:space-y-6">
                        {filteredSortedPastBills.map((bill: Bill) => {
                            const { penalty, total, status } =
                                calculatePenaltyAndTotal(bill);
                            return (
                                <Card key={bill.id} className="p-4 sm:p-6">
                                    <div className="space-y-3 sm:space-y-4">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-base sm:text-lg">
                                                {bill.billing_month}
                                            </h3>
                                            <span
                                                className={`text-xs sm:text-sm font-semibold px-2 py-1 sm:px-3 sm:py-2 rounded-full ${getStatusColor(
                                                    status,
                                                )} bg-muted`}
                                            >
                                                {status}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base">
                                            <div>
                                                <p className="text-muted-foreground text-xs sm:text-sm">
                                                    Due Date
                                                </p>
                                                <p>{bill.due_date}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground text-xs sm:text-sm">
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
                                        <div className="border-t pt-3 sm:pt-4 space-y-2 sm:space-y-3">
                                            <div className="flex justify-between text-sm sm:text-base">
                                                <span>Amount:</span>
                                                <span>
                                                    {peso.format(
                                                        Number(bill.amount_due),
                                                    )}
                                                </span>
                                            </div>
                                            {penalty > 0 && (
                                                <div className="flex justify-between text-destructive text-sm sm:text-base">
                                                    <span>Penalty:</span>
                                                    <span>
                                                        {peso.format(penalty)}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex justify-between font-bold text-base sm:text-lg border-t pt-2 sm:pt-3">
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
                <p className="text-center text-muted-foreground py-6 sm:py-10 text-sm sm:text-base lg:text-lg">
                    No past bills available for {selectedBillYear}.
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
        <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6">
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
