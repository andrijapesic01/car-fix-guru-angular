import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Part } from 'src/app/models/part/part.model';

@Component({
  selector: 'app-part-card',
  templateUrl: './part-card.component.html',
  styleUrls: ['./part-card.component.css']
})

export class PartCardComponent {
  @Input() part!: Part;
  
  constructor(private router: Router) {

  }

  addToCart(part: Part) {
    console.log("IMPLEMENT ADD TO CART!");
  }

  onClick() {
    this.router.navigateByUrl('part/' + this.part.id);
  }
}
