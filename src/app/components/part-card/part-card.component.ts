import { Component, Input } from '@angular/core';
import { Part } from 'src/app/models/part.model';

@Component({
  selector: 'app-part-card',
  templateUrl: './part-card.component.html',
  styleUrls: ['./part-card.component.css']
})

export class PartCardComponent {
  @Input() part!: Part;
  
  addToCart(part: Part) {
    console.log("IMPLEMENT ADD TO CART!");
  }
}
