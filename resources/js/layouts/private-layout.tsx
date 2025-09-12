import { AppSidebar } from "@/components/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import ProfilePage from "../pages/profile/profile-popover";
import { User } from "@/lib/interface/types";
import { useState, useEffect } from "react";
import ChangePasswordDialog from "@/pages/login/components/change-password-dialog";
import { Toaster } from "react-hot-toast";
import ToastAlert from "@/components/composables/toast-alert";

interface PageProps {
    children: ReactNode;
}

type Customer = {
    code: string;
    name: string;
};

type SharedProps = {
    auth: { user: User | null };
    must_change_password: boolean;
};

export default function Layout({ children }: PageProps) {
    const { props, url, component } = usePage<SharedProps>();
    const user = props.auth?.user;

    const parts = component.toString().split("/");
    const parent: string = parts[0] ?? "";
    const child: string = parts[1] ?? "";

    const customer = props?.customer as Customer;

    const formatFirstLetterToUpperCase = (text: string) => {
        let formattedText = text[0]?.toUpperCase() + text.slice(1);
        return formattedText;
    };

    const forceOpen =
        props.must_change_password ||
        (user ? !user.is_password_changed : false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (forceOpen) setOpen(true);
    }, [forceOpen]);

    if (!user) return null;

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-sand ">
                <main className="h-screen overflow-y-hidden">
                    <header className="bg-none flex justify-between mr-5 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear bg-sand">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <Link href={`/${parent}`}>
                                            {formatFirstLetterToUpperCase(
                                                parent,
                                            )}
                                        </Link>
                                    </BreadcrumbItem>

                                    {child != "page" && (
                                        <>
                                            <BreadcrumbSeparator className="hidden md:block" />
                                            <BreadcrumbItem>
                                                <Link href={url}>
                                                    <BreadcrumbPage>
                                                        {component ===
                                                        "customers/customer"
                                                            ? customer.code
                                                            : formatFirstLetterToUpperCase(
                                                                  child,
                                                              )}
                                                    </BreadcrumbPage>
                                                </Link>
                                            </BreadcrumbItem>{" "}
                                        </>
                                    )}
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <div>
                            <ProfilePage />
                        </div>
                    </header>
                    <ToastAlert />
                    <Toaster position="top-right" reverseOrder={false} />
                    <section className="bg-white rounded-tl-3xl overflow-y-hidden h-[calc(100vh-8.5vh)] shadow-md">
                        {children}

                        {user && <ChangePasswordDialog user={user} />}
                    </section>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
