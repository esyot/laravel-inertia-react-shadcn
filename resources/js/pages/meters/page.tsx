import { router } from "@inertiajs/react";
import type { Meter, Paginated } from "@/lib/interface/types";

import { MeterTable } from "./components/meterTable";
import { AddMeterReadingDialog } from "./components/meterDialog";

import Layout from "../layout";
import SectionHeader from "@/components/section-header";
import Filter from "./components/filter-popever";
import SectionContent from "@/components/section-content";

type MeterProps = {
    readings: Paginated<Meter>;
};

export default function Index({ readings }: MeterProps) {
    const handleDelete = (reading: Meter) => {
        router.delete(`/meters/${reading.id}`);
    };

    return (
        <main>
            <Layout>
                <SectionHeader className="flex items-center justify-between">
                    <h1 className="text-lg font-semibold">Meter Readings</h1>
                    <div className="flex gap-6 items-center">
                        <Filter />
                        <AddMeterReadingDialog />
                    </div>
                </SectionHeader>
                <SectionContent header={false}>
                    <MeterTable readings={readings} onDelete={handleDelete} />
                </SectionContent>
            </Layout>
        </main>
    );
}
