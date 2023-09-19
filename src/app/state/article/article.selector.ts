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

export const selectArticlesCount = createSelector(selectArticlesFeature, (articles) => {
    return articles.ids.length
});

export const selectArticlesByPage = (pageNumber: number) => createSelector(selectAllArticles, (articles) => {
    let retArticles: Article[] = [];
    const selectNumber = 5; //10
    for (let i = (pageNumber - 1) * selectNumber; i < (pageNumber - 1) * selectNumber + selectNumber; i++) {
        if (i < articles.length) {
            retArticles.push(articles[i]);
        }
        else {
            break;
        }
    }
    return retArticles;
});

export const selectNewestArticles = createSelector(
    selectArticlesFeature,
    (state) => state.newestArticles
);