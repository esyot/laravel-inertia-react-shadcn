import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "@/lib/interface/types";

type ViewDialogProps = {
    user: User;
};
export default function ViewDialog({ user }: ViewDialogProps) {
    return (
        <>
            <Dialog>
                <DialogTrigger
                    className="px-3 py-2 text-sm font-medium text-blue-600 rounded-md 
             hover:bg-blue-100 hover:text-blue-700 
             focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 
             transition-colors duration-200"
                >
                    View
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>User Details</DialogTitle>
                        <DialogDescription>
                            Information about the user {user.name}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2">
                        <p>
                            <span className="font-semibold">Name:</span>{" "}
                            {user.name}
                        </p>
                        <p>
                            <span className="font-semibold">Email:</span>{" "}
                            {user.email}
                        </p>
                        <p>
                            <span className="font-semibold">Roles:</span>{" "}
                            {user.roles.length > 0
                                ? user.roles.join(", ")
                                : "No roles assigned"}
                        </p>
                        <p>
                            <span className="font-semibold">Social ID:</span>{" "}
                            {user.social_id}
                        </p>
                        <p>
                            <span className="font-semibold">Created:</span>{" "}
                            {user.created_at}
                        </p>
                        <p>
                            <span className="font-semibold">Updated:</span>{" "}
                            {user.updated_at}
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
