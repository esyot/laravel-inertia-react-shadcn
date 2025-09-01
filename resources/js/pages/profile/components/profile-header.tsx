import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Calendar, Mail, MapPin } from "lucide-react";

type ProfileHeaderProps = {
    user: {
        name: string;
        email: string;
        created_at: string;
        role?: string;
        address?: string;
        avatar_url?: string;
    };
};

export default function ProfileHeader({ user }: ProfileHeaderProps) {
    return (
        <Card
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
        "
        >
            <CardContent className="p-6">
                <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                    <div className="relative">
                        <Avatar className="h-24 w-24">
                            <AvatarImage
                                src={
                                    user.avatar_url ||
                                    "https://bundui-images.netlify.app/avatars/08.png"
                                }
                                alt={user.name}
                            />
                            <AvatarFallback className="text-2xl">
                                {user.name?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <Button
                            size="icon"
                            variant="outline"
                            className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full"
                        >
                            <Camera />
                        </Button>
                    </div>
                    <div className="flex-1 space-y-2">
                        <div className="flex flex-col gap-2 md:flex-row md:items-center">
                            <h1 className="text-2xl font-bold">{user.name}</h1>
                            <Badge variant="secondary">
                                {user.role || "Member"}
                            </Badge>
                        </div>
                        <p className="text-black">
                            {user.address || "No address provided"}
                        </p>
                        <div className="text-black flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-1">
                                <Mail className="size-4" />
                                {user.email}
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin className="size-4" />
                                {user.address || "Unknown"}
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="size-4" />
                                Joined{" "}
                                {new Date(user.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                    <Button variant="default">Edit Profile</Button>
                </div>
            </CardContent>
        </Card>
    );
}
