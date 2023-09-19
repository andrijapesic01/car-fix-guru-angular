import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import * as PartCategoryActions from './part-categories.actions' 
import { PartCategory } from "src/app/models/part-category/part-category.model";

export interface PartCategoryState extends EntityState<PartCategory> {
    selectedCategory: string;
    selectedSubCategory: string;
    loading: boolean;    
}

const adapter: EntityAdapter<PartCategory> = createEntityAdapter<PartCategory>();

export const initialState: PartCategoryState = adapter.getInitialState({
    selectedCategory: '',
    selectedSubCategory: '',
    loading: false 
});

export const partCategoryReducer = createReducer(
    initialState,
    on(PartCategoryActions.loadPartCategories, (state) => ({
        ...state,
        loading: true,
    })),
    on(PartCategoryActions.loadPartCategoriesSuccess, (state: PartCategoryState, { partCategories }) => {
        return adapter.setAll(partCategories, state)
    }),
    on(PartCategoryActions.setSelectedCategory, (state, { category }) => ({
        ...state,
        selectedCategory: category 
    })),
    on(PartCategoryActions.setSelectedSubCategory, (state, { subCategory }) => ({
        ...state,
        selectedSubCategory: subCategory
    }))
);