import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateModPartDto } from '../models/part/create-mod-part.dto';
import { Part } from '../models/part/part.model';
import { environment } from 'src/environments/environment';
import { PartCategory } from '../models/part-category/part-category.model';

@Injectable({
  providedIn: 'root'
})
export class PartsService {
  
    private apiUrl = environment.api.apiUrl;

    constructor(private http: HttpClient) {

    }

    getAllParts() {
        return this.http.get<Part[]>(`${this.apiUrl}/parts`);
    }

    getPartById(id: string) {
        return this.http.get<Part>(`${this.apiUrl}/parts/${id}`);
    }

    addPart(partData: CreateModPartDto) {
        const body = partData;
        /* const body = {
                "name": "string",
                "manufacturer": "strin",
                "category": "string;",
                "subCategory": "string;",
                "referenceNumber": "string;",
                "imgURLs": ["", ""],
                "carIDs": [],
                "transmissionIDs": [],
                "engineIDs": [],
                "price": 12.1,
                "quantity": 10
        } */
        
        return this.http.post<Part>(`${this.apiUrl}/parts/addPart`, body);
    }

    updatePart(partId: string, partData: CreateModPartDto) {
        const body = partData;
        return this.http.put<Part>(`${this.apiUrl}/parts/changePart/${partId}`, body);
    }

    deletePart(partId: string) {
        return this.http.delete<any>(`${this.apiUrl}/parts/deletePart/${partId}`);
    }

    getPartCategories() {
        return this.http.get<PartCategory[]>(`${this.apiUrl}/part-category/partCategories`);
    }

    getCertainNumOfParts(numOfParts: number) {
        return this.http.get<Part[]>(`${this.apiUrl}/parts/getCertainNumParts/${numOfParts}`);
    }

    searchPartsByString(searchString: string) {
        return this.http.get<Part[]>(`${this.apiUrl}/parts/stringSearch/${searchString}`);
    }
}
