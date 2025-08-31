"use client";

import { Input as InputComponent } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ComponentProps } from "react";
import { Label } from "../ui/label";

interface Props extends Omit<ComponentProps<"input">, "type"> {
    label?: string;
    id?: string;
    name?: string;
    type?: string;
    placeholder?: string;
}

export default function Input({
    label,
    id,
    name,
    placeholder,
    type = "text",
    ...rest
}: Props) {
    const labelClass = "text-gray-400 ml-2 text-xs ";

    const inputClass =
        "w-full border-moderate border my-1 bg-white-weak rounded-3xl px-4 py-2 appearance-none [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-6 [&::-webkit-calendar-picker-indicator]:cursor-pointer";

    const textareaClass =
        "w-full border-moderate border bg-white-weak rounded-xl";

    const commonProps = {
        id,
        name,
        placeholder,
    };

    return (
        <main className="flex flex-col">
            {label && (
                <Label htmlFor={id} className={labelClass}>
                    {label}
                </Label>
            )}

            {type === "textarea" ? (
                <Textarea
                    className={textareaClass}
                    {...(commonProps as ComponentProps<"textarea">)}
                    {...(rest as ComponentProps<"textarea">)}
                />
            ) : (
                <InputComponent
                    className={inputClass}
                    type={type}
                    {...commonProps}
                    {...rest}
                />
            )}
        </main>
    );
}
