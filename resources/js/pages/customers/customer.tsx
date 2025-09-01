import AppLayout from "@/layouts/public-layout";
import Layout from "@/layouts/private-layout";
import SectionContent from "@/components/section-content";
import CustomerContent from "./components/customer-content";

import { usePage } from "@inertiajs/react";

export default function Customer({ customer }: any) {
    const { props } = usePage();

    const user = props?.user;

    if (!customer) return <p className="text-center">Customer not found</p>;

    return (
        <main>
            {user ? (
                <main>
                    <Layout>
                        <SectionContent header={false}>
                            <CustomerContent customer={customer} user={user} />
                        </SectionContent>
                    </Layout>
                </main>
            ) : (
                <AppLayout>
                    <SectionContent header={false}>
                        <CustomerContent customer={customer} user={user} />
                    </SectionContent>
                </AppLayout>
            )}
        </main>
    );
}
