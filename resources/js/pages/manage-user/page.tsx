import { users } from "../manage-user/data/users";
import { UserTable } from "./components/list";
import Layout from "../layout";

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
                    <section>
                        <UserTable
                            users={users}
                            onView={handleView}
                            onDelete={handleDelete}
                            onAdd={handleAdd}
                        />
                    </section>
                </Layout>
            </main>
        </div>
    );
}
