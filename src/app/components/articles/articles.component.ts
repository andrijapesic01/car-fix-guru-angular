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
  /* articles: Article[] = [
    { id: "cllnn8lec0003va2cpu1nonq6", carId: "CAR1", headline: "Oil change Audi A6 C7 (4G)", description: "This is a short description instead of Lorem Ipsum xD", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
     imgURLs: [""], tools: "", parts:"" },
    { id: "2", carId: "CAR2", headline: "BMW M57 Engine timing fix", description: "This is a short description instead of Lorem Ipsum xD", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
     imgURLs: [""], tools: "", parts:"" },
    { id: "3", carId: "CAR3", headline: "Mercedes SLK not starting", description: "This is a short description instead of Lorem Ipsum xD", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
     imgURLs: [""], tools: "", parts:"" },
    { id: "4", carId: "CAR4", headline: "Rear brake discs and pads replacement", description: "This is a short description instead of Lorem Ipsum xD", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
     imgURLs: [""], tools: "", parts:"" },
  ]; */
  articles$?: Observable<Article[]>;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
      this.store.dispatch(ArticleActions.loadArticles());
      this.articles$ = this.store.select(selectAllArticles);
  }

  btnReadMoreClick(articleId: string) {
    this.router.navigate(['/article/' + articleId]);
  }
}
