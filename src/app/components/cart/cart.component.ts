import { Component } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  
  cartItems: CartItem[] = [
    { image: './assets/icons-categories/oils and fluids.png', name: 'Motul 5W-30 5L', price: 65, quantity: 2 },
    { image: './assets/icons-categories/filters.png', name: 'MANN Filter Oil filter', price: 12, quantity: 1 },
    { image: './assets/icons-categories/brakes.png', name: 'JURID Brake kit', price: 150, quantity: 1 },
  ];

  removeItem(item: CartItem): void {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

  calculateGrandTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  clearCart(): void {
    this.cartItems = [];
  }
  updateQuantity(item: CartItem): void {
    item.quantity = Math.max(item.quantity, 0);
  }

  decrementQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  incrementQuantity(item: CartItem): void {
    item.quantity++;
  }
}
function Intput(): (target: CartComponent, propertyKey: "cartItems") => void {
  throw new Error('Function not implemented.');
}

