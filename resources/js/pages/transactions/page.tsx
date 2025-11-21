import Layout from "@/layouts/private-layout";
import { users } from "../users/data/users";
import SectionHeader from "@/components/section-header";
import SectionContent from "@/components/section-content";

import { TransactionTable } from "./components/transactionHistoryTable";
import Filter from "./components/filter-popover";
import type { Customer, Paginated } from "@/lib/interface/types";

type CustomersProps = {
    customers: Paginated<Customer>;
    filters?: any;
};

export default function Transaction({ customers, filters }: CustomersProps) {
    console.log("Customers data received:", customers);
    console.log(
        "First customer last_paid_bill:",
        customers.data[0]?.last_paid_bill,
    );
    console.log("Filters received in page:", filters); // Debug log

    return (
        <Layout>
            <SectionHeader className="flex items-center justify-between">
                <h1 className="text-lg font-semibold">Transactions</h1>

                <div className="flex gap-6 items-center">
                    <Filter filters={filters} />
                </div>
            </SectionHeader>
            <SectionContent header={true}>
                <TransactionTable customers={customers} />
            </SectionContent>
        </Layout>
    );
}
