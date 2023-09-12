import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { CartItem } from "src/app/models/cart-item/cart-item.model";

export const selectCartFeature = createSelector(
    (state: AppState) => state.cart,
    (cart) => cart
);

export const selectAllCartItems = createSelector(selectCartFeature, (cartState) =>
    cartState.ids
        .map((id) => cartState.entities[id])
        .filter((cartItem) => cartItem != null)
        .map((cartItem) => <CartItem>cartItem)
);
  
export const selectCartItemsCount = createSelector(selectAllCartItems, (cartItems) => {
    return cartItems.reduce((count, cartItem) => count + cartItem.orderQuantity, 0);
});
  
export const selectCartTotalPrice = createSelector(selectAllCartItems, (cartItems) => {
    const totalPrice = cartItems.reduce((total, cartItem) => {
        return total + cartItem.part.price * cartItem.orderQuantity;
    }, 0);
    return totalPrice;
});