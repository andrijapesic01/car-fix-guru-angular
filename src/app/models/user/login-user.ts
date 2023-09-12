import { User } from "./user";

export interface LoginUser {
    user: User;
    accessToken: string;
}