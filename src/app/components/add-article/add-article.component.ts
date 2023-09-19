import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Car } from 'src/app/models/car/car.model';
import { Engine } from 'src/app/models/engine/engine.model';
import { User } from 'src/app/models/user/user';
import { addArticle } from 'src/app/state/article/article.actions';
import { loadCars } from 'src/app/state/car/car.actions';
import { selectAllCars, selectCarById } from 'src/app/state/car/car.selector';
import { loadEngine } from 'src/app/state/engine/engine.actions';
import { selectEngineById } from 'src/app/state/engine/engine.selector';
import { selectUser } from 'src/app/state/user/user.selector';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  articleForm!: FormGroup;
  cars: Car[] = [];
  carEngines: Engine[] = [];
  user!: User | null;
  selectedFiles: File[] = [];

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadCars());
    this.store.select(selectAllCars).subscribe((items) => {
      this.cars = items;
    })
    this.store.select(selectUser).subscribe((selecetedUser) => this.user = selecetedUser);
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
    this.selectedFiles = event.target.files;
  }

  loadCarEngines(carId: string): void {
    if (carId) {
      this.carEngines = [];
      this.store.select(selectCarById(carId)).subscribe((selectedCar) => {
        if (selectedCar) {
          const car: Car = selectedCar;
          car.engineIDs.forEach((engineId) => {
            this.store.dispatch(loadEngine({ engineId }));
            this.store.select(selectEngineById(engineId)).subscribe((engine) => {
              if (engine)
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
      const formData = new FormData();

      if (this.selectedFiles.length > 0) {
        for (let i = 0; i < this.selectedFiles.length; i++) {
          formData.append('images', this.selectedFiles[i]);
        }
      }

      formData.append('userId', `${this.user?.id}`);
      formData.append('carId', this.articleForm.controls['carId'].value);
      formData.append('engineId', this.articleForm.controls['engineId'].value);
      formData.append('headline', this.articleForm.controls['headline'].value);
      formData.append('description', this.articleForm.controls['description'].value);
      formData.append('text', this.articleForm.controls['text'].value);
      formData.append('parts', this.articleForm.controls['parts'].value);
      formData.append('tools', this.articleForm.controls['tools'].value);
      formData.append('imgURLs', this.articleForm.controls['imgURLs'].value)

      this.store.dispatch(addArticle({ articleData: formData}));
    }
    else {
      this.snackBar.open('Please fill all form fields.', 'Close', {
        duration: 3000,
      });
    }
  }

}

