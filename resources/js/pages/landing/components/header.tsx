import { useState } from "react";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    return (
        <>
            <header className="flex items-center justify-between px-4 sm:px-8 py-4 border-b">
                <div className="flex items-center gap-4">
                    <div className="leading-tight">
                        <h1 className="text-base sm:text-lg font-semibold ml-5">
                            ELICTRIC
                        </h1>
                        {/* <p className="text-xs text-slate-500">Billing & Payment System</p> */}
                    </div>
                </div>

                <nav className="hidden md:flex items-center gap-6">
                    <a
                        href="#"
                        className="text-sm text-slate-600 hover:text-slate-900"
                    >
                        To add
                    </a>
                    <a
                        href="#"
                        className="text-sm text-slate-600 hover:text-slate-900"
                    >
                        To add
                    </a>
                    <a
                        href="#"
                        className="text-sm text-slate-600 hover:text-slate-900"
                    >
                        To add
                    </a>
                    <Link href="/login">
                        <Button
                            variant="default"
                            className="ml-2 cursor-pointer"
                        >
                            Login
                        </Button>
                    </Link>
                </nav>

                <div className="md:hidden flex items-center">
                    <button
                        aria-label="Toggle menu"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="p-2 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                    >
                        {mobileOpen ? (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </header>
        </>
    );
}
