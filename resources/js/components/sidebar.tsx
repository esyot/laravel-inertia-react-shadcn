"use client";

import {
    LayoutDashboard,
    Users,
    HandCoins,
    CircleGauge,
    DollarSign,
    PersonStanding,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";

import { Link, usePage } from "@inertiajs/react";

import { cn } from "@/lib/utils";

const menuItems = [
    {
        name: "Dashboard",
        link: "/dashboard",
        icon: LayoutDashboard,
        role: "admin",
    },
    { name: "Users", link: "/users", icon: Users },
    { name: "Meters", link: "/meters", icon: CircleGauge },
    { name: "Customers", link: "/customers", icon: PersonStanding },
    { name: "POS", link: "/pos", icon: DollarSign },
    { name: "Transactions", link: "/transactions", icon: HandCoins },
];

export function AppSidebar() {
    const { url, props }: any = usePage();

    const user = props?.user;

    return (
        <Sidebar className="border-none bg-sand">
            <Link href="/">
                <SidebarHeader className="bg-sand p-4">
                    <span className="font-semibold">BEC</span>
                </SidebarHeader>
            </Link>
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
            <SidebarRail />
        </Sidebar>
    );
}
