import { ArticleState } from "./state/article/article.reducer";
import { CarState } from "./state/car/car.reducer";
import { CartState } from "./state/cart/cart.reducer";
import { EngineState } from "./state/engine/engine.reducer";
import { PartCategoryState } from "./state/part-categories/part-categories.reducer";
import { PartState } from "./state/part/part.reducer";
import { UserState } from "./state/user/user.reducer";

export interface AppState {
    part: PartState;
    article: ArticleState;
    partCategory: PartCategoryState;
    engine: EngineState;
    car: CarState;
    cart: CartState;
    user: UserState;
}