import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Engine } from '../models/engine/engine.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartState } from '../state/cart/cart.reducer';
import { CartItem } from '../models/cart-item/cart-item.model';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
    private readonly CART_KEY = environment.localStorage.cartKey;

    constructor() {}

    /* getCartItems(): CartItem[] {
        const storedCart = localStorage.getItem(this.CART_KEY);
        const cartState = storedCart ? JSON.parse(storedCart) : { cartItems: [] };
        return cartState.cartItems;
    }
    
    saveCartItems(cartItems: CartItem[]): void {
        const cartState = { cartItems };
        localStorage.setItem(this.CART_KEY, JSON.stringify(cartState));
    } */

    getCartState(): CartState {
        const storedCart = localStorage.getItem(this.CART_KEY);
        return storedCart ? JSON.parse(storedCart) : { cartItems: [] };
    }

    saveCartState(cartState: CartState): void {
        localStorage.setItem(this.CART_KEY, JSON.stringify(cartState));
    }
}