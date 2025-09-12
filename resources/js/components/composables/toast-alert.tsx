import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import type { FlashMessages } from "@/lib/interface/types";

export default function ToastAlert() {
    const { flash } = usePage<{ flash?: FlashMessages }>().props;

    useEffect(() => {
        const commonOptions = {
            duration: 4000,
            style: {
                borderRadius: "12px",
                padding: "16px 20px",
                fontSize: "16px",
                color: "#fff",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            },
        };

        if (flash?.success)
            toast.success(`🎉 ${flash.success}`, {
                ...commonOptions,
                icon: "✅",
                style: {
                    ...commonOptions.style,
                    background: "linear-gradient(135deg, #43e97b, #38f9d7)",
                },
            });

        if (flash?.error)
            toast.error(`⚠️ ${flash.error}`, {
                ...commonOptions,
                icon: "❌",
                style: {
                    ...commonOptions.style,
                    background: "linear-gradient(135deg, #f85032, #e73827)",
                },
            });

        if (flash?.delete)
            toast.error(` ${flash.delete}`, {
                ...commonOptions,
                icon: "🗑️",
                style: {
                    ...commonOptions.style,
                    background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
                },
            });
    }, [flash]);

    return null;
}
