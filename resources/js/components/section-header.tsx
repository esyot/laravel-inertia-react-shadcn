import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PageProps {
    className?: string;
    children: ReactNode;
}

export default function SectionHeader({ children, className }: PageProps) {
    return <main className={cn("border-b p-4", className)}>{children}</main>;
}
