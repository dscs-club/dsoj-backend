export interface Iuser {
    id: string;
    name: string;
    passwordHash?: string;
    password?: string;
}

export interface ILoginRes{
    access: boolean;
    status: string;
    reason: string;
}