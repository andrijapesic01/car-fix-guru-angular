import { Component, Input } from '@angular/core';
import { PartCategory } from 'src/app/models/part-category/part-category.model';

@Component({
  selector: 'app-part-category-card',
  templateUrl: './part-category-card.component.html',
  styleUrls: ['./part-category-card.component.css']
})
export class PartCategoryCardComponent {
  /* @Input() categoryName: string | undefined;
  @Input() imgURL: string | undefined; */
  @Input() partCategory: PartCategory | undefined;
}
