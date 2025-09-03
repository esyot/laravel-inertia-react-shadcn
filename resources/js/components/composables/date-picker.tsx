"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import Button from "./button";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { Dispatch, SetStateAction } from "react";

interface DatePickerProps {
    date: Date | undefined;
    setDate: Dispatch<SetStateAction<Date | undefined>>;
    placeholder?: string;
    className?: string;
    label?: string;
    disabled?: boolean;
    formatString?: string;
}

export default function DatePicker({
    date,
    setDate,
    placeholder = "Select date",
    className,
    label,
    disabled = false,
    formatString = "PPP",
}: DatePickerProps) {
    const labelClass = "text-gray-400 ml-2 text-xs ";
    const placeholderClass = "truncate text-gray-400 font-normal";
    return (
        <div className="flex flex-col gap-1">
            {label && <label className={labelClass}>{label}</label>}

            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        shape="rounded"
                        disabled={disabled}
                        className={cn(
                            "bg-gray-50  w-full justify-between px-4 text-left",
                            !date && "text-weak",
                            className,
                        )}
                    >
                        <span className={placeholderClass}>
                            {date ? format(date, formatString) : placeholder}
                        </span>
                        <Calendar className="ml-2 h-4 w-4 text-gray-500" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <ShadcnCalendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
