import Layout from "@/layouts/private-layout";
import { users } from "../users/data/users";
import SectionHeader from "@/components/section-header";
import SectionContent from "@/components/section-content";

import { TransactionTable } from "./components/transactionHistoryTable";
import Filter from "./components/filter-popover";
import type { Customer, Paginated } from "@/lib/interface/types";

type CustomersProps = {
    customers: Paginated<Customer>;
};

export default function Transaction({ customers }: CustomersProps) {
    return (
        <Layout>
            <SectionHeader className="flex items-center justify-between">
                <h1 className="text-lg font-semibold">Transactions</h1>

                <div className="flex gap-6 items-center">
                    <Filter />
                </div>
            </SectionHeader>
            <SectionContent header={false}>
                <TransactionTable customers={customers} />
            </SectionContent>
        </Layout>
    );
}
