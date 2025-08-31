import Layout from "../layout";
import { users } from "../users/data/users";
import SectionHeader from "../components/section-header";
import SectionContent from "../components/section-content";

import { TransactionTable } from "./components/transactionHistoryTable";

export default function Transaction() {
    return (
        <Layout>
            <SectionHeader className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Transactions</h1>
            </SectionHeader>
            <SectionContent header={false}>
                <TransactionTable users={users} />
            </SectionContent>
        </Layout>
    );
}
