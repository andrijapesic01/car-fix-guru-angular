import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, filter } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Article } from 'src/app/models/article/article.model';
import * as ArticleActions from 'src/app/state/article/article.actions';
import { loadArticles } from 'src/app/state/article/article.actions';
import { selectAllArticles, selectArticlesByPage, selectArticlesCount } from 'src/app/state/article/article.selector';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles$?: Observable<Article[]>;
  articlesNumber$?: Observable<number>;
  searchInput: string = '';
  pageNumber : number = 1;
  pageSize : number = 5;

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(ArticleActions.loadArticles());
    this.articles$ = this.store.select(selectArticlesByPage(this.pageNumber));
    this.articlesNumber$ = this.store.select(selectArticlesCount);
  }

  btnReadMoreClick(articleId: string) {
    this.router.navigate(['/article/' + articleId]);
  }

  btnAddClick() {
    this.router.navigate(['/add-article']);
  }

  stringSearchClick() {
    if (this.searchInput !== '') {
      this.store.dispatch(ArticleActions.stringSearchArticles({ searchString: this.searchInput }));
    }
  }

  onCarSearchButtonClicked(eventData: [string, string]) {
    const [carId, engineId] = eventData;
    console.log("Engine: " + engineId + " Car:" + carId);
    if (carId !== "" && engineId !== "") {
      this.store.dispatch(ArticleActions.filterArticlesByCar({ carId, engineId }))
      this.articles$ = this.store.select(selectAllArticles);
    }
    else {
      this.store.dispatch(loadArticles());
      this.articles$ = this.store.select(selectAllArticles);
    } 
  }

  getTotalPages(): number {
    let articles = 0;
    this.articlesNumber$?.subscribe((articlesCount) => articles = articlesCount);
    const size = this.pageSize > 0 ? this.pageSize : 1;
    return Math.ceil(articles / size);
  }

  onPageChange(next: boolean) {
    let articlesNumber = 0;
    this.store.select(selectArticlesCount).subscribe((count) => articlesNumber = count);

    if(next) {
      this.articles$ = this.store.select(selectArticlesByPage(++this.pageNumber));

    } else if(!next) {
      this.articles$ = this.store.select(selectArticlesByPage(--this.pageNumber));
    
    } else {
      return;
    }
  }
}
