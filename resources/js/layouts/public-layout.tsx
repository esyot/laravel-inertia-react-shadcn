import { ReactNode } from "react";
import Header from "@/pages/landing/components/header";
import Footer from "@/pages/landing/components/footer";
import { Toaster } from "react-hot-toast";
import ToastAlert from "@/components/composables/toast-alert";

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className="h-screen overflow-hidden flex flex-col">
            <ToastAlert />
            <Toaster position="top-right" reverseOrder={false} />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
