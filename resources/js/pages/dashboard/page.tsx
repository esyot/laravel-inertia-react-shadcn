import React from "react";
import { usePage } from "@inertiajs/react";
import AdminDashboard from "./admin-dashboard";
import CustomerDashboard from "./customer-dashboard";

export default function Page() {
    const { props }: any = usePage();
    const user = props?.auth?.user; // depends how you pass auth data from Laravel

    if (user?.roles?.includes("admin")) {
        return <AdminDashboard analytics={props.analytics} />;
    }

    return <CustomerDashboard />;
}
