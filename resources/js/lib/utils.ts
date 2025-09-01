import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type DateFormat = "full" | "date" | "time" | "short" | "iso" | "custom";

interface FormatDateOptions {
    format?: DateFormat;
    customFormatOptions?: Intl.DateTimeFormatOptions;
}

export function formatDate(
    dateString: string,
    options: FormatDateOptions = {},
): string {
    if (!dateString) return "—";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";

    const { format = "full", customFormatOptions } = options;

    switch (format) {
        case "date":
            return date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        case "time":
            return date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
            });
        case "short":
            return date.toLocaleString("en-US", {
                year: "2-digit",
                month: "short",
                day: "numeric",
            });
        case "iso":
            return date.toISOString();
        case "custom":
            if (customFormatOptions) {
                return date.toLocaleString("en-US", customFormatOptions);
            }
            return date.toLocaleString();
        case "full":
        default:
            return date.toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
    }
}
