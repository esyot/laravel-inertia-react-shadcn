import { useRef } from "react";
import { router, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Mail, MapPin, Upload } from "lucide-react";

type ProfileHeaderProps = {
    user: {
        id: number;
        name: string;
        email: string;
        created_at: string;
        role?: string;
        address?: string;
        avatar_url?: string;
    };
};

export default function ProfileHeader({ user }: ProfileHeaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { post } = useForm();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append("avatar", file);

            router.post("/profile/avatar", formData, {
                forceFormData: true,
                onSuccess: () => console.log("Avatar updated!"),
            });
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <Card className="rounded-b-none">
            <CardContent className="p-6">
                <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                    <div className="relative">
                        <Avatar
                            className="h-24 w-24 cursor-pointer"
                            onClick={handleAvatarClick}
                        >
                            <AvatarImage
                                src={
                                    user.avatar_url
                                        ? `/storage/${user.avatar_url}`
                                        : "https://bundui-images.netlify.app/avatars/08.png"
                                }
                                alt={user.name}
                            />
                            <AvatarFallback className="text-2xl">
                                {user.name?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                        />

                        <Button
                            size="icon"
                            variant="outline"
                            className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full cursor-pointer"
                            onClick={handleUploadClick}
                        >
                            <Upload className="size-4" />
                        </Button>
                    </div>

                    <div className="flex-1 space-y-2">
                        <div className="flex flex-col gap-2 md:flex-row md:items-center">
                            <h1 className="text-2xl font-bold text-foreground">
                                {user.name}
                            </h1>
                            <Badge variant="secondary">
                                {user.role || "Member"}
                            </Badge>
                        </div>

                        <p className="text-muted-foreground">
                            {user.address || "No address provided"}
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Mail className="size-4" /> {user.email}
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin className="size-4" />{" "}
                                {user.address || "Unknown"}
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="size-4" /> Joined{" "}
                                {new Date(user.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    </div>

                    <Button>Edit Profile</Button>
                </div>
            </CardContent>
        </Card>
    );
}
