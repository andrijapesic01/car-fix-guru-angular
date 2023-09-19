import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Article } from 'src/app/models/article/article.model';
import { loadNewestArticles } from 'src/app/state/article/article.actions';
import { selectNewestArticles } from 'src/app/state/article/article.selector';


@Component({
  selector: 'app-part-categories',
  templateUrl: './part-categories.component.html',
  styleUrls: ['./part-categories.component.css']
})
export class PartCategoriesComponent implements OnInit {
  articles$!: Observable<Article[]>;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(loadNewestArticles());
    this.articles$ = this.store.select(selectNewestArticles);
  }

  readMoreClick(articleId: string) {
    this.router.navigate(['/article/' + articleId]);
  }
}
