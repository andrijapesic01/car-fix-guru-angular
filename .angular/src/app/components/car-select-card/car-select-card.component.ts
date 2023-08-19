import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-car-select-card',
  templateUrl: './car-select-card.component.html',
  styleUrls: ['./car-select-card.component.css']
})
export class CarSelectCardComponent {
  carForm!: FormGroup;
  @Input() collapsed: boolean = false;

  //Examples
  makes: string[] = ['Audi', 'BMW', 'Mercedes']; 
  models: string[] = ['A6', '5 Series', 'G class']; 
  engines: string[] = ['I4', 'V6', 'V8']; 

  constructor(private fb: FormBuilder) {
    this.carForm = this.fb.group({
      selectedMake: [''],
      selectedModel: [''],
      selectedEngine: ['']
    });
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }
}

