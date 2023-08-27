import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { PartCategory } from "src/app/models/part-category.model";


export const selectPartCategoriesFeature = createSelector(
    (state: AppState) => state.partCategory,
    (partCategory) => partCategory
);

export const selectAllPartCategories = createSelector(selectPartCategoriesFeature, (partCategories) =>
    partCategories.ids
        .map((id) => partCategories.entities[id])
        .filter((partCategory) => partCategory != null)
        .map((partCategory) => <PartCategory>partCategory)
);