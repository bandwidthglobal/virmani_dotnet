import { Role } from './role';

export class User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    avatar: string;
    role: Role;
    token?: string;
    name: string;
    thumb: string;
    jwtToken: string;
}
export class AuthenticateRequest {
    email: string;
    password: string;
}

export class Register {
    id: number;
    email: string;
    password: string;
    role: Role.User;
    token?: string;
    name: string;
    IsTermsandConditions: boolean = false;
}