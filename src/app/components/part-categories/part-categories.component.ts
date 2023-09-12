import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { PartCategory } from 'src/app/models/part-category/part-category.model';
import { Part } from 'src/app/models/part/part.model';
import { PartCategoryCardService } from 'src/app/services/part-category-card.service';
import { loadCertainNumOfParts } from 'src/app/state/part/part.actions';
import { selectAllParts } from 'src/app/state/part/part.selector';

@Component({
  selector: 'app-part-categories',
  templateUrl: './part-categories.component.html',
  styleUrls: ['./part-categories.component.css']
})
export class PartCategoriesComponent implements OnInit {

  recomandedParts: Part[] = [];
  
  partCategories: PartCategory[] = [
    {id:"cllca3pb70000vaz8e5b1as02", name:"Oils and fluids", imgURL:"./assets/icons-categories/oils and fluids.png", subCategories:[]},
    {id:"cllca3pb70001vaz86uhxil0t", name:"Filters", imgURL:"./assets/icons-categories/filters.png", subCategories:[]},
    {id:"cllca3pb70001vaz86uhxil0t", name:"Tyres", imgURL:"./assets/icons-categories/tyres.png", subCategories:[]},
    {id:"cllca3pb70001vaz86uhxil0t", name:"Brakes", imgURL:"./assets/icons-categories/brakes.png", subCategories:[]},
    {id:"cllca3pb70001vaz86uhxil0t", name:"Engine", imgURL:"./assets/icons-categories/engine.png", subCategories:[]},
    {id:"cllca3pb70001vaz86uhxil0t", name:"Exhaust", imgURL:"./assets/icons-categories/exhaust.png", subCategories:[]},
  ];

  constructor(private store: Store<AppState>, private partCategoryCardService: PartCategoryCardService) {

  }

  ngOnInit() {
    this.store.dispatch(loadCertainNumOfParts({ numOfParts: 4}));
    this.store.select(selectAllParts).subscribe((selectedParts) => {
      this.recomandedParts = selectedParts;
    })
  }
  onCategoryClick(category: any) {
    console.log("Clicked category:", category);
  }
}
