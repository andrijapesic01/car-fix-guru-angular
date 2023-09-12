import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginUser } from "../models/user/login-user";
import { environment } from "src/environments/environment";
import { CreateModUserDto } from "../models/user/create-mod-user.dto";
import { User } from "../models/user/user";

@Injectable({
    providedIn: 'root',
})

export class UserService {
    apiUrl = environment.api.apiUrl;
    constructor(private httpClient: HttpClient) { }

    login(email: string, password: string) {
        return this.httpClient.post<LoginUser>(`${this.apiUrl}/auth/login`, {
            email,
            password,
        });
    }

    register(userData: CreateModUserDto) {
        return this.httpClient.post<User>(`${environment.api}/users/register`, {
            ...userData,
        });
    }

}