import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
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

interface PageProps {
    children: ReactNode;
}
import { usePage } from "@inertiajs/react";

export default function Layout({ children }: PageProps) {
    const { url, component } = usePage();

    const parts = component.toString().split("/");

    const parent: string = parts[0] ?? "";
    const child: string = parts[1] ?? "";

    const formatFirstLetterToUpperCase = (text: string) => {
        let formattedText = text[0]?.toUpperCase() + text.slice(1);
        return formattedText;
    };
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-sand ">
                <main className="h-screen overflow-y-hidden">
                    <header className="bg-none  flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear bg-sand">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href={parent}>
                                            {formatFirstLetterToUpperCase(
                                                parent,
                                            )}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    {child !== "page" && (
                                        <>
                                            <BreadcrumbSeparator className="hidden md:block" />
                                            <BreadcrumbItem>
                                                <BreadcrumbLink href={url}>
                                                    <BreadcrumbPage>
                                                        {formatFirstLetterToUpperCase(
                                                            child,
                                                        )}
                                                    </BreadcrumbPage>
                                                </BreadcrumbLink>
                                            </BreadcrumbItem>
                                        </>
                                    )}
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>
                    <section className="bg-white rounded-tl-3xl overflow-y-hidden h-[calc(100vh-8.5vh)] shadow-md">
                        {children}
                    </section>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
