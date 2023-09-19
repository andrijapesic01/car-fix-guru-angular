import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { PartCategory } from "src/app/models/part-category/part-category.model";


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

export const selectSelectedCategory = createSelector(
    selectPartCategoriesFeature,
    (state) => state.selectedCategory
);

export const selectSelectedCategoryByName = (selectedCategory: string) => createSelector(selectPartCategoriesFeature, (partCategories) => 
    partCategories.ids
        .map((id) => partCategories.entities[id])
        .filter((partCategory) => partCategory != null && partCategory.name !== selectedCategory)
        .map((partCategory) => <PartCategory>partCategory)
);

export const selectSelectedSubCategory = createSelector(
    selectPartCategoriesFeature,
    (state) => state.selectedSubCategory
);

