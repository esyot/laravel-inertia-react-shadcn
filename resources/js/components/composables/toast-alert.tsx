import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import toast from "react-hot-toast";
import type { FlashMessages } from "@/lib/interface/types";

export default function ToastAlert() {
    const { flash } = usePage<{ flash?: FlashMessages }>().props;

    useEffect(() => {
        const commonOptions = {
            duration: 4000,
            style: {
                borderRadius: "8px",
                padding: "14px 18px",
                fontSize: "15px",
                color: "#333",
                background: "#fff",
                border: "1px solid #e5e7eb",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            },
        };

        if (flash?.success) toast.success(flash.success, commonOptions);

        if (flash?.error) toast.error(flash.error, commonOptions);

        if (flash?.delete) toast.error(flash.delete, commonOptions);
    }, [flash]);

    return null;
}
