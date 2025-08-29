import { ReactNode } from "react";

interface PageProps {
    children: ReactNode;
}

export default function SectionHeader({ children }: PageProps) {
    return <main className="p-4">{children}</main>;
}
