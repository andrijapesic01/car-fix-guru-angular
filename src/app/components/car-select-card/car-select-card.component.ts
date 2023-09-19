import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Car } from 'src/app/models/car/car.model';
import { Engine } from 'src/app/models/engine/engine.model';
import { loadCars } from 'src/app/state/car/car.actions';
import { selectAllCars, selectCarBrands, selectCarsByBrand } from 'src/app/state/car/car.selector';
import { loadEngine } from 'src/app/state/engine/engine.actions';
import { selectEngineById } from 'src/app/state/engine/engine.selector';

@Component({
  selector: 'app-car-select-card',
  templateUrl: './car-select-card.component.html',
  styleUrls: ['./car-select-card.component.css']
})
export class CarSelectCardComponent implements OnInit {
  carForm!: FormGroup;
  cars: Car[] = [];
  car: Car | null = null;
  engines: Engine[] = [];
  makes: string[] = [];
  engineId!: string;
  searched: boolean = false;
  @Output() buttonClicked = new EventEmitter<[string, string]>();
  constructor(private fb: FormBuilder, private store: Store<AppState>, private matSnackabr: MatSnackBar) { }

  ngOnInit(): void {
    this.initializeForm();
    this.store.dispatch(loadCars());
    this.store.select(selectAllCars).subscribe((selectedCars) => {
      this.cars = selectedCars;
    });
    this.store.select(selectCarBrands).subscribe((carBrands) => {
      this.makes = carBrands;
    })
  }

  initializeForm() {
    this.carForm = this.fb.group({
      selectedMake: ['', Validators.required],
      selectedModel: ['', Validators.required],
      selectedEngine: ['', Validators.required]
    });
  }

  onSelectMakeChange() {
    this.cars = [];
    const make = this.carForm.get('selectedMake')?.value;
    //this.store.dispatch(setSelectedMake({ brand: make }));
    this.store.select(selectCarsByBrand(make)).subscribe((selectedCars) => {
      this.cars = selectedCars;
    });
    this.engines = [];
  }

  onSelectModelChange() {
    this.engines = [];
    this.car = this.carForm.get('selectedModel')?.value;
    if (this.car) {
      //this.store.dispatch(setSelectedCarId({ carId: this.car.id }));
      this.car.engineIDs.forEach((engineId) => {
        this.store.dispatch(loadEngine({ engineId }));
        this.store.select(selectEngineById(engineId)).subscribe((selectedEngine) => {
          if (selectedEngine) {
            this.engines.push(selectedEngine);
          }
        })
      })
    }
  }

  onSelectCarSearchClick() {
    if (this.carForm.valid) {
      if (this.car) {
        this.searched = true;
        const carId = this.car?.id;
        const engineId = this.carForm.controls['selectedEngine'].value;
        this.buttonClicked.emit([carId, engineId]);
      }

    } else {
      this.matSnackabr.open(
        "Please fill all fields", "Close",
        { duration: 3000 }
      )
    }
  }

  onResetClick() {
    if(this.searched) {
      this.searched = false;
      this.buttonClicked.emit(["", ""]);
    }
  }
}

