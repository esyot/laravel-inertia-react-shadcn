import Layout from "@/layouts/private-layout";
import SectionContent from "@/components/section-content";
import SectionHeader from "@/components/section-header";
import Button from "@/components/composables/button";
import { CustomerTable } from "./components/customer-list";
import { ListFilter, CheckCircle2Icon, XCircleIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { AddCustomerDialog } from "./components/customer-dialog";
import { usePage } from "@inertiajs/react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Input from "@/components/composables/input";

export default function CustomersPage({ customers, filters }: any) {
    const [form, setForm] = useState({
        code: filters?.code || "",
        name: filters?.name || "",
        municipal: filters?.municipal || "",
        barangay: filters?.barangay || "",
    });

    const { props }: any = usePage();
    const flash = props?.flash ?? {};

    const handleChange = (key: string, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        router.get(
            "/customers",
            { ...form },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handleCancel = () => {
        setForm({
            code: "",
            name: "",
            municipal: "",
            barangay: "",
        });

        router.get(
            "/customers",
            {},
            { preserveState: false, preserveScroll: true },
        );
    };

    const [showSuccess, setShowSuccess] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {
        if (flash?.success) {
            setShowSuccess(true);
            const t = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(t);
        }
    }, [flash?.success]);

    useEffect(() => {
        if (flash?.delete) {
            setShowDelete(true);
            const t = setTimeout(() => setShowDelete(false), 3000);
            return () => clearTimeout(t);
        }
    }, [flash?.delete]);

    return (
        <Layout>
            <SectionHeader className="flex justify-between items-center ">
                <div className="fixed top-4 right-4 z-50 space-y-2 w-80">
                    {showSuccess && (
                        <Alert className="border-green-500/50 bg-green-50 text-green-700 shadow-lg">
                            <CheckCircle2Icon className="h-4 w-4" />
                            <div>
                                <AlertTitle>Success</AlertTitle>
                                <AlertDescription>
                                    {flash?.success}
                                </AlertDescription>
                            </div>
                        </Alert>
                    )}

                    {showDelete && (
                        <Alert className="border-red-500/50 bg-red-50 text-red-700 shadow-lg">
                            <XCircleIcon className="h-4 w-4" />
                            <div>
                                <AlertTitle>Deleted</AlertTitle>
                                <AlertDescription>
                                    {flash?.delete}
                                </AlertDescription>
                            </div>
                        </Alert>
                    )}
                </div>
                <h1 className="text-lg font-semibold">Customers</h1>
                <div className="flex gap-6 items-center">
                    <Popover>
                        <PopoverTrigger className=" hover:bg-sand/50 p-2 cursor-pointer block rounded">
                            <ListFilter size={16} />
                        </PopoverTrigger>
                        <PopoverContent className="space-y-4">
                            <h1 className="font-semibold">Filter Actions</h1>

                            <Input
                                label="Code"
                                placeholder="Code"
                                value={form.code}
                                onChange={(e) =>
                                    handleChange("code", e.target.value)
                                }
                            />
                            <Input
                                label="Name"
                                placeholder="Name"
                                value={form.name}
                                onChange={(e) =>
                                    handleChange("name", e.target.value)
                                }
                            />
                            <Input
                                label="Municipal"
                                placeholder="Municipal"
                                value={form.municipal}
                                onChange={(e) =>
                                    handleChange("municipal", e.target.value)
                                }
                            />
                            <Input
                                label="Barangay"
                                placeholder="Barangay"
                                value={form.barangay}
                                onChange={(e) =>
                                    handleChange("barangay", e.target.value)
                                }
                            />

                            <div className="mt-2 grid grid-cols-2 gap-2">
                                <Button
                                    variant="outline"
                                    shape="rounded"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>
                                <Button shape="rounded" onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <AddCustomerDialog />
                </div>
            </SectionHeader>
            <SectionContent header={true}>
                <CustomerTable customers={customers} />
            </SectionContent>
        </Layout>
    );
}
