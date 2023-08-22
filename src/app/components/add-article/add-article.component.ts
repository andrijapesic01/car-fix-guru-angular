import { Component } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent {
  article!: Article;
  cars: Car[] = [];

  onSelect(event: any) {
    
  }
}
