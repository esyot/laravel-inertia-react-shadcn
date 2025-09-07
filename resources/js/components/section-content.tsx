import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PageProps {
    header?: boolean;
    children: ReactNode;
    className?: string;
}

export default function SectionContent({
    children,
    header = true,
    className,
}: PageProps) {
    return (
        <main
            className={cn(
                header
                    ? "max-h-[calc(100vh-16.5vh)]"
                    : "max-h-[calc(100vh-8vh)]",
                " p-4 overflow-y-auto",
                className,
            )}
        >
            {children}
        </main>
    );
}
