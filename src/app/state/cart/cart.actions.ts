import { createAction, props } from "@ngrx/store";
import { CartItem } from "src/app/models/cart-item/cart-item.model";
import { Order } from "src/app/models/order/order.model";

//Zakomentarisan kod -> + localStorage za CartState

export const loadCartItems = createAction('loadCartItems');
export const loadCartItemsSuccess = createAction(
    'loadCartItemsSuccess',
    props<{ cartItems: CartItem[] }>()
);

export const addToCart = createAction(
    'addToCart',
    props<{ cartItem: CartItem }>()
);
/* export const addToCartSuccess = createAction(
    'addToCartSuccess',
    props<{ cartItem: CartItem }>()
); */

export const updateQuantity = createAction(
    'updateQuantity',
    props<{ cartItem: CartItem }>()
)
/* export const updateQuantitySuccess = createAction(
    'updateQuantitySuccess',
    props<{ cartItem: CartItem }>()
) */

export const removeFromCart = createAction(
    'removeFromCart',
    props<{ cartItemId: string }>()
);
/* export const removeFromCartSuccess = createAction(
    'removeFromCartSuccess',
    props<{ cartItemId: string }>()
); */

export const clearCart = createAction('clearCart');
//export const clearCartSuccess = createAction('clearCartSucces');

export const checkout = createAction(
    'checkout',
    props<{ cartItems: CartItem[] }>()
);
export const checkoutSuccess = createAction(
    'checkoutSuccess',
    props <{ order: Order }>()
);

