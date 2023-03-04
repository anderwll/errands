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
    date: string;
}

export type CreateNewUserRequest = Omit<User, 'id' | 'darkMode' | 'errands'>;

export type UpdateUserRequest = Omit<User, 'email' | 'errands'>;

export interface InitialStateUserLogged {
    loading: boolean;
    success: boolean;
    message: string;
    data: User | null;
}

export interface CreateNewErrandRequest {
    idUser: string;
    dataCreateNewErrand: Omit<Errand, 'id' | 'filed' | 'check' | 'date'>;
}

export interface UpdateErrandRequest {
    idUser: string;
    idErrand: string;
    dataUpdateErrand: Partial<Omit<Errand, 'id' | 'date'>>;
}

export type DeleteErrandRequest = Omit<UpdateErrandRequest, 'dataUpdateErrand'>;

export type GetByIdErrandRequest = Omit<UpdateErrandRequest, 'dataUpdateErrand'>;
