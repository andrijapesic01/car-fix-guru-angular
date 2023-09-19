import { Component, OnInit } from '@angular/core';
import { Engine } from 'src/app/models/engine/engine.model';
import { Part } from 'src/app/models/part/part.model';
import { finalize } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { loadPartCategories } from 'src/app/state/part-categories/part-categories.actions';
import { PartCategory } from 'src/app/models/part-category/part-category.model';
import { selectAllPartCategories } from 'src/app/state/part-categories/part-categories.selector';
import { SubCategory } from 'src/app/models/part-category/sub-category.model';
import { CreateModPartDto } from 'src/app/models/part/create-mod-part.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Car } from 'src/app/models/car/car.model';
import { loadEngines } from 'src/app/state/engine/engine.actions';
import { selectAllEngines } from 'src/app/state/engine/engine.selector';
import { loadCars } from 'src/app/state/car/car.actions';
import { selectAllCars } from 'src/app/state/car/car.selector';
import { PartsService } from 'src/app/services/parts.service';
import { addPart } from 'src/app/state/part/part.actions';

@Component({
  selector: 'app-add-part',
  templateUrl: './add-part.component.html',
  styleUrls: ['./add-part.component.css']
})
export class AddPartComponent implements OnInit {
  partForm!: FormGroup;
  categories: string[] = [];
  subCategories: SubCategory[] = [];
  partCategories: PartCategory[] = [];
  cars: Car[] = [];
  engines: Engine[] = [];
  /* selectedCars: string[] = [];
  selectedEngines: string[] = []; */
  selectedFiles: File[] = [];
  imgURLs: string[] = [];

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.store.dispatch(loadPartCategories());
    this.store.dispatch(loadCars());
    this.store.dispatch(loadEngines());

    this.store.select(selectAllPartCategories).subscribe((items) => {
      this.partCategories = items;
    });
    this.store.select(selectAllEngines).subscribe((items) => {
      this.engines = items;
    });
    this.store.select(selectAllCars).subscribe((items) => {
      this.cars = items;
    });
    this.initializeForm();
  }

  initializeForm(): void {
    this.partForm = this.formBuilder.group({
      name: ['', Validators.required],
      manufacturer: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      referenceNumber: ['', Validators.required],
      imgURLs: [''],
      engineIDs: [[]],
      carIDs: [[]],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    });
    this.onCategoryChange();
  }


  onSelect(event: any) {
    this.selectedFiles = event.target.files;
  }

  savePart() {
    if (this.partForm.valid) {
      const partData: FormData = new FormData;
      const carIds = this.partForm.controls['carIDs'].value!;
      const engineIds = this.partForm.controls['engineIDs'].value!;

      if (this.selectedFiles.length > 0) {
        for (let i = 0; i < this.selectedFiles.length; i++) {
          partData.append('images', this.selectedFiles[i]);
        }
      }
      
      for (const value of engineIds) {
        partData.append('engineIDs', value);
      }
      for (const value of carIds) {
        partData.append('carIDs', value);
      }
      partData.append('name', this.partForm.controls['name'].value);
      partData.append('manufacturer', this.partForm.controls['manufacturer'].value);
      partData.append('category', this.partForm.controls['category'].value);
      partData.append('subCategory', this.partForm.controls['subCategory'].value);
      partData.append('referenceNumber', this.partForm.controls['referenceNumber'].value);
      partData.append('price', this.partForm.controls['price'].value);
      partData.append('quantity', this.partForm.controls['quantity'].value);
      partData.append('imgURLs', `${this.imgURLs}`);

      this.store.dispatch(addPart({ partData }));
    }
    else {
      this.snackBar.open('Please fill all form fields.', 'Close', {
        duration: 3000,
      });
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
}
