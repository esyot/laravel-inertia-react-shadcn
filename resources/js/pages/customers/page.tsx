import React from "react";
import AppLayout from "@/layouts/AppLayout";

export default function Page({ customer }: { customer: any }) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-7xl overflow-hidden">
                <AppLayout>
                    <main className="flex flex-col items-center gap-4 px-6 md:px-12 py-8">
                        <div className="p-6">
                            <h1 className="text-2xl font-bold mb-4">
                                Customer Details
                            </h1>
                            <p>
                                <strong>Code:</strong> {customer.code}
                            </p>
                            <p>
                                <strong>Name:</strong> {customer.name}
                            </p>
                            <p>
                                <strong>Municipal:</strong> {customer.municipal}
                            </p>
                            <p>
                                <strong>Barangay:</strong> {customer.barangay}
                            </p>
                            <p>
                                <strong>Purok:</strong>{" "}
                                {customer.purok ?? "N/A"}
                            </p>
                        </div>
                    </main>
                </AppLayout>
            </div>
        </div>
    );
}
