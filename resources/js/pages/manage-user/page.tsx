import { users } from "../manage-user/data/users";
import { UserTable } from "./components/list";

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
        <div className="p-6 mx-32 mt-16">
            <UserTable
                users={users}
                onView={handleView}
                onDelete={handleDelete}
                onAdd={handleAdd}
            />
        </div>
    );
}
