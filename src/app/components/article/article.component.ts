import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Roles } from 'src/app/enums/enums';
import { Article } from 'src/app/models/article/article.model';
import { Car } from 'src/app/models/car/car.model';
import { Engine } from 'src/app/models/engine/engine.model';
import { User } from 'src/app/models/user/user';
import { deleteArticle, loadArticle } from 'src/app/state/article/article.actions';
import { selectArticleById } from 'src/app/state/article/article.selector';
import { loadCar } from 'src/app/state/car/car.actions';
import { selectCarById } from 'src/app/state/car/car.selector';
import { loadEngine } from 'src/app/state/engine/engine.actions';
import { selectEngineById } from 'src/app/state/engine/engine.selector';
import { selectUser } from 'src/app/state/user/user.selector';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articleId!: string;
  article!: Article | undefined;
  articleCar!: Car | undefined;
  articleEngine!: Engine | undefined;
  imgPath: string = environment.api.apiUrl;
  user!: User | null;
  admin: Roles = Roles.Admin;

  constructor(private route: ActivatedRoute, private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => this.articleId = params['id']);
    this.store.dispatch(loadArticle({ articleId: this.articleId }));
    this.store.select(selectUser).subscribe((selectedUser) => this.user = selectedUser);
    this.store.select(selectArticleById(this.articleId)).subscribe((item) => { this.article = item;});
   
    if(this.article){
      this.store.dispatch(loadCar({ carId: this.article.carId}));
      this.store.dispatch(loadEngine({ engineId: this.article.engineId}));
      this.store.select(selectCarById(this.article.carId)).subscribe((car) => this.articleCar = car);
      this.store.select(selectEngineById(this.article.engineId)).subscribe((engine) => this.articleEngine = engine);
    }
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

