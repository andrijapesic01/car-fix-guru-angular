import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Part } from 'src/app/models/part.model';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})
export class PartComponent implements OnInit {
  part!: Part;
  selectedQuantity: number = 1;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.part = history.state.part;
    })
    console.log(this.part);
  }

  addToCart(part: Part): void {
    // Implement your addToCart logic here
  }

  decreaseQuantity(): void {
    if (this.selectedQuantity > 1) {
      this.selectedQuantity--;
    }
  }

  increaseQuantity(): void {
    if (this.selectedQuantity < this.part.quantity) {
      this.selectedQuantity++;
    }
  }
}
