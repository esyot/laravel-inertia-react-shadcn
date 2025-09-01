export type User = {
    id: number;
    name: string;
    email: string;
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

export type UserInformation = {
    id: number;
    phone: string;
    address: string;
    created_at: string;
    updated_at: string;
};
