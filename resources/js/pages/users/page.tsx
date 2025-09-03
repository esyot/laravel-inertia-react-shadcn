import { router, usePage } from "@inertiajs/react";

import Layout from "@/layouts/private-layout";
import { UserTable } from "./components/user-list";
import { UserLogsTable } from "./components/user-logs";

import SectionHeader from "@/components/section-header";
import SectionContent from "@/components/section-content";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { User, Log } from "@/lib/interface/types";
import Filter from "./components/filter-popover";
import { AddUserDialog } from "./components/user-dialog";
import AlertNotification from "./components/alert-notification";

type UsersProps = {
    users: User[];
    logs: Log[];
};

export default function Users({ users, logs }: UsersProps) {
    const handleView = (user: User) => {
        alert(`Viewing ${user.name}`);
    };

    const handleDelete = (user: User) => {
        if (confirm(`Are you sure you want to delete ${user.name}?`)) {
            router.delete(`/users/${user.id}`);
        }
    };

    return (
        <div>
            <main>
                <Layout>
                    <Tabs defaultValue="users" className="w-full">
                        <SectionHeader className="flex items-center justify-between">
                            <div className="fixed top-4 right-4 z-50 space-y-2 w-80">
                                <AlertNotification />
                            </div>
                            <TabsList>
                                <TabsTrigger value="users"> Users</TabsTrigger>
                                <TabsTrigger value="userLogs">
                                    User Logs
                                </TabsTrigger>
                            </TabsList>
                            <div className="flex gap-6 items-center">
                                <Filter />
                                <AddUserDialog />
                            </div>
                        </SectionHeader>
                        <SectionContent>
                            <TabsContent value="users">
                                <UserTable
                                    users={users}
                                    onView={handleView}
                                    onDelete={handleDelete}
                                />
                            </TabsContent>
                            <TabsContent value="userLogs">
                                <UserLogsTable logs={logs} />
                            </TabsContent>
                        </SectionContent>
                    </Tabs>
                </Layout>
            </main>
        </div>
    );
}
