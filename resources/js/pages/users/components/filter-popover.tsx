import Button from "@/components/composables/button";
import Input from "@/components/composables/input";
import { ListFilter } from "lucide-react";
import { useState } from "react";
import { router } from "@inertiajs/react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

type FilterProps = {
    filters: {
        code?: string;
        name?: string;
        email?: string;
        device?: string;
        social_id?: string;
    };
};

export default function Filter({ filters }: any) {
    const [form, setForm] = useState({
        code: filters?.code || "",
        name: filters?.name || "",
        email: filters?.email || "",
        device: filters?.device || "",
        social_id: filters?.social_id || "",
    });

    const handleChange = (key: string, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        router.get(
            "/users",
            { ...form },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handleCancel = () => {
        setForm({
            code: "",
            name: "",
            email: "",
            device: "",
            social_id: "",
        });

        router.get(
            "/users",
            {},
            { preserveState: false, preserveScroll: true },
        );
    };

    return (
        <>
            <div className="flex items-center gap-4">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost">
                            <ListFilter size={16} />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="space-y-4 w-72">
                        <h1 className="font-semibold text-sm">
                            Filter Actions
                        </h1>
                        <Input
                            label="Name"
                            placeholder="Name"
                            value={form.name}
                            onChange={(e) =>
                                handleChange("name", e.target.value)
                            }
                        />
                        <Input
                            label="Email"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) =>
                                handleChange("email", e.target.value)
                            }
                        />
                        <Input
                            label="Social ID"
                            placeholder="Social ID"
                            value={form.social_id}
                            onChange={(e) =>
                                handleChange("social_id", e.target.value)
                            }
                        />
                        <Input
                            label="Device"
                            placeholder="Device"
                            value={form.device}
                            onChange={(e) =>
                                handleChange("device", e.target.value)
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
            </div>
        </>
    );
}
