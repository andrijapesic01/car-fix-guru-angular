import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { CreateModEngineDto } from 'src/app/models/engine/create-mod-engine-dto';
import { Engine } from 'src/app/models/engine/engine.model';
import { loadEngine, updateEngine } from 'src/app/state/engine/engine.actions';
import { selectEngineById } from 'src/app/state/engine/engine.selector';

@Component({
  selector: 'app-update-engine',
  templateUrl: './update-engine.component.html',
  styleUrls: ['./update-engine.component.css']
})
export class UpdateEngineComponent {
  engine: Engine | undefined;
  engineId!: string;

  fuelTypes: string[] = ["Diesel", "Petrol", "Hybrid-Petrol", "Hybrid-Diesel", "Methanol"];
  engineForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private store: Store<AppState>,
    private route: ActivatedRoute) {
    
  }

  ngOnInit() : void {
    this.route.params.subscribe((params) => this.engineId = params['id']);
      this.store.dispatch(loadEngine({ engineId: this.engineId}));
      this.store.select(selectEngineById(this.engineId)).subscribe((selectedEngine) => {
        this.engine = selectedEngine;
      });
    this.initializeForm();
    this.patchFormValues();
  }

  patchFormValues() {
    if (this.engine) {
      this.engineForm.setValue({
        code: this.engine.code,
        configuration: this.engine.configuration,
        fuelType: this.engine.fuelType,
        displacement: this.engine.displacement,
        mark: this.engine.mark,
        power: this.engine.power
      });
    }
  }

  initializeForm() : void {
    this.engineForm = this.formBuilder.group({
      code: ['', Validators.required],
      configuration: ['', Validators.required],
      fuelType: ['', Validators.required],
      displacement: ['', Validators.required],
      mark: ['', Validators.required],
      power: ['', Validators.required]
    })
  }

  btnSaveClick() {
    if(this.engineForm.valid){
      const updateData : CreateModEngineDto = this.engineForm.value;
      this.store.dispatch(updateEngine({ engineId: this.engineId, engineData: updateData}))
    }
  }
  
}
