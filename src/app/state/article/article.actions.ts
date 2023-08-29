import { createAction, props } from "@ngrx/store";
import { Article } from "src/app/models/article/article.model";
import { CreateModArticleDto } from "src/app/models/article/crate-mod-article.dto";
import { Car } from "src/app/models/car/car.model";

export const loadArticles = createAction('loadArticles');
export const loadArticlesSuccess = createAction(
    'loadArticlesSuccess',
    props<{ articles: Article[] }>()
);

export const loadArticle = createAction(
    'loadArticle',
    props<{ articleId: string }>()
);
export const loadArticleSuccess = createAction(
    'loadArticleSuccess',
    props<{ article: Article }>()
);

export const loadSearchedArticles = createAction(
    'loadSearchedArticles',
    props<{ input: string, car: Car}>()
);
export const loadSearchedArticlesSuccess = createAction(
    'loadSearchedArticlesSuccess',
    props<{ articles: Article[] }>()
);

export const addArticle = createAction(
    'addArticle',
    props<{ articleData: CreateModArticleDto }>()
);
export const addArticleSuccess = createAction(
    'addArticleSuccess',
    props<{ article: Article }>()
);

export const updateArticle = createAction(
    'updateArticle',
    props<{ articleId: string, articleData: CreateModArticleDto}>()
);
export const updateArticleSuccess = createAction(
    'updateArticleSuccess',
    props<{ article: Article }>()
);

export const deleteArticle = createAction(
    'deleteArticle',
    props<{ articleId: string }>()
);
export const deleteArticleSuccess = createAction(
    'deleteArticleSuccess',
    props<{ articleId: string }>()
);