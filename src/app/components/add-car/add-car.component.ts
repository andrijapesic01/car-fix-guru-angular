import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Car } from 'src/app/models/car/car.model';
import { CreateModCarDto } from 'src/app/models/car/create-mod-car.dto';
import { Engine } from 'src/app/models/engine/engine.model';
import { addCar, loadCarCategories } from 'src/app/state/car/car.actions';
import { selectCarCategories } from 'src/app/state/car/car.selector';
import { loadEngines } from 'src/app/state/engine/engine.actions';
import { selectAllEngines } from 'src/app/state/engine/engine.selector';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  
  //engines: Engine[] = [{id: "1", code: "12", configuration: "I4", fuelType: "Petrol", displacement: 2.2, mark: "TFSI", power: 150}];
  //carData!: CreateModCarDto;
  //categories: string[] = ["Saloon", "Hatchback", "Estate", "Suv", "Sports car"];
  selectedEngines: string[] = [];  
  engines: Engine[] = [];
  carForm!: FormGroup;
  categories: string[] = [];
  selectedCategory!: string;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>, private snackBar: MatSnackBar,
    private http: HttpClient) {}

  ngOnInit(): void {
    this.store.dispatch(loadEngines());
    this.store.dispatch(loadCarCategories());
    this.store.select(selectAllEngines).subscribe((selectedEngines) => this.engines = selectedEngines);
    this.store.select(selectCarCategories).subscribe((selectedCategories) => this.categories = selectedCategories);

    this.initializeForm();
  }

  initializeForm() {
     this.carForm = this.formBuilder.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      generation: [''],
      category: ['', Validators.required],
      yearFrom: [null, Validators.required],
      yearTo: [null, Validators.required],
      engineIDs: [[]] 
    });
  }

  saveCar() {
    if(this.carForm.valid) {
      const carData: CreateModCarDto = this.carForm.value;
      //carData.category = this.selectedCategory;
      /* this.http.post<Car>(`${environment.api.apiUrl}/cars/addCar`, carData).subscribe(
        resposne => {
          console.log(resposne);
        }
      ); */
      this.store.dispatch(addCar({ carData }));
    }
    else {
      this.snackBar.open('Please fill all form fields.', 'Close', {
        duration: 3000,
    });
    }  
  }

}


