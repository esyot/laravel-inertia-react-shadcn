import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import type { Customer, Paginated } from "@/lib/interface/types";

type CustomerTableProps = {
    customers: Paginated<Customer>;
    onView?: (customer: Customer) => void;
    onDelete?: (customer: Customer) => void;
};

export function CustomerTable({ customers }: CustomerTableProps) {
    const goToPage = (page: number) => {
        if (page >= 1 && page <= customers.last_page) {
            router.get(`/customers?page=${page}`);
        }
    };

    const handleView = (c: Customer) => {
        router.visit(`/customers/${c.code}`);
    };

    return (
        <div className="border-strong overflow-hidden rounded-xl border">
            <div className="bg-sand-dugout text-weak border-strong hidden md:grid md:grid-cols-4 border-b px-5 pt-4 pb-3 text-sm font-medium">
                <div>Name</div>
                <div>Code</div>
                <div>Location</div>
                <div className="flex justify-end mr-4">Actions</div>
            </div>

            <div className="h-[calc(100vh-17.5rem)] divide-y divide-gray-200 overflow-y-scroll scroll-smooth">
                {customers.data.length > 0 ? (
                    customers.data.map((customer) => (
                        <div
                            key={customer.id}
                            className="px-6 py-4 hover:bg-gray-50"
                        >
                            <div className="grid gap-3 md:grid-cols-4 md:items-center">
                                <div className="text-sm font-medium text-[#222222] truncate">
                                    {customer.name}
                                </div>

                                <div className="text-xs text-gray-600 font-mono">
                                    {customer.code}
                                </div>

                                <div className="text-sm text-gray-700">
                                    {customer.municipal}
                                    {customer.barangay
                                        ? `, ${customer.barangay}`
                                        : ""}
                                </div>

                                <div className="flex justify-start md:justify-end">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleView(customer)}
                                    >
                                        View
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="px-6 py-4 text-center text-gray-500">
                        No customers found
                    </div>
                )}
            </div>

            <div className="text-weak flex flex-col items-center justify-between gap-3 border-t px-6 py-3 text-sm font-medium md:flex-row">
                <div className="flex items-center gap-3">
                    <button
                        className="h-8 rounded-full border px-3 py-1 font-bold text-[#222222] hover:bg-gray-100 disabled:opacity-60 disabled:hover:bg-transparent"
                        disabled={customers.current_page <= 1}
                        onClick={() => goToPage(customers.current_page - 1)}
                    >
                        Previous
                    </button>
                    <button
                        className="h-8 rounded-full border px-3 py-1 font-bold text-[#222222] hover:bg-gray-100 disabled:opacity-60 disabled:hover:bg-transparent"
                        disabled={customers.current_page >= customers.last_page}
                        onClick={() => goToPage(customers.current_page + 1)}
                    >
                        Next
                    </button>
                </div>
                <span>
                    Page {customers.current_page} of {customers.last_page} |{" "}
                    Total: {customers.total}
                </span>
            </div>
        </div>
    );
}
