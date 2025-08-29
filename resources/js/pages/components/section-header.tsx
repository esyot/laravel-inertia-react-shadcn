import { ReactNode } from "react";

interface PageProps {
    children: ReactNode;
}

export default function SectionHeader({ children }: PageProps) {
    return <main className="border-b p-4">{children}</main>;
}
