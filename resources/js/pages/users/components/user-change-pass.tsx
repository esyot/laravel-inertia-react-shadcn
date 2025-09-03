import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/interface/types";

type UserChangePassProps = {
    user: User;
};

export default function UserChangePass({ user }: UserChangePassProps) {
    return (
        <Dialog>
            <DialogTrigger className="cursor-pointer">
                Change Password
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Change the password of:{" "}
                        <span className="font-semibold">{user.name}</span>
                    </DialogTitle>
                    <DialogDescription>
                        Enter the old password and a new one below.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    <div>
                        <Label className="mb-2" htmlFor="old_password">
                            Old Password
                        </Label>
                        <Input type="password" />
                    </div>

                    <div>
                        <Label className="mb-2" htmlFor="new_password">
                            New Password
                        </Label>
                        <Input type="password" />
                    </div>

                    <Button>Save</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
