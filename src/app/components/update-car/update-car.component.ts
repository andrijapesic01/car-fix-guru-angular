import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Car } from 'src/app/models/car/car.model';
import { CreateModCarDto } from 'src/app/models/car/create-mod-car.dto';
import { Engine } from 'src/app/models/engine/engine.model';
import { updateCar } from 'src/app/state/car/car.actions';
import { selectCarById } from 'src/app/state/car/car.selector';
import { loadEngines } from 'src/app/state/engine/engine.actions';
import { selectAllEngines } from 'src/app/state/engine/engine.selector';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent implements OnInit {

  carId!: string;
  car: Car | undefined;
  carForm!: FormGroup;
  engines: Engine[] = [];
  categories: string[] = ["Saloon", "Hatchback", "Estate", "Suv", "Sports car"];
  
  constructor(private formBuilder: FormBuilder, private store: Store<AppState>, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => this.carId = params['id']);
    this.store.dispatch(loadEngines());
    this.store.select(selectAllEngines).subscribe((selectedEngines) => {
      this.engines = selectedEngines;
    })
    this.initializeForm();

    this.store.select(selectCarById(this.carId)).subscribe((selectedCar) => {
      this.car = selectedCar;
    });
    this.bindFormWithData();
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

 bindFormWithData() {
  this.carForm.setValue({
    brand: this.car!.brand,
    model: this.car?.model,
    generation: this.car?.generation,
    category: this.car?.category,
    yearFrom: this.car?.yearFrom,
    yearTo: this.car?.yearTo,
    engineIDs: this.car?.engineIDs
  });
 }

 updateCar() {
  if(this.carForm.valid) {
    const newCarData: CreateModCarDto = this.carForm.value;
    this.store.dispatch(updateCar({carId: this.carId, carData: newCarData}));  
  }
 }

}

