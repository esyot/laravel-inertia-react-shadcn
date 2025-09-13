import Layout from "@/layouts/private-layout";
import SectionContent from "@/components/section-content";
import SectionHeader from "@/components/section-header";
import Filter from "./components/filter-popover";
import type { Customer, Paginated } from "@/lib/interface/types";
import { CustomerTable } from "./components/customer-list";
import AlertNotification from "./components/alert-notification";

type CustomerProps = {
    customers: Paginated<Customer>;
};

export default function CustomersPage({ customers }: CustomerProps) {
    if (!customers) return <p className="text-center">Customer not found</p>;

    return (
        <Layout>
            <SectionHeader className="flex justify-between items-center ">
                <div className="fixed top-4 right-4 z-50 space-y-2 w-80">
                    <AlertNotification />
                </div>
                <h1 className="text-lg font-semibold">POS</h1>
                <div className="flex gap-6 items-center">
                    <Filter />
                </div>
            </SectionHeader>
            <SectionContent>
                <CustomerTable customers={customers} />
            </SectionContent>
        </Layout>
    );
}
