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
// import { usePage } from "@inertiajs/react";
// import { Link } from "@inertiajs/react";

// interface PageProps {
//     children: ReactNode;
// }

// export default function Layout({ children }: PageProps) {
//     const { url, component, props } = usePage();

//     const parts = component.toString().split("/");
//     const parent: string = parts[0] ?? "";
//     const child: string = parts[1] ?? "";

//     // Check if we're on specific pages
//     const isCustomerDetailPage = component
//         .toString()
//         .includes("customers/customer");
//     const isCustomerListPage =
//         component.toString().includes("customers/list") ||
//         (component.toString().includes("customers") && !isCustomerDetailPage);
//     const customerCode = props.customer?.code;

//     const formatFirstLetterToUpperCase = (text: string) => {
//         let formattedText = text[0]?.toUpperCase() + text.slice(1);
//         return formattedText;
//     };

//     return (
//         <SidebarProvider>
//             <AppSidebar />
//             <SidebarInset className="bg-sand ">
//                 <main className="h-screen overflow-y-hidden">
//                     <header className="bg-none flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear bg-sand">
//                         <div className="flex items-center gap-2 px-4">
//                             <SidebarTrigger className="-ml-1" />
//                             <Separator
//                                 orientation="vertical"
//                                 className="mr-2 data-[orientation=vertical]:h-4"
//                             />
//                             <Breadcrumb>
//                                 <BreadcrumbList>
//                                     {/* Always show the parent link */}
//                                     <BreadcrumbItem className="hidden md:block">
//                                         <Link href={`/${parent}`}>
//                                             {formatFirstLetterToUpperCase(
//                                                 parent,
//                                             )}
//                                         </Link>
//                                     </BreadcrumbItem>

//                                     {/* Show child only if it's not the main list page and not empty */}
//                                     {isCustomerDetailPage && customerCode ? (
//                                         <>
//                                             <BreadcrumbSeparator className="hidden md:block" />
//                                             <BreadcrumbItem>
//                                                 <BreadcrumbPage>
//                                                     {customerCode}
//                                                 </BreadcrumbPage>
//                                             </BreadcrumbItem>
//                                         </>
//                                     ) : !isCustomerListPage &&
//                                       child !== "page" &&
//                                       child !== "" ? (
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
//                                     ) : null}
//                                 </BreadcrumbList>
//                             </Breadcrumb>
//                         </div>
//                     </header>
//                     <section className="bg-white rounded-tl-3xl overflow-y-hidden h-[calc(100vh-8.5vh)] shadow-md">
//                         {children}
//                     </section>
//                 </main>
//             </SidebarInset>
//         </SidebarProvider>
//     );
// }

"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import {
    LayoutDashboard,
    Users,
    HandCoins,
    CircleGauge,
    ChevronUp,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";

import { Link, usePage } from "@inertiajs/react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const menuItems = [
    { name: "Dashboard", link: "/dashboard", icon: LayoutDashboard },
    { name: "Users", link: "/users", icon: Users },
    { name: "Transactions", link: "/transactions", icon: HandCoins },
    { name: "Meters", link: "/meters", icon: CircleGauge },
    { name: "Customers", link: "/customers", icon: Users },
];

export function AppSidebar() {
    const { url, props }: any = usePage();

    const user = props?.user;

    return (
        <Sidebar className="border-none bg-sand">
            <SidebarHeader className="bg-sand p-4">
                <span className="font-semibold">BEC</span>
            </SidebarHeader>
            <SidebarContent className="bg-sand">
                <div className="grid grid-cols-1 gap-4 p-4">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = url.startsWith(item.link);
                        return (
                            <Link key={item.link} href={item.link}>
                                <div
                                    className={cn(
                                        "p-2 rounded-3xl hover:bg-white/50 flex items-center pl-5 gap-2",
                                        isActive && "bg-white shadow-md",
                                    )}
                                >
                                    <Icon size={16} /> {item.name}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </SidebarContent>
            <SidebarFooter className="bg-sand border-t hover:bg-white/50 p-0">
                <Popover>
                    <PopoverTrigger>
                        <div className="flex w-full justify-center gap-2 p-2 items-center border flex-1">
                            {user?.img ? (
                                <Avatar>
                                    <AvatarImage src={user?.img} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            ) : (
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            )}

                            <h1>{user?.name}</h1>

                            <ChevronUp size={16} className="block m-2" />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-0">
                        <ul className="p-2">
                            <li className="hover:opacity-50 p-2">Profile</li>
                            <Link href="/log-out">
                                <li className="hover:opacity-50 p-2">
                                    Log-out
                                </li>
                            </Link>
                        </ul>
                    </PopoverContent>
                </Popover>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
