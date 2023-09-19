import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { CreateModEngineDto } from 'src/app/models/engine/create-mod-engine-dto';
import { addEngine, loadFuelTypes } from 'src/app/state/engine/engine.actions';
import { selectFuelTypes } from 'src/app/state/engine/engine.selector';

@Component({
  selector: 'app-add-engine',
  templateUrl: './add-engine.component.html',
  styleUrls: ['./add-engine.component.css']
})

export class AddEngineComponent implements OnInit {
  fuelTypes: string[] = [];
  engineForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private store: Store<AppState>) { }

  ngOnInit() : void {
    this.store.dispatch(loadFuelTypes());
    this.store.select(selectFuelTypes).subscribe((selectedFuelTypes) => this.fuelTypes = selectedFuelTypes);
    this.initializeForm();
  }

  initializeForm() : void {
    this.engineForm = this.formBuilder.group({
      code: ['', Validators.required],
      configuration: ['', Validators.required],
      fuelType: ['', Validators.required],
      displacement: ['', Validators.required],
      mark: ['', Validators.required],
      power: ['', Validators.required],
      torque: ['', Validators.required]
    })
  }

  btnSaveClick() {
    if(this.engineForm.valid) {
      const engineData: CreateModEngineDto = this.engineForm.value;
      this.store.dispatch(addEngine({ engineData }));
    }
    else {
      this.snackBar.open('Please fill all form fields.', 'Close', {
        duration: 3000,
    });
    }
  }  

}
