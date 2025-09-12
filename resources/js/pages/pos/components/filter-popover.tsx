import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Input from "@/components/composables/input";
import { router } from "@inertiajs/react";
import { ListFilter } from "lucide-react";
import Button from "@/components/composables/button";
import { useState } from "react";

export default function Filter({ filters }: any) {
    const [form, setForm] = useState({
        code: filters?.code || "",
        name: filters?.name || "",
        municipal: filters?.municipal || "",
        barangay: filters?.barangay || "",
    });

    const handleSubmit = () => {
        router.get(
            "/pos",
            { ...form },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handleCancel = () => {
        setForm({
            code: "",
            name: "",
            municipal: "",
            barangay: "",
        });

        router.get("/pos", {}, { preserveState: false, preserveScroll: true });
    };

    const handleChange = (key: string, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <>
            <Popover>
                <PopoverTrigger className=" hover:bg-sand/50 p-2 cursor-pointer block rounded">
                    <ListFilter size={16} />
                </PopoverTrigger>
                <PopoverContent className="space-y-4">
                    <h1 className="font-semibold">Filter Actions</h1>

                    <Input
                        label="Code"
                        placeholder="Code"
                        value={form.code}
                        onChange={(e) => handleChange("code", e.target.value)}
                    />
                    <Input
                        label="Name"
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />
                    <Input
                        label="Municipal"
                        placeholder="Municipal"
                        value={form.municipal}
                        onChange={(e) =>
                            handleChange("municipal", e.target.value)
                        }
                    />
                    <Input
                        label="Barangay"
                        placeholder="Barangay"
                        value={form.barangay}
                        onChange={(e) =>
                            handleChange("barangay", e.target.value)
                        }
                    />

                    <div className="mt-2 grid grid-cols-2 gap-2">
                        <Button
                            variant="outline"
                            shape="rounded"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button shape="rounded" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </>
    );
}
