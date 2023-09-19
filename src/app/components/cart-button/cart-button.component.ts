import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { selectCartItemsCount } from 'src/app/state/cart/cart.selector';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.css']
})
export class CartButtonComponent implements OnInit{
  numOfItems$!: Observable<number>;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.numOfItems$ = this.store.select(selectCartItemsCount);
  }

  cartClick() {
    this.router.navigate(['/cart']);
  }
  
}
