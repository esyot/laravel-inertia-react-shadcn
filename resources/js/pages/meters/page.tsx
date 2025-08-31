import { MeterTable } from "./components/meterTable";
import Layout from "../layout";
import SectionContent from "../components/section-content";
import { router, usePage } from "@inertiajs/react";
import { AddMeterReadingDialog } from "./components/meterDialog";
import SectionHeader from "../components/section-header";
import { useState } from "react";
import axios from "axios";

type Customer = {
    id: number;
    code: string;
    name?: string;
};

export default function Index({ readings }: any) {
    const { props }: any = usePage();
    const [search, setSearch] = useState("");
    const [results, setResults] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(false);
    const [filteredReadings, setFilteredReadings] = useState(readings);

    const handleSearchCustomer = (query: string) => {
        if (!query) {
            setResults([]);
            setFilteredReadings(readings); // reset table if input cleared
            return;
        }

        setLoading(true);
        axios
            .get(`/customers/search?query=${query}`)
            .then((res) => {
                setResults(res.data);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    };

    const handleSelect = (customer: Customer) => {
        setSearch(customer.code);
        setResults([]);

        // Filter readings based on customer_id
        const filtered = readings.filter(
            (r: any) => r.customer_id === customer.id,
        );
        setFilteredReadings(filtered);
    };

    const handleDelete = (reading: any) => {
        if (confirm(`Are you sure you want to delete this reading?`)) {
            router.delete(`/meters/${reading.id}`);
        }
    };

    return (
        <main>
            <Layout>
                <SectionHeader className="flex justify-between">
                    <div className="flex w-full items-center gap-2">
                        <h1 className="text-xl font-semibold">
                            Meter Readings
                        </h1>
                        <div className="w-full max-w-2xl relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    const val = e.currentTarget.value;
                                    setSearch(val);
                                    handleSearchCustomer(val);
                                }}
                                placeholder="Enter your customer code (e.g. SAGB-SC-P1-NS8DSK31GP)"
                                className="w-[70%] border-2 p-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent"
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
                                                handleSelect(customer)
                                            }
                                        >
                                            <div className="font-bold text-gray-800">
                                                {customer.code}
                                            </div>
                                            {customer.name && (
                                                <div className="text-sm text-gray-500">
                                                    {customer.name}
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <AddMeterReadingDialog />
                </SectionHeader>
                <SectionContent header={false}>
                    <MeterTable
                        readings={filteredReadings}
                        onDelete={handleDelete}
                    />
                </SectionContent>
            </Layout>
        </main>
    );
}
