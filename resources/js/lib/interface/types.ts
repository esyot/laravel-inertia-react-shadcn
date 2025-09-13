import { ReactNode } from "react";

export interface User {
    id: number;
    name: string;
    email: string;
    social_id: string;
    created_at: string;
    updated_at: string;
    is_password_changed: boolean;
}

export interface Log {
    id: number;
    user_id: number;
    name: string;
    device: string;
    timestamp: string;
}

export interface Customer {
    id: number;
    name: string;
    municipal: string;
    barangay: string;
    purok: string;
    code: string;
    status: "active" | "inactive" | "suspended";
    created_at: string;
    updated_at: string;
}

export interface Meter {
    consumption: ReactNode;
    id: number;
    customer: Customer;
    customer_id: number;
    month: string;
    year: number;
    curr_meter_value: number;
    prev_meter_value: number;
    created_at: string;
    updated_at: string;
    timestamp: string;
}

export interface Paginated<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface UserInformation {
    id: number;
    phone: string;
    address: string;
    created_at: string;
    updated_at: string;
}

export interface FlashMessages {
    success: string;
    error: Object;
    delete: string;
}
