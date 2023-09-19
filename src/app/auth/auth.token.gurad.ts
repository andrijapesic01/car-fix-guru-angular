import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.state';
import { getToken } from './user-context';
import { logoutUser } from '../state/user/user.actions';

@Injectable({
    providedIn: 'root',
})
export class TokenAuthGuard {

    private jwtHelper: JwtHelperService;

    constructor( private router: Router, private store: Store<AppState> ) {
        this.jwtHelper = new JwtHelperService();
    }

    canActivate( route: ActivatedRouteSnapshot) :
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {

        const token: string | null = getToken();

        if (token) {
            if (this.jwtHelper.isTokenExpired(token)) {
                this.store.dispatch(logoutUser());
                return false;
            }
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }
}