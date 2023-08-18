import { Component, OnInit } from '@angular/core';
import { PartCategory } from 'src/app/models/part-category.model';
import { PartCategoryCardService } from 'src/app/services/part-category-card.service';

@Component({
  selector: 'app-part-categories',
  templateUrl: './part-categories.component.html',
  styleUrls: ['./part-categories.component.css']
})
export class PartCategoriesComponent implements OnInit {
  
  partCategories: PartCategory[] = [
    {id:"cllca3pb70000vaz8e5b1as02", name:"Oils and fluids", imgURL:"./assets/icons-categories/oils and fluids.png", subCategories:[]},
    {id:"cllca3pb70001vaz86uhxil0t", name:"Filters", imgURL:"./assets/icons-categories/filters.png", subCategories:[]},
    {id:"cllca3pb70001vaz86uhxil0t", name:"Tyres", imgURL:"./assets/icons-categories/tyres.png", subCategories:[]},
    {id:"cllca3pb70001vaz86uhxil0t", name:"Brakes", imgURL:"./assets/icons-categories/brakes.png", subCategories:[]},
    {id:"cllca3pb70001vaz86uhxil0t", name:"Engine", imgURL:"./assets/icons-categories/engine.png", subCategories:[]},
    {id:"cllca3pb70001vaz86uhxil0t", name:"Exhaust", imgURL:"./assets/icons-categories/exhaust.png", subCategories:[]},
  ];

  constructor(private partCategoryCardService: PartCategoryCardService) {

  }

  ngOnInit() {
    /* this.partCategoryCardService.getAllPartCategories().subscribe(data => {
      this.partCategories = data;
    }); */
    console.log("TODO-> FIX!");
  }
  onCategoryClick(category: any) {
    console.log("Clicked category:", category);
  }
}
