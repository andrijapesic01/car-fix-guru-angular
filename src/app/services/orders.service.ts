import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { CartItem } from '../models/cart-item/cart-item.model';
import { Order } from '../models/order/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
    private readonly apiUrl = environment.api.apiUrl;

    constructor( private http: HttpClient) {}

    placeOrder(cartItems: CartItem[]) {
        const body = cartItems;
        return this.http.post<Order>(`${this.apiUrl}/order/placeOrder`, body);
    }

    getOrderById(orderId: string) {
        this.http.get<Order>(`${this.apiUrl}/order/${orderId}`);
    }

    getUserOrders() {
        this.http.get<Order[]>(`${this.apiUrl}/order/userOrders`);
    }
}

