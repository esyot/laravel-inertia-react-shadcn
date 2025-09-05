import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type DeleteAlertDialogProps = {
    itemName?: string;
    onConfirm: () => void;
};

export function DeleteAlertDialog({
    itemName,
    onConfirm,
}: DeleteAlertDialogProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="flex gap-2 cursor-pointer select-none hover:bg-gray-200 p-1">
                    <Trash2 className="text-red-600" />
                    <div className="font-semibold">Delete</div>
                </div>
                {/* <Button variant="destructive" size="sm">
                    Delete
                </Button> */}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. It will permanently remove{" "}
                        <b>{itemName}</b>.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>
                        Yes, Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
