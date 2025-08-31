import Layout from "../layout";
import SectionContent from "../components/section-content";
import SectionHeader from "../components/section-header";
import Button from "@/components/composables/button";
import { CustomerTable } from "./components/customer-list";
import { ListFilter } from "lucide-react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Input from "@/components/composables/input";

export default function CustomersPage({ customers }: any) {
    return (
        <Layout>
            <SectionHeader className="flex justify-between items-center ">
                <h1 className="text-xl font-semibold">Customer List</h1>
                <div className="flex gap-6 items-center">
                    <Popover>
                        <PopoverTrigger className=" hover:bg-sand/50 p-2 cursor-pointer block rounded">
                            <ListFilter size={16} />
                        </PopoverTrigger>
                        <PopoverContent className="space-y-4">
                            <h1 className="font-semibold">Filter Actions</h1>

                            <Input label="Code" placeholder="Code" />
                            <Input label="Name" placeholder="Name" />
                            <Input label="Municipal" placeholder="Municipal" />
                            <Input label="Brgy" placeholder="Brgy" />

                            <div className="mt-2 grid grid-cols-2 gap-2">
                                <Button variant="outline" shape="rounded">
                                    Cancel
                                </Button>
                                <Button shape="rounded"> Submit</Button>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Button className="cursor-pointer">Add Customer</Button>
                </div>
            </SectionHeader>
            <SectionContent header={true}>
                <CustomerTable customers={customers} />
            </SectionContent>
        </Layout>
    );
}
