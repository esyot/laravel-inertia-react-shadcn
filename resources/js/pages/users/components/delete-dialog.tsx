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
import { User } from "@/lib/interface/types";

type DeteleDialogProps = {
    user: User;
    onDelete?: (user: User) => void;
};
export default function DeleteDialog({ user, onDelete }: DeteleDialogProps) {
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <button
                        className="px-3 py-2 text-sm font-medium text-red-600 rounded-md 
                    hover:bg-red-100 hover:text-red-700 
                    focus:outline-none focus:ring-2 focus:ring-red-200 
                    transition-colors duration-200"
                    >
                        Delete
                    </button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure you want to delete {user.name}?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete {user.name} from the system.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => onDelete?.(user)}
                            className="bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                        >
                            Confirm Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
