import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrdersService } from "src/app/services/orders.service";
import * as CartActions from "./cart.actions"
import { Order } from "src/app/models/order/order.model";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { CartItem } from "src/app/models/cart-item/cart-item.model";


@Injectable()
export class CartEffects {

    constructor(private router: Router, private localStorageService: LocalStorageService, 
        private orderService: OrdersService, private action$: Actions, private snackBar: MatSnackBar) {

    }

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

   /*  saveCartState$ = createEffect(() =>
        this.action$.pipe(
        ofType(
            CartActions.addToCart,
            CartActions.updateQuantity,
            CartActions.removeFromCart,
            CartActions.clearCart
        ),
        mergeMap(() => {
            const cartState = this.localStorageService.getCartState();
            return of(CartActions.saveCartState({ cartState }));
        }),
        catchError(({ error }) => {
            return of({ type: error.message });
        })
        )
    ); */
    
    createOrder$ = createEffect(() => 
        this.action$.pipe(
            ofType(CartActions.checkout),
            mergeMap(({cartItems}) => 
                this.orderService.placeOrder(cartItems).pipe(
                    map((order) => {
                        this.snackBar.open('Car successfully added!', 'Okay', {
                            duration: 3000,
                        });
                        this.router.navigate(['/home']);
                        return CartActions.checkoutSuccess({ order: <Order>order});
                    }),
                    catchError(({ error }) => {
                        this.snackBar.open('Error occured! Adding car failed!', 'Close', {
                            duration: 3000,
                        });
                        return of({ type: error.message });
                    })
                )
            )
        )
    );
}