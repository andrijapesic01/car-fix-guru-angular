import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CartItem } from "src/app/models/cart-item/cart-item.model";
import * as CartActions from "./cart.actions"

export interface CartState extends EntityState<CartItem>{
    //cartItems: CartItem[];
    loading: boolean;
}

const adapter: EntityAdapter<CartItem> = createEntityAdapter<CartItem>();
  
const initialState: CartState = adapter.getInitialState({
    //cartItems: [],
    loading: false
});

export const cartReducer = createReducer(
    initialState,
    /* on(CartActions.loadCartItems, (state) => ({
        ...state,
        loading: true
    })),
    on(CartActions.loadCartItemsSuccess, (state: CartState, { cartItems }) => {
        return adapter.setAll(cartItems, state)
    }), */
    on(CartActions.addToCart, (state: CartState, { cartItem } ) => {
        return adapter.addOne(cartItem, state)
    }),
    on(CartActions.updateQuantity, (state: CartState, { cartItem }) => {
        return adapter.updateOne({
            id: cartItem.id,
            changes: {
                part: cartItem.part,
                orderQuantity: cartItem.orderQuantity,
            },
        },
        state
        );
    }),
    on(CartActions.removeFromCart, (state: CartState, { cartItemId }) => {
        return adapter.removeOne(cartItemId, state);
    }),
    on(CartActions.clearCart, () => initialState),
    on(CartActions.checkoutSuccess, () => initialState) 
);