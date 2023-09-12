import { Part } from "../part/part.model";

export interface CartItem {
    id: string;
    part: Part;
    orderQuantity: number;
}

