// components/FilterSelect.tsx
import React from "react";

interface FilterSelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}

export default function FilterSelect({
    label,
    value,
    onChange,
    options,
}: FilterSelectProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-2 border rounded-md"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
