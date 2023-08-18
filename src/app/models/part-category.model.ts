import { SubCategory } from "./sub-category.model";

export interface PartCategory {
    id: string;
    name: string;
    imgURL: string;
    subCategories: SubCategory[];
}