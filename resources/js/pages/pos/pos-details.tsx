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
import PayPopover from "./components/pay-popover";
import SectionHeader from "@/components/section-header";
import { Badge } from "@/components/ui/badge";

interface MeterReading {
    id: number;
    month: string;
    year: number;
    prev_meter_value: number;
    curr_meter_value: number;
    consumption?: number;
    created_at: string;
    bill?: Bill;
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
    current_bill?: Bill;
}

interface CustomerProps {
    customer: Customer;
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
    ratePerKwh = 11,
    bills,
}: CustomerProps) {
    const printRef = useRef<HTMLDivElement>(null);
    const [selectedYear, setSelectedYear] = useState<number>(() => {
        const years =
            customer.meter_readings?.map((reading) => reading.year) || [];
        return years.length > 0 ? Math.max(...years) : new Date().getFullYear();
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
                    bValue = b.prev_meter_value;
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

    if (!customer) return <p className="text-center">Customer not found</p>;

    const formatCurrency = (price: number) => {
        return new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
        }).format(price);
    };
    return (
        <main>
            <Layout>
                <SectionHeader>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="w-fit -ml-2 cursor-pointer"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                </SectionHeader>
                <SectionContent header={false}>
                    <div>
                        <div className="w-full">
                            <div>
                                <h1 className="text-3xl font-semibold ">
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
                                    Status:
                                    <Badge
                                        className={
                                            customer.status === "Terminated"
                                                ? "ml-2 bg-red-100 text-red-800"
                                                : "ml-2 bg-green-100 text-green-800"
                                        }
                                    >
                                        {customer.status}
                                    </Badge>
                                </p>
                            </div>
                        </div>

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
                                                const [field, order] =
                                                    value.split("-") as [
                                                        SortField,
                                                        SortOrder,
                                                    ];
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
                                                            {getSortIcon(
                                                                "month",
                                                            )}
                                                        </div>
                                                    </TableHead>
                                                    <TableHead
                                                        className="cursor-pointer hover:bg-gray-100"
                                                        onClick={() =>
                                                            handleSort(
                                                                "meter_value",
                                                            )
                                                        }
                                                    >
                                                        <div className="flex items-center">
                                                            Previous Reading
                                                            (kWh)
                                                            {getSortIcon(
                                                                "meter_value",
                                                            )}
                                                        </div>
                                                    </TableHead>
                                                    <TableHead
                                                        className="cursor-pointer hover:bg-gray-100"
                                                        onClick={() =>
                                                            handleSort(
                                                                "meter_value",
                                                            )
                                                        }
                                                    >
                                                        <div className="flex items-center">
                                                            Current Reading
                                                            (kWh)
                                                            {getSortIcon(
                                                                "meter_value",
                                                            )}
                                                        </div>
                                                    </TableHead>
                                                    <TableHead
                                                        className="cursor-pointer hover:bg-gray-100"
                                                        onClick={() =>
                                                            handleSort(
                                                                "consumption",
                                                            )
                                                        }
                                                    >
                                                        <div className="flex items-center">
                                                            Consumption (kWh)
                                                            {getSortIcon(
                                                                "consumption",
                                                            )}
                                                        </div>
                                                    </TableHead>
                                                    <TableHead>
                                                        Rate (₱/kWh)
                                                    </TableHead>
                                                    <TableHead>
                                                        Estimated Amount
                                                    </TableHead>
                                                    <TableHead
                                                        className="cursor-pointer hover:bg-gray-100"
                                                        onClick={() =>
                                                            handleSort(
                                                                "created_at",
                                                            )
                                                        }
                                                    >
                                                        <div className="flex items-center">
                                                            Recorded Date
                                                            {getSortIcon(
                                                                "created_at",
                                                            )}
                                                        </div>
                                                    </TableHead>
                                                    <TableHead>
                                                        Action
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {filteredMeterReadings.map(
                                                    (reading: MeterReading) => (
                                                        <TableRow
                                                            key={reading.id}
                                                        >
                                                            <TableCell>
                                                                {reading.month}{" "}
                                                                {reading.year}
                                                            </TableCell>
                                                            <TableCell>
                                                                {formatNumber(
                                                                    reading.prev_meter_value,
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                {formatNumber(
                                                                    reading.curr_meter_value,
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                {formatNumber(
                                                                    reading.curr_meter_value -
                                                                        reading.prev_meter_value,
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                {formatNumber(
                                                                    ratePerKwh,
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                {formatCurrency(
                                                                    (reading.curr_meter_value -
                                                                        reading.prev_meter_value) *
                                                                        ratePerKwh,
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                {new Date(
                                                                    reading.created_at,
                                                                ).toLocaleDateString()}
                                                            </TableCell>
                                                            <TableCell>
                                                                <PayPopover
                                                                    billId={
                                                                        reading
                                                                            .bill
                                                                            ?.id ||
                                                                        0
                                                                    }
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    ),
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                ) : (
                                    <p className="text-center text-muted-foreground py-6">
                                        No meter readings found for{" "}
                                        {selectedYear}
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </SectionContent>
            </Layout>
        </main>
    );
}
