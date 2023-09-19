import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';
import * as CartActions from "./cart.actions"
import { LocalStorageService } from "src/app/services/local-storage.service";

@Injectable()
export class CartEffects {

    constructor(private router: Router, private localStorageService: LocalStorageService,
        private action$: Actions, private snackBar: MatSnackBar) {

    }

    loadCartState$ = createEffect(() =>
        this.action$.pipe(
            ofType(CartActions.loadCartItems),
            mergeMap(() => {
                const loadedCartItems = this.localStorageService.getCartItems();
                return of(CartActions.loadCartItemsSuccess({ cartItems: loadedCartItems }));
            }),
            catchError(({ error }) => {
                this.snackBar.open('Error occurred! Loading cart items from local storage failed!', 'Close', {
                    duration: 3000,
                });
                return of({ type: error.message });
            })
        )
    );

    /* loadCartItems$ = createEffect(() => 
        this.action$.pipe(
            ofType(CartActions.loadCartItems),
            mergeMap(() => {
                const cartState = this.localStorageService.getCartState();
                return of(CartActions.loadCartItemsSuccess({ cartState: cartState.cartItems }));
            }),
            catchError(({ error }) => {
                this.snackBar.open('Error occurred! Loading cart items from local storage failed!', 'Close', {
                    duration: 3000,
            });
                return of({ type: error.message });
            })
        )
    ); */

    /* saveCartState$ = createEffect(() =>
       this.action$.pipe(
       ofType(
           CartActions.addToCart,
           CartActions.updateQuantity,
           CartActions.removeFromCart,
           CartActions.clearCart
       ),
       mergeMap(() => {
           return of(CartActions.saveCart({ cartItems }));
       }),
       catchError(({ error }) => {
           return of({ type: error.message });
       })
       )
   ); */


}