import { MeterTable } from "./components/meterTable";
import Layout from "../layout";
import SectionContent from "../components/section-content";
import { router, usePage } from "@inertiajs/react";
import { AddMeterReadingDialog } from "./components/meterDialog";
import SectionHeader from "../components/section-header";

export default function Index({ readings }: any) {
    const { props }: any = usePage();
    const handleDelete = (readings: any) => {
        if (confirm(`Are you sure you want to delete ${readings.name}?`)) {
            router.delete(`/meters/${readings.id}`);
        }
    };
    return (
        <main>
            <Layout>
                <SectionHeader className="flex justify-between">
                    <h1 className="text-xl font-semibold">Meter Readings</h1>
                    <AddMeterReadingDialog />
                </SectionHeader>
                <SectionContent header={false}>
                    <MeterTable readings={readings} onDelete={handleDelete} />
                </SectionContent>
            </Layout>
        </main>
    );
}
