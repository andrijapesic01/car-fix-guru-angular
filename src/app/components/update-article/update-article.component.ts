import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Article } from 'src/app/models/article/article.model';
import { CreateModArticleDto } from 'src/app/models/article/crate-mod-article.dto';
import { Car } from 'src/app/models/car/car.model';
import { Engine } from 'src/app/models/engine/engine.model';
import { loadArticle, updateArticle } from 'src/app/state/article/article.actions';
import { selectArticleById } from 'src/app/state/article/article.selector';
import { loadCars } from 'src/app/state/car/car.actions';
import { selectAllCars, selectCarById } from 'src/app/state/car/car.selector';
import { loadEngine } from 'src/app/state/engine/engine.actions';
import { selectEngineById } from 'src/app/state/engine/engine.selector';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css']
})
export class UpdateArticleComponent implements OnInit {

  articleId!: string;
  article: Article | undefined;
  articleForm!: FormGroup;
  cars: Car[]= [];
  carEngines: Engine[] = [];
  
  constructor(private route: ActivatedRoute, private store: Store<AppState>, private formBuilder: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => this.articleId = params['id']);
    this.store.dispatch(loadCars());
    this.store.dispatch(loadArticle({ articleId: this.articleId }));
    this.store.select(selectAllCars).subscribe((selectedCars) => {
      this.cars = selectedCars;
    });
    this.initializeForm();
    
    this.store.select(selectArticleById(this.articleId)).subscribe((selectedArticle) => {
      this.article = selectedArticle;
      if(this.article) {
        this.bindFormWithData();
        //this.loadCarEngines(this.article!.carId);
      }
    });
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

  bindFormWithData() {
    if(this.article) {
      this.articleForm.setValue({
        headline: this.article.headline,
        description: this.article.description,
        text: this.article.text,
        parts: this.article.parts,
        tools: this.article.tools,
        imgURLs: this.article.imgURLs,
        carId: this.article.carId,
        engineId: this.article.engineId
      });
      this.loadCarEngines(this.article.carId);
      /* this.articleForm.setValue({
        engineId: this.article.engineId
      }); */
    }
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

  updateArticleClick() {
    if(this.articleForm.valid) {
      const newData : CreateModArticleDto = this.articleForm.value;
      this.store.dispatch(updateArticle({ articleId: this.articleId, articleData: newData}))
    }
  }

}
