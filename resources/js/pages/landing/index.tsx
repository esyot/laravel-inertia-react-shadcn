import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Footer from "@/pages/landing/components/footer";
import AppLayout from "@/layouts/AppLayout";
const illustrationSrc =
    "https://img.freepik.com/premium-vector/pay-electricity-using-mobile-application-tiny-people-holding-light-bulb-phone_1135642-147.jpg?w=1480"; // replace with your image path

export default function LandingPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-7xl overflow-hidden">
                <AppLayout>
                    <main className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-6 md:px-12 py-8 items-center">
                        <section className="order-2 md:order-1">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-slate-900">
                                Electric Billing &{" "}
                                <br className="hidden md:inline" /> Payment
                                System
                            </h2>

                            <p className="mt-4 text-slate-600 max-w-xl">
                                A comprehensive platform to manage customer
                                accounts, utility meters, monthly bills, and
                                payments. Built for cashiers, admins, and
                                customers — with automated billing, penalties,
                                and a clean customer portal.
                            </p>

                            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md">
                                <Card className="p-3 flex flex-col items-center justify-center">
                                    <div className="w-10 h-10 rounded-md bg-blue-50 flex items-center justify-center text-lg">
                                        👥
                                    </div>
                                    <span className="text-xs mt-2">
                                        Customers
                                    </span>
                                </Card>

                                <Card className="p-3 flex flex-col items-center justify-center">
                                    <div className="w-10 h-10 rounded-md bg-blue-50 flex items-center justify-center text-lg">
                                        🔌
                                    </div>
                                    <span className="text-xs mt-2">Meters</span>
                                </Card>

                                <Card className="p-3 flex flex-col items-center justify-center">
                                    <div className="w-10 h-10 rounded-md bg-blue-50 flex items-center justify-center text-lg">
                                        📄
                                    </div>
                                    <span className="text-xs mt-2">
                                        Billing
                                    </span>
                                </Card>

                                <Card className="p-3 flex flex-col items-center justify-center">
                                    <div className="w-10 h-10 rounded-md bg-blue-50 flex items-center justify-center text-lg">
                                        💳
                                    </div>
                                    <span className="text-xs mt-2">
                                        Payments
                                    </span>
                                </Card>
                            </div>

                            <div className="mt-8 flex flex-col sm:flex-row items-center sm:items-start gap-3">
                                <Link href="/login">
                                    <Button className="px-6 py-3 w-full sm:w-auto cursor-pointer">
                                        Get started
                                    </Button>
                                </Link>
                            </div>

                            <footer className="mt-8 text-xs text-slate-400">
                                <p>
                                    Trusted by local utilities • Auto-generate
                                    monthly bills • Cashier-friendly payments
                                </p>
                            </footer>
                        </section>

                        <section className="order-1 md:order-2">
                            <div className="relative rounded-xl overflow-hidden shadow-inner bg-gradient-to-br from-white to-slate-50 p-4 md:p-6">
                                <img
                                    src={illustrationSrc}
                                    alt="Landing illustration showing dashboard and cashier"
                                    className="w-full h-auto object-contain rounded-md"
                                />

                                <div className="mt-4 md:mt-0 md:absolute md:right-8 md:top-12 bg-white/90 backdrop-blur-md rounded-lg p-3 shadow-md w-full md:w-56">
                                    <div className="text-xs text-slate-500">
                                        Bills
                                    </div>
                                    <div className="mt-1 text-sm font-medium text-slate-800">
                                        {new Date().toLocaleString("default", {
                                            month: "long",
                                        })}{" "}
                                        {new Date().getFullYear()}
                                    </div>
                                    <div className="mt-3 flex items-baseline justify-between">
                                        <div className="text-2xl font-semibold">
                                            ₱123.54
                                        </div>
                                        <div className="text-xs text-green-600">
                                            On time
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                    <section
                        id="features"
                        className="px-6 md:px-12 py-8 border-t"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">
                                    Automated Billing
                                </h3>
                                <p className="mt-2 text-sm text-slate-600">
                                    Generate monthly bills from meter readings
                                    and schedule penalties for overdue accounts.
                                </p>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">
                                    Simple Payments
                                </h3>
                                <p className="mt-2 text-sm text-slate-600">
                                    Cashier-friendly payment input and receipt
                                    tracking tied to accounts and bills.
                                </p>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">
                                    Customer Portal
                                </h3>
                                <p className="mt-2 text-sm text-slate-600">
                                    Customers can log in to view balances,
                                    history, and download receipts.
                                </p>
                            </div>
                        </div>
                    </section>
                </AppLayout>
            </div>
        </div>
    );
}
