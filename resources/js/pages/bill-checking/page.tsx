import React, { useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import axios from "axios";
import { router } from "@inertiajs/react";

type Customer = {
    id: number;
    code: string;
    name: string;
    municipal: string;
    barangay: string;
};

export default function BillChecking() {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearchCustomer = () => {
        setLoading(true);
        axios
            .get(`/customers/search?query=${search}`)
            .then((res) => {
                setResults(res.data);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    };

    const handleSelect = (code: string) => {
        router.visit(`/customers/${code}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-7xl overflow-hidden">
                <AppLayout>
                    <main className="flex flex-col items-center gap-8 px-8 md:px-16 lg:px-20 py-12">
                        <h1 className="text-4xl font-bold mb-8 text-center">
                            Search Your Bill This Month
                        </h1>
                        <div className="w-full max-w-2xl relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    handleSearchCustomer();
                                    setSearch(e.currentTarget.value);
                                }}
                                placeholder="Enter your customer code (e.g. SAGB-SC-P1-NS8DSK31GP)"
                                className="w-full border-2 border-gray-300 rounded-xl px-6 py-4 text-lg focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent"
                            />
                            {loading && (
                                <div className="absolute bg-white w-full border-2 border-gray-200 rounded-xl shadow-lg mt-2 p-4 text-gray-600 text-lg">
                                    Searching...
                                </div>
                            )}
                            {results.length > 0 && (
                                <ul className="absolute bg-white w-full border-2 border-gray-200 rounded-xl shadow-lg mt-2 max-h-80 overflow-y-auto z-10 text-lg">
                                    {results.map((customer) => (
                                        <li
                                            key={customer.id}
                                            className="px-6 py-4 hover:bg-blue-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                                            onClick={() =>
                                                handleSelect(customer.code)
                                            }
                                        >
                                            <div className="font-bold text-gray-800 text-xl mb-1">
                                                {customer.code}
                                            </div>
                                            <div className="text-base text-gray-600">
                                                {customer.name} —{" "}
                                                {customer.municipal},{" "}
                                                {customer.barangay}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <p className="text-gray-600 text-lg text-center max-w-2xl mt-4">
                            Enter your customer code to view your current bill
                            and payment history. The code can be found on your
                            monthly billing statement.
                        </p>
                    </main>
                </AppLayout>
            </div>
        </div>
    );
}
