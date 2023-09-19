import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'multipart/form-data', 
        }),
      };

    constructor(private http: HttpClient) { }

    getAllParts() {
        return this.http.get<Part[]>(`${this.apiUrl}/parts`);
    }

    getPartById(id: string) {
        return this.http.get<Part>(`${this.apiUrl}/parts/${id}`);
    }

    /* uploadPartImages(images: File[]) {
        const imageArray = Array.from(images);
        const formData = new FormData();
        imageArray.forEach((image) => {
            formData.append('images', image);
        });
        return this.http.post<string[]>(`${this.apiUrl}/parts/uploadImages`, formData, this.httpOptions);
    } */

    addPart(partData: FormData) {
        return this.http.post<Part>(`${this.apiUrl}/parts/addPart`, partData);
    }

    updatePart(partId: string, partData: FormData) {
        return this.http.put<Part>(`${this.apiUrl}/parts/changePart/${partId}`, partData);
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

    filterParts(carId: string, engineId: string, category: string, subCategory: string, manufacturer: string) {
        const requestBody = {
            carId: carId,
            engineId: engineId,
            category: category,
            subCategory: subCategory,
            manufacturer: manufacturer
        };
        return this.http.post<Part[]>(`${this.apiUrl}/parts/getFilteredParts`, requestBody);
    }

    searchPartsByString(searchString: string) {
        return this.http.get<Part[]>(`${this.apiUrl}/parts/stringSearch/${searchString}`);
    }

    getPartManufacturers() {
        return this.http.get<string[]>(`${this.apiUrl}/parts/getPartsManufacturers`);
    }
}
