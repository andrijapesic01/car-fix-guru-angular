import { Component } from '@angular/core';
import { Car } from 'src/app/models/car/car.model';
import { Engine } from 'src/app/models/engine.model';
import { Transmission } from 'src/app/models/transmission.model';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent {
  transmissions: Transmission[] = [{id: "1", make: "ZF", model: "H7", type: "Automatic", numOfGears: 7}, {id: "2", make: "ZF", model: "S6", type: "Manual", numOfGears: 6}];
  engines: Engine[] = [{id: "1", code: "12", configuration: "I4", fuelType: "Petrol", displacement: 2.2, mark: "TFSI", power: 150}];
  selectedTransmissions: string[] = [];
  selectedEngines: string[] = [];  
  car!: Car;
  constructor() {}


}
