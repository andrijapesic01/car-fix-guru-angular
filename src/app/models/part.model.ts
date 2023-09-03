
export interface Part {
    id: string;
    name: string;
    manufacturer: string;
    category: string;
    subCategory: string;
    referenceNumber: string;
    imgURLs: string[];
    carIDs: string[];
    engineIDs: string[];
    quantity: number;
    price: number;
}