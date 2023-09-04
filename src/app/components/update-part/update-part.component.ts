import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Car } from 'src/app/models/car/car.model';
import { Engine } from 'src/app/models/engine/engine.model';
import { PartCategory } from 'src/app/models/part-category.model';
import { CreateModPartDto } from 'src/app/models/part/create-mod-part.dto';
import { Part } from 'src/app/models/part/part.model';
import { SubCategory } from 'src/app/models/sub-category.model';
import { loadCars } from 'src/app/state/car/car.actions';
import { selectAllCars } from 'src/app/state/car/car.selector';
import { loadEngines } from 'src/app/state/engine/engine.actions';
import { selectAllEngines } from 'src/app/state/engine/engine.selector';
import { loadPartCategories } from 'src/app/state/part-categories/part-categories.actions';
import { selectAllPartCategories } from 'src/app/state/part-categories/part-categories.selector';
import { updatePart } from 'src/app/state/part/part.actions';
import { selectPartById } from 'src/app/state/part/part.selector';

@Component({
  selector: 'app-update-part',
  templateUrl: './update-part.component.html',
  styleUrls: ['./update-part.component.css']
})
export class UpdatePartComponent implements OnInit {

  partId!: string;
  part: Part | undefined; 
  partForm!: FormGroup;
  cars: Car[] = [];
  engines: Engine[] = [];
  partCategories: PartCategory[] = [];
  subCategories: SubCategory[] = [];

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => this.partId = params['id']);
    this.store.dispatch(loadPartCategories());
    this.store.dispatch(loadEngines());
    this.store.dispatch(loadCars());
  
    this.store.select(selectAllPartCategories).subscribe((selectedPartCategories) => {
      this.partCategories = selectedPartCategories;
    })
    this.store.select(selectAllEngines).subscribe((selectedEngines) => {
      this.engines = selectedEngines;
    })
    this.store.select(selectAllCars).subscribe((selectedCars) => {
      this.cars = selectedCars;
    })
    
    this.initializeForm();
    this.store.select(selectPartById(this.partId)).subscribe((selectedPart) => {
      this.part = selectedPart;
      this.bindFormWithData();    
    })
  }

  initializeForm() : void {
    this.partForm = this.formBuilder.group({
      name: ['', Validators.required],
      manufacturer: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      referenceNumber: ['', Validators.required],
      imgURLs: [''],
      engineIDs: [],
      carIDs: [''],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }
  
  bindFormWithData() {
    if (this.part) {
      this.partForm.patchValue({
        name: this.part.name,
        manufacturer: this.part.manufacturer,
        category: this.part.category,
        referenceNumber: this.part.referenceNumber,
        imgURLs: this.part.imgURLs,
        price: this.part.price,
        quantity: this.part.quantity
      });
      this.onCategoryChange();
      this.partForm.patchValue({
        subCategory: this.part.subCategory,
        engineIDs: this.part.engineIDs,
        carIDs: this.part.carIDs,
      })
    }
  }
  
  onCategoryChange() {
    const selectedCategoryName = this.partForm.get('category')?.value;
    const selectedCategory = this.partCategories.find(category => category.name === selectedCategoryName);

    if (selectedCategory) {
      this.subCategories = selectedCategory.subCategories || [];
      this.partForm.patchValue({ subCategory: '' }); 
    }
  }

  updatePart() {
    if(this.partForm.valid){
      const updatedData: CreateModPartDto = this.partForm.value;
      console.log(updatedData);
      this.store.dispatch(updatePart({partId: this.partId, partData: updatedData}));
    }
  }

  onSelectImages(event: any) {

  }

}
