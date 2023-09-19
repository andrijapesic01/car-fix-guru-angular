import { State, createAction, props } from "@ngrx/store";
import { CartItem } from "src/app/models/cart-item/cart-item.model";

export const loadCartItems = createAction('loadCartItems');
export const loadCartItemsSuccess = createAction(
    'loadCartItemsSuccess',
    props<{ cartItems: CartItem[] }>()
);

export const saveCartItems = createAction(
    'saveCartItems',
    props<{ cartItems: CartItem[] }>()
);
export const saveCartItemsSuccess = createAction(
    'saveCartItemsSucces'
);

export const addToCart = createAction(
    'addToCart',
    props<{ cartItem: CartItem }>()
);

export const updateQuantity = createAction(
    'updateQuantity',
    props<{ cartItem: CartItem }>()
)

export const removeFromCart = createAction(
    'removeFromCart',
    props<{ cartItemId: string }>()
);

export const clearCart = createAction('clearCart');

export const checkout = createAction(
    'checkout',
    props<{ cartItems: CartItem[] }>()
);
