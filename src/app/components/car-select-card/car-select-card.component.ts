import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Car } from 'src/app/models/car/car.model';
import { Engine } from 'src/app/models/engine/engine.model';
import { loadCars, setSelectedCarId, setSelectedEngineId, setSelectedMake } from 'src/app/state/car/car.actions';
import { selectAllCars, selectCarBrands, selectCarsByBrand, selectSelectedCarId, selectSelectedEngineId } from 'src/app/state/car/car.selector';
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
  //@Input() collapsed: boolean = false;

  makes: string[] = [];
  models: string[] = [];

  constructor(private fb: FormBuilder, private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.initializeForm();

    //const selectedCarId = this.store.select(selectSelectedCarId);
    //const selectedEngineId = this.store.select(selectSelectedEngineId);
    let SelectedCarId = "";
    let SelectedEngineId = "";

    this.store.select(selectSelectedCarId).subscribe((carId) => 
      SelectedCarId = carId
    )
    this.store.select(selectSelectedEngineId).subscribe((engineId) => 
      SelectedEngineId = engineId
    )
    if (SelectedCarId !== "" && SelectedEngineId !== "" ) {
      this.bindFormWithData(SelectedEngineId);
    } else {
      this.store.dispatch(loadCars());
      this.store.select(selectAllCars).subscribe((selectedCars) => {
        this.cars = selectedCars;
      });
      this.store.select(selectCarBrands).subscribe((carBrands) => {
        this.makes = carBrands;
      })
    }
  }

  bindFormWithData(engineId: string) {
    const tempEngine = this.engines.map((engine) => engine.id === engineId);
    this.carForm.setValue({
      selectedMake: this.car?.brand,
      selectedModel: this.car?.model,
      selectedEngine: tempEngine
    })
  }

  initializeForm() {
    this.carForm = this.fb.group({
      selectedMake: [''],
      selectedModel: [''],
      selectedEngine: ['']
    });
  }

  onSelectMakeChange() {
    this.cars = [];
    const make = this.carForm.get('selectedMake')?.value;
    this.store.dispatch(setSelectedMake({ brand: make }));
    this.store.select(selectCarsByBrand).subscribe((selectedCars) => {
      this.cars = selectedCars;
    });
    this.engines = [];
  }

  onSelectModelChange() {
    this.engines = [];
    this.car = this.carForm.get('selectedModel')?.value;
    if (this.car) {
      this.store.dispatch(setSelectedCarId({ carId: this.car.id }));
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

  onSelectEngineChange() {
    const selectedEngineId = this.carForm.get('selectedEngine')?.value;
    console.log(selectedEngineId);
    if (selectedEngineId) {
      this.store.dispatch(setSelectedEngineId({ engineId: selectedEngineId }));
    }
  }

  /* toggleCollapse() {
    this.collapsed = !this.collapsed;
  } */
}

