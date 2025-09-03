export type User = {
    id: number;
    name: string;
    email: string;
    social_id: string;
    role: string;
    created_at: string;
    updated_at: string;
};

export type Log = {
    id: number;
    user_id: number;
    name: string;
    device: string;
    timestamp: string;
};

export type Customer = {
    id: number;
    name: string;
    municipal: string;
    barangay: string;
    purok: string;
    code: string;
    status: "active" | "inactive" | "suspended";
    created_at: string;
    updated_at: string;
};

export type Meter = {
    id: number;
    customer: Customer;
    customer_id: number;
    month: string;
    year: number;
    meter_value: number;
    created_at: string;
    updated_at: string;
    timestamp: string;
};

export type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
};

export type UserInformation = {
    id: number;
    phone: string;
    address: string;
    created_at: string;
    updated_at: string;
};
