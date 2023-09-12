import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { CreateModUserDto } from "../models/user/create-mod-user.dto";
import { AppState } from "../app.state";
import { Store } from "@ngrx/store";
import { User } from "../models/user/user";

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    apiUrl = environment.api.apiUrl;

    constructor(private http: HttpClient, private store: Store<AppState>) {

    }

    login(email: string, password: string) {
        return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
    }

    register(userData: CreateModUserDto) {
        return this.http.post(`${this.apiUrl}/users/register`, userData);
    }

    setUser(user: User | null) {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {

        }
    }

    getUser(): User | null {
        const user = localStorage.getItem('user');
        if (user) {
            return JSON.parse(user);
        } else {
            return null;
        }
    }

    setToken(token: string | null): void {
        if (token === null) {
            localStorage.removeItem('token');
        } else {
            localStorage.setItem('token', JSON.stringify(token));
        }
    }

    getToken(): string | null {
        const token = localStorage.getItem('token');
        if (token) {
            return JSON.parse(token);
        }
        return null;
    }
}