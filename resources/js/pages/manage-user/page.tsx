import { users } from "./data/users";
import { UserTable } from "./components/list";
import Layout from "../layout";
import { AddUserDialog } from "./components/user-dialog";

export default function HomePage() {
    const handleView = (user: any) => {
        alert(`Viewing ${user.name}`);
    };

    const handleDelete = (user: any) => {
        alert(`Deleted ${user.name}`);
    };

    const handleAdd = () => {
        alert("Add User clicked!");
    };

    return (
        <div>
            <main>
                <Layout>
                    {/* Add User button */}
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">User List</h2>
                        <AddUserDialog onAdd={handleAdd} />
                    </div>
                    <section>
                        <UserTable
                            users={users}
                            onView={handleView}
                            onDelete={handleDelete}
                        />
                    </section>
                </Layout>
            </main>
        </div>
    );
}
