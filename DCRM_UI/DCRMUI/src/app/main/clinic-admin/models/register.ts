import { Role } from './role';
export class Register {
    id: number=0;
    email: string="";
    password: string = "";
    role: Role.User
    name: string = "";
    IsTermsandConditions: boolean = false;
}