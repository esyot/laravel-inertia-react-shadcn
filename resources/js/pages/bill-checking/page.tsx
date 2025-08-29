import React, { useState, useEffect } from "react";
import AppLayout from "@/layouts/AppLayout";
import axios from "axios";

export default function Page() {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (search.length > 2) {
            setLoading(true);
            axios
                .get(`/customers/search?query=${search}`)
                .then((res) => {
                    setResults(res.data);
                })
                .finally(() => setLoading(false));
        } else {
            setResults([]);
        }
    }, [search]);

    const handleSelect = (customer: any) => {
        // redirect to public details page
        window.location.href = `/customers/${customer.id}`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-7xl overflow-hidden">
                <AppLayout>
                    <main className="flex flex-col items-center gap-4 px-6 md:px-12 py-8">
                        <h1 className="text-2xl font-semibold mb-4">
                            Search Your Bill This Month
                        </h1>

                        <div className="w-full max-w-md relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Enter your customer code (e.g. SAGB-SC-P1-NS8DSK31GP)"
                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                            />

                            {loading && (
                                <div className="absolute bg-white w-full border rounded-lg shadow mt-1 p-2 text-gray-500 text-sm">
                                    Searching...
                                </div>
                            )}

                            {results.length > 0 && (
                                <ul className="absolute bg-white w-full border rounded-lg shadow mt-1 max-h-60 overflow-y-auto z-10">
                                    {results.map((customer) => (
                                        <li
                                            key={customer.id}
                                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                                            onClick={() =>
                                                handleSelect(customer)
                                            }
                                        >
                                            <div className="font-semibold text-gray-800">
                                                {customer.code}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {customer.name} —{" "}
                                                {customer.municipal},{" "}
                                                {customer.barangay}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </main>
                </AppLayout>
            </div>
        </div>
    );
}
