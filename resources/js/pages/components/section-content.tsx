import { ReactNode } from "react";

interface PageProps {
    children: ReactNode;
}

export default function SectionContent({ children }: PageProps) {
    return (
        <main className="max-h-[calc(100vh-16.5vh)] p-4 overflow-y-auto">
            {children}
        </main>
    );
}
