import { CartItem } from "../cart-item/cart-item.model";

export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
}