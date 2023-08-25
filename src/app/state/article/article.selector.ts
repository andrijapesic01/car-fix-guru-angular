import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { Article } from "src/app/models/article/article.model";


export const selectArticlesFeature = createSelector(
    (state: AppState) => state.article,
    (article) => article
);

export const selectArticlesIds = createSelector(
    selectArticlesFeature,
    (article) => article.ids
);
  
export const selectArticleById = (id: string) => createSelector(selectArticlesFeature, (articles) => {
    return articles.entities[id];
});
  
export const selectAllArticles = createSelector(selectArticlesFeature, (article) =>
    article.ids
        .map((id) => article.entities[id])
        .filter((article) => article != null)
        .map((article) => <Article>article)
);