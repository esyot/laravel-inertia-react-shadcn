import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
    LayoutDashboard,
    Users,
    HandCoins,
    CircleGauge,
    ChevronUp,
    ChevronDown,
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
import Button from "@/components/composables/button";

export default function ProfileButton() {
    const { url, props }: any = usePage();

    const user = props?.user;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost">
                    <Avatar>
                        <AvatarImage src={user?.img} />
                        <AvatarFallback className="bg-gray-300 shadow-md">
                            <svg
                                className="w-10 h-10 text-black"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5.121 17.804A11.958 11.958 0 0112 15c2.486 0 4.78.755 6.879 2.053M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </AvatarFallback>
                    </Avatar>
                    <h1 className="font-semibold cursor-pointer">
                        {user?.name}
                    </h1>

                    <ChevronDown size={16} className="block m-2" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-56 p-2 rounded-xl shadow-lg">
                <Link
                    href="/profile"
                    className={cn(
                        url === "/profile" ? "bg-blue-200 text-white" : "",
                        "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md",
                    )}
                >
                    Account
                </Link>

                <Link
                    href="/log-out"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                    Log-out
                </Link>
            </PopoverContent>
        </Popover>
    );
}
