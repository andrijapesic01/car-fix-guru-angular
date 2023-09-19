import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Roles } from 'src/app/enums/enums';
import { CartItem } from 'src/app/models/cart-item/cart-item.model';
import { Part } from 'src/app/models/part/part.model';
import { User } from 'src/app/models/user/user';
import * as CartActions from 'src/app/state/cart/cart.actions';
import { selectUser } from 'src/app/state/user/user.selector';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-part-card',
  templateUrl: './part-card.component.html',
  styleUrls: ['./part-card.component.css']
})

export class PartCardComponent {
  @Input() part!: Part;
  imgPath: string = environment.api.apiUrl;
  user!: User | null;

  constructor(private router: Router, private store: Store<AppState>, private snackBar: MatSnackBar) { 
    this.store.select(selectUser).subscribe((selectedUser) => this.user = selectedUser);
  }

  addToCart(part: Part) {
    if(this.user?.role == Roles.Admin ) {
      this.snackBar.open(
        "Admin users can not use this function!", "Okay",
        { duration: 2500}
      );
      return;
    } 
    const cartItem : CartItem = {
      id: uuidv4(),
      part: part,
      orderQuantity: 1
    }
    this.store.dispatch(CartActions.addToCart({cartItem}));
    this.snackBar.open(
      "Item added to cart!", "Okay",
      { duration: 2500}
    );
  }

  onClick() {
    this.router.navigateByUrl('part/' + this.part.id);
  }
}
