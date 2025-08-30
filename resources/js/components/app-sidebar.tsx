"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

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
    const { url, props }: any = usePage();

    const user = props.user;

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
                        <div className="flex w-full gap-2 p-2 items-center border flex-1">
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

                            <h1>{user.name}</h1>
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
