import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, tap } from 'rxjs';
import { setToken, setUser } from 'src/app/auth/user-context';

import * as UserActions from './user.actions';
import { LoginUser } from 'src/app/models/user/login-user';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class UserEffects {

    constructor( private action$: Actions, private userService: UserService, private snackBar: MatSnackBar, 
        private router: Router) {

    }

    loginUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(UserActions.loginUser),
            mergeMap(({ email, password }) =>
                this.userService.login(email, password).pipe(
                    map((data: LoginUser) => {
                        setToken(data.accessToken);
                        setUser(data.user);
                        this.router.navigate(['/home'], { replaceUrl: true });
                        return UserActions.loginSuccess({ data });
                    }),
                    catchError(({ error }) => {
                        this.snackBar.open(
                            "Wrong credentials!", 'close',
                            { duration: 5000 }
                        );
                        setToken(null);
                        setUser(null);
                        return of(UserActions.loginFailure({ error: 'BadCredentials' }));
                    })
                )
            )
        )
    );

    logoutUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(UserActions.logoutUser),
            mergeMap(() => {
                setToken(null);
                setUser(null);
                this.router.navigate(['login'], { replaceUrl: true });
                return of({ type: 'logged out' });
            })
        )
    );

    registerUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(UserActions.registerUser),
            mergeMap(({ userData }) =>
                this.userService.register(userData).pipe(
                    map(() => {
                        this.snackBar.open('Registration succesfull.', 'Okay');
                        this.router.navigate(['login'], { replaceUrl: true });
                        return UserActions.registerSuccess();
                    }),
                    catchError(({ error }) => {
                        this.snackBar.open('Registration Error occured!', 'Close', {
                            duration: 3000,
                        });
                        return of({ type: error.message });
                    })
                )
            )
        )
    );
}