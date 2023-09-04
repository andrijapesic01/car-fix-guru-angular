import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Article } from 'src/app/models/article/article.model';
import { ArticlesService } from 'src/app/services/article.service';
import { deleteArticle, loadArticle } from 'src/app/state/article/article.actions';
import { selectArticleById } from 'src/app/state/article/article.selector';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  
  articleId!: string;
  article?: Article; 

  constructor( private articleService: ArticlesService, private route: ActivatedRoute, 
    private store: Store<AppState>, private router: Router ) {

  }

  ngOnInit(): void {
      this.route.params.subscribe((params) => this.articleId = params['id']);
      this.store.dispatch(loadArticle({ articleId: this.articleId}));
      this.store.select(selectArticleById(this.articleId)).subscribe((item) => {
        this.article = item;
      });
  }

 
  btnDeleteClick(): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this article?');
  
    if (confirmDelete) {
      if (this.article) {
        this.store.dispatch(deleteArticle({ articleId: this.article.id }));
      }
    }
  }

  btnUpdateClick() {
    this.router.navigate(['/update-article/' + this.article?.id]);
  }
}

