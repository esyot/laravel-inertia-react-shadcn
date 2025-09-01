import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Link } from "@inertiajs/react";

export default function ProfileButton() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center cursor-pointer hover:opacity-80">
                    <svg
                        className="w-6 h-6 text-white"
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
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-2">
                <Link
                    href="/profile"
                    className="block px-2 py-1 rounded-md text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                    Account
                </Link>
            </PopoverContent>
        </Popover>
    );
}
