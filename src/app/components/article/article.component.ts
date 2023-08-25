import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Article } from 'src/app/models/article/article.model';
import { ArticlesService } from 'src/app/services/article.service';
import { loadArticle } from 'src/app/state/article/article.actions';
import { selectArticleById } from 'src/app/state/article/article.selector';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  
  articleId!: string;
  article?: Article; /* { id: "1", carId: "CAR1", headline: "Oil change Audi A6 C7 (4G)", description:"It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", imgURLs: ["./assets/part-images/mahle-oil-filter.jpg","./assets/part-images/motul-oil-5w30.jpg", "./assets/part-images/brembo-brake-disc.jpg"], tools: "", 
  parts:""}; */

  constructor( private articleService: ArticlesService, private route: ActivatedRoute, private store: Store<AppState> ) {

  }

  ngOnInit(): void {
      this.route.params.subscribe((params) => this.articleId = params['id']);
      this.store.dispatch(loadArticle({ articleId: this.articleId}));
      this.store.select(selectArticleById(this.articleId)).subscribe((item) => {
        this.article = item;
      });
      /* this.articleService.getArticleById(this.articleId).subscribe( (res) => this.article = res); */
  }


}

