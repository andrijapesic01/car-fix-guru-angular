import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { CartItem } from 'src/app/models/cart-item/cart-item.model';
import { Part } from 'src/app/models/part/part.model';
import * as CartActions from 'src/app/state/cart/cart.actions';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-part-card',
  templateUrl: './part-card.component.html',
  styleUrls: ['./part-card.component.css']
})

export class PartCardComponent {
  @Input() part!: Part;
  
  constructor(private router: Router, private store: Store<AppState>) {

  }

  addToCart(part: Part) {
    const cartItem : CartItem = {
      id: uuidv4(),
      part: part,
      orderQuantity: 1
    }
    this.store.dispatch(CartActions.addToCart({cartItem}));
    console.log("added");
  }

  onClick() {
    this.router.navigateByUrl('part/' + this.part.id);
  }
}
