import { ReactNode } from "react";
import Header from "@/pages/landing/components/header";
import Footer from "@/pages/landing/components/footer";

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className="h-screen overflow-hidden flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
