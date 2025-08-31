import Layout from "../layout";
import SectionContent from "../components/section-content";
import { router } from "@inertiajs/react";
import { CustomerTable } from "./components/customer-list";

export default function CustomersPage({ customers }: any) {
    return (
        <Layout>
            <SectionContent header={false}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Customer List</h2>
                </div>

                <CustomerTable customers={customers} />
            </SectionContent>
        </Layout>
    );
}
