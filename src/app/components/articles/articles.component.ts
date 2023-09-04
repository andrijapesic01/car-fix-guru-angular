import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, filter } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Article } from 'src/app/models/article/article.model';
import * as ArticleActions from 'src/app/state/article/article.actions';
import { selectAllArticles } from 'src/app/state/article/article.selector';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles$?: Observable<Article[]>;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
      this.store.dispatch(ArticleActions.loadArticles());
      this.articles$ = this.store.select(selectAllArticles);
  }

  btnReadMoreClick(articleId: string) {
    this.router.navigate(['/article/' + articleId]);
  }

  btnAddClick() {
    this.router.navigate(['/add-article']);
  }
}
