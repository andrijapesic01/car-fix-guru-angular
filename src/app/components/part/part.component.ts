import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Part } from 'src/app/models/part/part.model';
import * as PartActions from 'src/app/state/part/part.actions';
import { selectPartById } from 'src/app/state/part/part.selector';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})
export class PartComponent implements OnInit {
  part?: Part;
  partId: string = '';
  selectedQuantity: number = 1;

  constructor(private route: ActivatedRoute, private store: Store<AppState>, private router: Router) {

  }

  ngOnInit() {
    this.route.params.subscribe((params) => this.partId = params['id']);
      this.store.dispatch(PartActions.loadPart({ partId: this.partId}));
      this.store.select(selectPartById(this.partId)).subscribe((item) => {
        this.part = item;
      });
  }

  addToCart(part: Part): void {
    // Implement your addToCart logic here
  }

  decreaseQuantity(): void {
    if (this. part && this.selectedQuantity > 1) {
      this.selectedQuantity--;
    }
  }

  increaseQuantity(): void {
    if (this.part && this.selectedQuantity < this.part.quantity) {
      this.selectedQuantity++;
    }
  }

  btnAddClick() {
    this.router.navigate(['/add-part']);
  }

  btnUpdateClick() {
    this.router.navigate(['/update-part/' + this.partId]);
  }

  btnDeleteClick(): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this part?');
    if (confirmDelete) {
      if (this.part) {
        this.store.dispatch(PartActions.deletePart({ partId: this.part.id }));
      }
    }
  }
}
