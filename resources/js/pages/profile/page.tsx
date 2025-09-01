import Layout from "@/layouts/private-layout";
import SectionHeader from "@/components/section-header";
import SectionContent from "@/components/section-content";
import ProfileHeader from "./components/profile-header";
import ProfileContent from "./components/profile-content";
import { usePage } from "@inertiajs/react";

export default function ProfileAccount({ user }: any) {
    return (
        <main>
            <Layout>
                <SectionContent header={false}>
                    <ProfileHeader user={user} />
                    <ProfileContent user={user} />
                </SectionContent>
            </Layout>
        </main>
    );
}
