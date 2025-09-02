import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon, XCircleIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";

export default function AlertNotification() {
    const { props }: any = usePage();
    const [showSuccess, setShowSuccess] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const flash = props?.flash ?? {};

    useEffect(() => {
        if (flash?.success) {
            setShowSuccess(true);
            const t = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(t);
        }
    }, [flash?.success]);

    useEffect(() => {
        if (flash?.delete) {
            setShowDelete(true);
            const t = setTimeout(() => setShowDelete(false), 3000);
            return () => clearTimeout(t);
        }
    }, [flash?.delete]);
    return (
        <>
            {showSuccess && (
                <Alert className="border-green-500/50 bg-green-50 text-green-700 shadow-lg">
                    <CheckCircle2Icon className="h-4 w-4" />
                    <div>
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{flash?.success}</AlertDescription>
                    </div>
                </Alert>
            )}

            {showDelete && (
                <Alert className="border-red-500/50 bg-red-50 text-red-700 shadow-lg">
                    <XCircleIcon className="h-4 w-4" />
                    <div>
                        <AlertTitle>Deleted</AlertTitle>
                        <AlertDescription>{flash?.delete}</AlertDescription>
                    </div>
                </Alert>
            )}
        </>
    );
}
