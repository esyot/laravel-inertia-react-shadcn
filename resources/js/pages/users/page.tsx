import { users } from "./data/users";
import { UserTable } from "./components/list";
import Layout from "../layout";
import { AddUserDialog } from "./components/user-dialog";
import SectionContent from "../components/section-content";
import { router, usePage } from "@inertiajs/react";

export default function HomePage({ users }: any) {
    const { props }: any = usePage();
    const { flash } = props as any;

    const handleView = (user: any) => {
        alert(`Viewing ${user.name}`);
    };

    const handleDelete = (user: any) => {
        if (confirm(`Are you sure you want to delete ${user.name}?`)) {
            router.delete(`/users/${user.id}`);
        }
    };
    return (
        <div>
            <main>
                <Layout>
                    <SectionContent header={false}>
                        {flash.success && (
                            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                                {flash.success}
                            </div>
                        )}
                        {flash.delete && (
                            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                                {flash.delete}
                            </div>
                        )}
                        {/* Add User button */}
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">User List</h2>
                            <AddUserDialog />
                        </div>
                        <section>
                            <UserTable
                                users={users}
                                onView={handleView}
                                onDelete={handleDelete}
                            />
                        </section>
                    </SectionContent>
                </Layout>
            </main>
        </div>
    );
}
