import { ArticleState } from "./state/article/article.reducer";
import { EngineState } from "./state/engine/engine.reducer";
import { PartCategoryState } from "./state/part-categories/part-categories.reducer";
import { PartState } from "./state/part/part.reducer";

export interface AppState {
    part: PartState;
    article: ArticleState;
    partCategory: PartCategoryState;
    engine: EngineState;
}