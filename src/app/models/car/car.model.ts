
export interface Car {
    id: string;
    brand: string;
    model: string;
    generation: string;
    category: string;
    yearFrom: number;
    yearTo: number;
    engineIDs: string[];
    transmissionIDs: string[];
}