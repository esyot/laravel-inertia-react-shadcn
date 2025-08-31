import { MeterTable } from "./components/meterTable";
import Layout from "../layout";
import SectionContent from "../components/section-content";
import { router, usePage } from "@inertiajs/react";
import { AddMeterReadingDialog } from "./components/meterDialog";

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
                <SectionContent header={false}>
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-bold mb-4">
                            Meter Readings
                        </h1>
                        <AddMeterReadingDialog />
                    </div>
                    <MeterTable readings={readings} onDelete={handleDelete} />
                </SectionContent>
            </Layout>
        </main>
    );
}
