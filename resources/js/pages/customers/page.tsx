import Layout from "../layout";
import SectionContent from "../components/section-content";
import SectionHeader from "../components/section-header";
import { Button } from "@/components/ui/button";
import { CustomerTable } from "./components/customer-list";

export default function CustomersPage({ customers }: any) {
    return (
        <Layout>
            <SectionHeader className="flex justify-between items-center ">
                <h1 className="text-xl font-semibold">Customer List</h1>
                <Button className="cursor-pointer">Add Customer</Button>
            </SectionHeader>
            <SectionContent header={false}>
                <CustomerTable customers={customers} />
            </SectionContent>
        </Layout>
    );
}
