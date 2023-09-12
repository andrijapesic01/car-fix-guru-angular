import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Article } from "src/app/models/article/article.model";
import * as ArticleActions from './article.actions' 

export interface ArticleState extends EntityState<Article> {
    loading: boolean;    
}

const adapter: EntityAdapter<Article> = createEntityAdapter<Article>();

export const initialState: ArticleState = adapter.getInitialState({
    loading: false 
});

export const articleReducer = createReducer(
    initialState,
    on(ArticleActions.loadArticles, (state) => ({
        ...state,
        loading: true,
    })),
    on(ArticleActions.loadArticleSuccess, (state: ArticleState, { article }) => {
        return adapter.setOne(article, state)
    }),
    on(ArticleActions.loadArticlesSuccess, (state: ArticleState, { articles }) => {
        return adapter.setAll(articles, state)
    }),
    on(ArticleActions.loadSearchedArticlesSuccess, (state: ArticleState, {articles}) => {
        return adapter.setAll(articles, state)
    }),
    on(ArticleActions.addArticleSuccess, (state: ArticleState, { article } ) => {
        return adapter.addOne(article, state)
    }),
    on(ArticleActions.updateArticleSuccess, (state: ArticleState, { article }) => {
        return adapter.updateOne({
            id: article.id,
            changes: {
                headline: article.headline,
                description: article.description, 
                text: article.text,
                imgURLs: article.imgURLs,
                carId: article.carId,
                parts: article.parts,
                tools: article.tools,
            },
        },
        state
        );
    }),
    on(ArticleActions.deleteArticleSuccess, (state: ArticleState, { articleId }) => {
        return adapter.removeOne(articleId, state);
    }),
    on(ArticleActions.stringSearchArticlesSuccess, (state: ArticleState, { articles }) => {
        return adapter.setAll(articles, state);
    })  
);