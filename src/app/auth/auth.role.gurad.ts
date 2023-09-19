import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.state';
import { User } from '../models/user/user';
import { Roles } from '../enums/enums';
import { selectUser } from '../state/user/user.selector';

@Injectable({
    providedIn: 'root',
})
export class RoleAuthGuard {

    constructor( private router: Router, private store: Store<AppState> ) { }

    getUserFromStore(): User | null {
        let user: User | null = null;

        this.store.select(selectUser).subscribe((selectedUser) =>
            user = selectedUser
        )
        return user;
    }

    canActivate( route: ActivatedRouteSnapshot) :
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {

        const user: User | null = this.getUserFromStore();

        const authorizedRole = route.data['role'];

        if(!user) {
            this.router.navigate(['login']);
            return false;
        }

        if (authorizedRole !== user.role && user.role != Roles.Admin) {
            this.router.navigate(['login']);
            return false;
        }
        
        return true;
    }
}