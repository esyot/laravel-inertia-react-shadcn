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
                <DialogTrigger className="cursor-pointer font-semibold">
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
                            <span className="font-semibold">Role:</span>{" "}
                            {user.role}
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
