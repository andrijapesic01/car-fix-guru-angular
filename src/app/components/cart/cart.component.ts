import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { CartItem } from 'src/app/models/cart-item/cart-item.model';
import { selectAllCartItems, selectCartItemsCount, selectCartTotalPrice } from 'src/app/state/cart/cart.selector';
import * as CartActions from 'src/app/state/cart/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  cartItems$!: Observable<CartItem[]>;
  numOfItems$!: Observable<number>;
  grandTotal$!: Observable<number>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.cartItems$ = this.store.select(selectAllCartItems);
    this.numOfItems$ = this.store.select(selectCartItemsCount);
    //this.grandTotal$ = this.store.select(selectCartTotalPrice);
  }

  removeItem(item: CartItem): void {
    this.store.dispatch(CartActions.removeFromCart({cartItemId: item.id}));
  }

  clearCart(): void {
    this.store.dispatch(CartActions.clearCart());
  }

  //Update needed->ngrx
  updateQuantity(item: CartItem, newQuantity: number): void {
    item.orderQuantity = newQuantity;
    this.store.dispatch(CartActions.updateQuantity({cartItem: item}));
  }

  /* decrementQuantity(item: CartItem): void {
    if (item.orderQuantity > 1) {
      item.orderQuantity--;
      item.part.quantity++;
    }
  }

  incrementQuantity(item: CartItem): void {
    if(item.part.quantity > 1) {
      item.orderQuantity++;
      item.part.quantity--;
    }
  } */
}

