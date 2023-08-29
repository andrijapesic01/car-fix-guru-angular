import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Article } from 'src/app/models/article/article.model';
import { CreateModArticleDto } from 'src/app/models/article/crate-mod-article.dto';
import { Car } from 'src/app/models/car/car.model';
import { addArticle } from 'src/app/state/article/article.actions';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  articleForm!: FormGroup;
  articleData!: CreateModArticleDto;
  cars: Car[] = [];//OnInit add read from selector->!

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private store: Store<AppState>) {
    
  }

  ngOnInit(): void {
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
      carId: ''
    });
  }

  onSelect(event: any) {
    const images = event.target.files[0];
    console.log(images);
  }

  onSave() {
    if (this.articleForm.valid) {
      const formData = this.articleForm.value;
      this.articleData = formData;
      this.articleData.carId = "cllquvw430002va70b5a4ghnn";
      this.articleData.imgURLs = [""];
      this.store.dispatch(addArticle( {articleData: this.articleData} ));
    } 
    else {
      this.snackBar.open('Please fill all form fields.', 'Close', {
        duration: 3000,
      });
    }
  }
  
}

