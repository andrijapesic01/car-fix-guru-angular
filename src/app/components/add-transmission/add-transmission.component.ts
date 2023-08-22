import { Component } from '@angular/core';

@Component({
  selector: 'app-add-transmission',
  templateUrl: './add-transmission.component.html',
  styleUrls: ['./add-transmission.component.css']
})
export class AddTransmissionComponent {
  transmission = {
    make: '',
    model: '',
    type: '',
    numOfGears: ''
  };

  
}
