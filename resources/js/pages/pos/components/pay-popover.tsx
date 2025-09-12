import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Input from "@/components/composables/input";
import Button from "@/components/composables/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function PayPopover({ billId }: { billId: number }) {
    const [form, setForm] = useState({
        payment_method: "",
        amount: "",
        reference_no: "",
    });

    const handleChange = (key: string, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        router.post(`/pos/store/${billId}`, {
            payment_method: form.payment_method,
            amount: parseFloat(form.amount),
            reference_no: form.reference_no,
        });
        console.log("Submitted:", form);
    };

    const handleCancel = () => {
        setForm({ payment_method: "", amount: "", reference_no: "" });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button shape="rounded">Pay</Button>
            </PopoverTrigger>

            <PopoverContent className="space-y-4 w-64">
                <h1 className="font-semibold">Payment Details</h1>

                <div className="space-y-1">
                    <label className="text-sm font-medium">
                        Payment Method
                    </label>
                    <Select
                        value={form.payment_method}
                        onValueChange={(val) =>
                            handleChange("payment_method", val)
                        }
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Methods</SelectLabel>
                                <SelectItem value="gcash">Gcash</SelectItem>
                                <SelectItem value="paypal">Paypal</SelectItem>
                                <SelectItem value="cash">Cash</SelectItem>
                                <SelectItem value="card">Card</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <Input
                    label="Amount"
                    placeholder="Enter amount"
                    value={form.amount}
                    onChange={(e) => handleChange("amount", e.target.value)}
                />
                <Input
                    label="Reference Number"
                    placeholder="Enter reference"
                    value={form.reference_no}
                    onChange={(e) =>
                        handleChange("reference_no", e.target.value)
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
    );
}
