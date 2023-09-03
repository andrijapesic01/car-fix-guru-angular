
export interface CreateModCarDto {
    brand: string;
    model: string;
    generation: string;
    category: string;
    yearFrom: number;
    yearTo: number;
    engineIDs: string[];
}