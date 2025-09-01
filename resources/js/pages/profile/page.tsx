import Layout from "@/pages/layout";
import SectionHeader from "@/pages/components/section-header";
import SectionContent from "@/pages/components/section-content";
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
