import { createAction, props } from "@ngrx/store";
import { PartCategory } from "src/app/models/part-category.model";


export const loadPartCategories = createAction('loadPartCategories');
export const loadPartCategoriesSuccess = createAction(
    'loadPartCategoriesSuccess',
    props<{ partCategories: PartCategory[] }>()
);