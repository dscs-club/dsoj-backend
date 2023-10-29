export interface Iuser {
    id: string;
    name: string;
    passwordHash: string;
    email?: string;
    identity: number;
    school?: string;
    banned: boolean;
}

export interface ISessionData {
    id: string;
    name: string;
    identity: number;
}

export interface ILoginForm {
    name: string;
    password: string;
}

export interface ISignupForm extends Iuser {
    name: string;
    password: string;
    email?: string;
    school?: string;
}

export interface ILoginRes {
    access: boolean;
    status: string;
    details?: string;
}