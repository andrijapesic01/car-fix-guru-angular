import { createAction, props } from "@ngrx/store";
import { PartCategory } from "src/app/models/part-category/part-category.model";


export const loadPartCategories = createAction('loadPartCategories');
export const loadPartCategoriesSuccess = createAction(
    'loadPartCategoriesSuccess',
    props<{ partCategories: PartCategory[] }>()
);

export const setSelectedCategory = createAction(
    'setSelectedCategory',
    props<{ category: string }>()
);

export const setSelectedSubCategory = createAction(
    'setSelectedSubCategory',
    props<{ subCategory: string }>()
);
