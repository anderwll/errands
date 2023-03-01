export interface ResponseAPI {
    success: boolean;
    message: string;
    data: any;
}

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    darkMode: boolean;
    errands: Array<Errand>;
}

export interface Errand {
    id: string;
    title: string;
    description: string;
    filed: boolean;
    check: boolean;
    date: Date;
}

export type CreateNewUserRequest = Omit<User, 'id' | 'darkMode' | 'errands'>;

export type UpdateUserRequest = Omit<User, 'email' | 'errands'>;
