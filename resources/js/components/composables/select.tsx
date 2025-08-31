"use client";

import {
    Select as ShadSelect,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { ComponentProps } from "react";

interface Option {
    label: string;
    value: string;
}

interface SelectProps extends ComponentProps<typeof ShadSelect> {
    label?: string;
    id?: string;
    name?: string;
    placeholder?: string;
    options: Option[];
}

export default function Select({
    label,
    id,
    name,
    placeholder = "Select an option",
    options,
    ...rest
}: SelectProps) {
    const labelClass = "text-moderate-weak ml-2 font-medium";

    const selectClass =
        "w-full border-moderate border my-1 bg-white-weak rounded-3xl";

    return (
        <main className="flex flex-col">
            {label && (
                <Label htmlFor={id} className={labelClass}>
                    {label}
                </Label>
            )}

            <ShadSelect {...rest} {...(name ? { name } : {})}>
                <SelectTrigger className={selectClass}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </ShadSelect>
        </main>
    );
}
