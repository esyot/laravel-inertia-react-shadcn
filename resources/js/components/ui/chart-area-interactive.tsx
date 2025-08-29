"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const description = "Monthly electricity consumption chart";

const chartData = [
    { month: "Jan", consumption: 320 },
    { month: "Feb", consumption: 280 },
    { month: "Mar", consumption: 350 },
    { month: "Apr", consumption: 400 },
    { month: "May", consumption: 370 },
    { month: "Jun", consumption: 420 },
    { month: "Jul", consumption: 390 },
    { month: "Aug", consumption: 410 },
    { month: "Sep", consumption: 360 },
    { month: "Oct", consumption: 430 },
    { month: "Nov", consumption: 395 },
    { month: "Dec", consumption: 440 },
];

const chartConfig = {
    consumption: {
        label: "kWh Consumed",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
    const [timeRange, setTimeRange] = React.useState("6m");

    const filteredData =
        timeRange === "3m"
            ? chartData.slice(-3)
            : timeRange === "6m"
              ? chartData.slice(-6)
              : chartData;

    return (
        <Card className="pt-0">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Electricity Consumption</CardTitle>
                    <CardDescription>
                        Showing consumed kWh for the selected months
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="12m" className="rounded-lg">
                            Last 12 months
                        </SelectItem>
                        <SelectItem value="6m" className="rounded-lg">
                            Last 6 months
                        </SelectItem>
                        <SelectItem value="3m" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient
                                id="fillConsumption"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-consumption)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-consumption)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <YAxis
                            dataKey="consumption"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            label={{
                                value: "kWh",
                                angle: -90,
                                position: "insideLeft",
                                style: { textAnchor: "middle" },
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) =>
                                        `Month: ${value}`
                                    }
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="consumption"
                            type="natural"
                            fill="url(#fillConsumption)"
                            stroke="var(--color-consumption)"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
