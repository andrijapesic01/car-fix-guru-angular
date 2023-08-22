import { Component } from '@angular/core';
import { Engine } from 'src/app/models/engine.model';

@Component({
  selector: 'app-add-engine',
  templateUrl: './add-engine.component.html',
  styleUrls: ['./add-engine.component.css']
})

//Add onInit to fetch fuelTypes from DB
export class AddEngineComponent {
  fuelTypes: string[] = ["Diesel", "Petrol", "Hybrid-Petrol", "Hybrid-Diesel", "Methanol"];
  engine: Engine = {id: '', code: '', configuration: '', fuelType: '', displacement: 0, mark: '', power: 0}; 

  constructor() {

  }

  

}
