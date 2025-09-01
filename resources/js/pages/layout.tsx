import { AppSidebar } from "@/components/app-sidebar";
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
import ProfilePage from "./profile/profile-popover";

interface PageProps {
    children: ReactNode;
}

export default function Layout({ children }: PageProps) {
    const { url, component, props } = usePage();

    const parts = component.toString().split("/");
    const parent: string = parts[0] ?? "";
    const child: string = parts[1] ?? "";

    // Check if we're on specific pages
    const isCustomerDetailPage = component
        .toString()
        .includes("customers/customer");
    const isCustomerListPage =
        component.toString().includes("customers/list") ||
        (component.toString().includes("customers") && !isCustomerDetailPage);
    const customerCode = props.customer?.code;

    const formatFirstLetterToUpperCase = (text: string) => {
        let formattedText = text[0]?.toUpperCase() + text.slice(1);
        return formattedText;
    };

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
                                    {/* Always show the parent link */}
                                    <BreadcrumbItem className="hidden md:block">
                                        <Link href={`/${parent}`}>
                                            {formatFirstLetterToUpperCase(
                                                parent,
                                            )}
                                        </Link>
                                    </BreadcrumbItem>

                                    {/* Show child only if it's not the main list page and not empty */}
                                    {isCustomerDetailPage && customerCode ? (
                                        <>
                                            <BreadcrumbSeparator className="hidden md:block" />
                                            <BreadcrumbItem>
                                                <BreadcrumbPage>
                                                    {customerCode}
                                                </BreadcrumbPage>
                                            </BreadcrumbItem>
                                        </>
                                    ) : !isCustomerListPage &&
                                      child !== "page" &&
                                      child !== "" ? (
                                        <>
                                            <BreadcrumbSeparator className="hidden md:block" />
                                            <BreadcrumbItem>
                                                <Link href={url}>
                                                    <BreadcrumbPage>
                                                        {formatFirstLetterToUpperCase(
                                                            child,
                                                        )}
                                                    </BreadcrumbPage>
                                                </Link>
                                            </BreadcrumbItem>
                                        </>
                                    ) : null}
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <div>
                            <ProfilePage />
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

// import { AppSidebar } from "@/components/app-sidebar";
// import {
//     Breadcrumb,
//     BreadcrumbItem,
//     BreadcrumbList,
//     BreadcrumbPage,
//     BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Separator } from "@/components/ui/separator";
// import {
//     SidebarInset,
//     SidebarProvider,
//     SidebarTrigger,
// } from "@/components/ui/sidebar";
// import { ReactNode } from "react";

// interface PageProps {
//     children: ReactNode;
// }
// import { usePage } from "@inertiajs/react";

// import { Link } from "@inertiajs/react";

// export default function Layout({ children }: PageProps) {
//     const { url, component } = usePage();

//     const parts = component.toString().split("/");

//     const parent: string = parts[0] ?? "";
//     const child: string = parts[1] ?? "";

//     const formatFirstLetterToUpperCase = (text: string) => {
//         let formattedText = text[0]?.toUpperCase() + text.slice(1);
//         return formattedText;
//     };
//     return (
//         <SidebarProvider>
//             <AppSidebar />
//             <SidebarInset className="bg-sand ">
//                 <main className="h-screen overflow-y-hidden">
//                     <header className="bg-none  flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear bg-sand">
//                         <div className="flex items-center gap-2 px-4">
//                             <SidebarTrigger className="-ml-1" />
//                             <Separator
//                                 orientation="vertical"
//                                 className="mr-2 data-[orientation=vertical]:h-4"
//                             />
//                             <Breadcrumb>
//                                 <BreadcrumbList>
//                                     <BreadcrumbItem className="hidden md:block">
//                                         <Link href={parent}>
//                                             {formatFirstLetterToUpperCase(
//                                                 parent,
//                                             )}
//                                         </Link>
//                                     </BreadcrumbItem>
//                                     {child !== "page" && (
//                                         <>
//                                             <BreadcrumbSeparator className="hidden md:block" />
//                                             <BreadcrumbItem>
//                                                 <Link href={url}>
//                                                     <BreadcrumbPage>
//                                                         {formatFirstLetterToUpperCase(
//                                                             child,
//                                                         )}
//                                                     </BreadcrumbPage>
//                                                 </Link>
//                                             </BreadcrumbItem>
//                                         </>
//                                     )}
//                                 </BreadcrumbList>
//                             </Breadcrumb>
//                         </div>
//                     </header>
//                     <section className="bg-white sm:rounded-tl-3xl overflow-y-hidden h-[calc(100vh-8.5vh)] shadow-md">
//                         {children}
//                     </section>
//                 </main>
//             </SidebarInset>
//         </SidebarProvider>
//     );
// }
