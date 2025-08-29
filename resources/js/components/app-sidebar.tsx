"use client";

import * as React from "react";
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    LayoutDashboard,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
    Users,
    UsersRound,
    HandCoins,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { Link, usePage } from "@inertiajs/react";

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Playground",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "History",
                    url: "#",
                },
                {
                    title: "Starred",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "Models",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { url } = usePage();
    return (
        <Sidebar collapsible="icon" {...props} className="border-none bg-sand">
            <SidebarHeader className="bg-sand p-4">
                <span className="font-semibold">BEC</span>
            </SidebarHeader>

            <SidebarContent className="bg-sand">
                <ul className="mt-4 px-4 space-y-4">
                    <li
                        className={`flex items-center gap-2 pl-6 rounded-3xl p-2 cursor-pointer ${
                            url.startsWith("/dashboard")
                                ? "bg-blue-500 text-white"
                                : "hover:bg-white"
                        }`}
                    >
                        <LayoutDashboard />
                        <Link href="/dashboard">Dashboard</Link>
                    </li>

                    <li
                        className={`flex items-center gap-2 pl-6 rounded-3xl p-2 cursor-pointer ${
                            url === "/manage-user"
                                ? "bg-blue-500 text-white"
                                : "hover:bg-white"
                        }`}
                    >
                        <Users />
                        <Link href="/manage-user">Users</Link>
                    </li>
                    <li
                        className={`flex items-center gap-2 pl-6 rounded-3xl p-2 cursor-pointer ${
                            url === "/payment"
                                ? "bg-blue-500 text-white"
                                : "hover:bg-white"
                        }`}
                    >
                        <HandCoins />
                        <Link href="/payment">Transaction</Link>
                    </li>
                </ul>
            </SidebarContent>
            <SidebarFooter className="bg-sand"></SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
