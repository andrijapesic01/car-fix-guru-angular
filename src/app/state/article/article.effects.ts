import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { Article } from "src/app/models/article/article.model";
import * as ArticleActions from 'src/app/state/article/article.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticlesService } from "src/app/services/article.service";

@Injectable()
export class ArticleEffects {

    constructor(private router: Router, private articleService: ArticlesService, private action$: Actions, private snackBar: MatSnackBar) {

    }

    loadArticles$ = createEffect(() => 
        this.action$.pipe(
            ofType(ArticleActions.loadArticles),
            mergeMap(() => 
                this.articleService.getAllArticles().pipe(
                    map((articles: Article[]) => {
                        return ArticleActions.loadArticlesSuccess({ articles });
                    }),
                    catchError(({error}) => {
                        return of({ type: error.message });
                    })
                )
            )
        )
    )

    loadArticle$ = createEffect(() =>
        this.action$.pipe(
            ofType(ArticleActions.loadArticle),
            mergeMap(({ articleId }) =>
                this.articleService.getArticleById(articleId).pipe(
                    map((article: Article) => {
                        return ArticleActions.loadArticleSuccess({ article });
                    }),
                    catchError(({ error }) => {
                        return of({ type: error.message });
                    })
                )
            )
        )
    );

    addArticle$ = createEffect(() => 
        this.action$.pipe(
            ofType(ArticleActions.addArticle),
            mergeMap(({articleData}) => 
                this.articleService.addArticle(articleData).pipe(
                    map((article) => {
                        this.snackBar.open('Article successfully added!', 'Okay', {
                            duration: 5000,
                        });
                        this.router.navigate(['/articles'], {
                            replaceUrl: true,
                        });
                        return ArticleActions.addArticleSuccess({ article: article });
                    }),
                    catchError(({ error }) => {
                        this.snackBar.open('Error occured! Adding article failed!', 'Close', {
                            duration: 3000,
                        });
                        return of({ type: error.message });
                    })
                )
            )
        )
    );

    updateArticle$ = createEffect(() => 
        this.action$.pipe(
            ofType(ArticleActions.updateArticle),
            mergeMap(({ articleId, articleData}) => 
                this.articleService.updateArticle(articleId, articleData).pipe(
                    map((article: Article) => {
                        this.snackBar.open('Article successfully updated!', 'Okay', {
                            duration: 4000,
                        });
                        this.router.navigate(['/article/' + articleId], {
                            replaceUrl: true,
                        });
                        return ArticleActions.updateArticleSuccess({ article });
                    }),
                    catchError(({ error }) => {
                        this.snackBar.open('Error occured! Updating article failed!', 'Close', {
                            duration: 3000,
                        });
                        return of({ type: error.message});
                    })
                )
            )
        )
    );

    deleteArticle$ = createEffect(() =>
        this.action$.pipe(
            ofType(ArticleActions.deleteArticle),
            mergeMap(({ articleId }) => {
                const id: string = articleId;
                return this.articleService.deleteArticle(articleId).pipe(
                    map((res) => {
                        if (res.success) {
                        this.snackBar.open('Article successfully removed.', 'Close', {
                            duration: 3000,
                        });
                        }
                        this.router.navigate(['articles'], { replaceUrl: true });
                        return ArticleActions.deleteArticleSuccess({ articleId: id });
                    }),
                    catchError(({ error }) => {
                        this.snackBar.open(error.message, 'Close', {
                        duration: 3000,
                        });
                        return of({ type: error.message });
                    })
                );
            })
        )
    );

    stringSearchArticles$ = createEffect(() => 
        this.action$.pipe(
            ofType(ArticleActions.stringSearchArticles),
            mergeMap(({ searchString }) => {
                return this.articleService.stringSearch(searchString).pipe(
                    map((articles: Article[]) => {
                        return ArticleActions.stringSearchArticlesSuccess({ articles });
                    }),
                    catchError(({ error }) => {
                        return of({ type: error.message });
                    })
                )
            })
        )
    )

}