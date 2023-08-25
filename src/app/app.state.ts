import { ArticleState } from "./state/article/article.reducer";
import { PartState } from "./state/part/part.reducer";

export interface AppState {
    part: PartState;
    article: ArticleState;
}