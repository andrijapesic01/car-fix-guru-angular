import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Article } from 'src/app/models/article/article.model';
import { CreateModArticleDto } from 'src/app/models/article/crate-mod-article.dto';
import { Car } from 'src/app/models/car/car.model';
import { Engine } from 'src/app/models/engine/engine.model';
import { addArticle } from 'src/app/state/article/article.actions';
import { loadCars } from 'src/app/state/car/car.actions';
import { selectAllCars, selectCarById } from 'src/app/state/car/car.selector';
import { loadEngine } from 'src/app/state/engine/engine.actions';
import { selectEngineById } from 'src/app/state/engine/engine.selector';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  articleForm!: FormGroup;
  cars: Car[] = [];
  carEngines: Engine[] = [];

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private store: Store<AppState>) {
    
  }

  ngOnInit(): void {
    this.store.dispatch(loadCars());
    this.store.select(selectAllCars).subscribe((items) => {
      this.cars = items;
    })
    this.initializeForm();
  }

  initializeForm() {
    this.articleForm = this.formBuilder.group({
      headline: ['', Validators.required],
      description: ['', Validators.required],
      text: ['', Validators.required],
      parts: '',
      tools: '',
      imgURLs: [], 
      carId: '',
      engineId: ''
    });
  }

  onSelect(event: any) {
    const images = event.target.files[0];
    console.log(images);
  }

  loadCarEngines(carId: string): void {
    if (carId) {
      this.carEngines = [];
      this.store.select(selectCarById(carId)).subscribe((selectedCar) => {
        if(selectedCar) {
          const car: Car = selectedCar;
          car.engineIDs.forEach((engineId) => {
            this.store.dispatch(loadEngine({ engineId }));
            this.store.select(selectEngineById(engineId)).subscribe((engine) => {
              if(engine)
                this.carEngines.push(engine);
            });
          });
        }
      });
    } else {
      this.carEngines = [];
    }
  }

  onSave() {
    if (this.articleForm.valid) {
      const articleData: CreateModArticleDto = this.articleForm.value;
      articleData.imgURLs = [""];
      articleData.userId = "clm7vhcie000cvan4zlo14b3f";
      this.store.dispatch(addArticle({articleData}));
    } 
    else {
      this.snackBar.open('Please fill all form fields.', 'Close', {
        duration: 3000,
      });
    }
  }
  
}

