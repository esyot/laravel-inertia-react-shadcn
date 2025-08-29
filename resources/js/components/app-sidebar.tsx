"use client";
import { LayoutDashboard, Users, HandCoins } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { Link, usePage } from "@inertiajs/react";
import { cn } from "@/lib/utils";
const menuItems = [
    { name: "Dashboard", link: "/dashboard", icon: LayoutDashboard },
    { name: "Users", link: "/users", icon: Users },
    { name: "Transactions", link: "/transactions", icon: HandCoins },
];
export function AppSidebar() {
    const { url } = usePage();

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
            <SidebarFooter className="bg-sand"></SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
