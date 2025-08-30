import { UserTable } from "./components/list";
import Layout from "../layout";
import { AddUserDialog } from "./components/user-dialog";
import SectionContent from "../components/section-content";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, X } from "lucide-react";
import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";

type User = {
    name: string;
    email: string;
    address: string;
};

type PageProps = {
    users: User[];
    flash: {
        success?: string;
        error?: string;
    };
};

export default function HomePage() {
    const { props } = usePage<PageProps>();
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (props.flash?.success || props.flash?.error) {
            setShowAlert(true);
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [props.flash]);

    const handleView = (user: any) => {
        alert(`Viewing ${user.name}`);
    };

    const handleDelete = (user: any) => {
        alert(`Deleted ${user.name}`);
    };

    return (
        <div>
            <main>
                <Layout>
                    <SectionContent header={false}>
                        {/* Success/Error Messages */}
                        {showAlert && props.flash?.success && (
                            <Alert className="border-green-200 bg-green-200 mb-6">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <AlertDescription className="text-green-800">
                                    {props.flash.success}
                                </AlertDescription>
                                <button
                                    className="absolute right-2 top-2 text-green-600 hover:text-green-800"
                                    onClick={() => setShowAlert(false)}
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </Alert>
                        )}

                        {showAlert && props.flash?.error && (
                            <Alert variant="destructive" className="mb-6">
                                <AlertDescription>
                                    {props.flash.error}
                                </AlertDescription>
                                <button
                                    className="absolute right-2 top-2 text-red-600 hover:text-red-800"
                                    onClick={() => setShowAlert(false)}
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </Alert>
                        )}

                        {/* Header with Add User button */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold">User List</h2>
                            <AddUserDialog />
                        </div>

                        {/* User Table Section */}
                        <section>
                            <UserTable
                                users={props.users}
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
