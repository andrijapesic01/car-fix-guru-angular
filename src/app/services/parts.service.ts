import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateModPartDto } from '../models/part/create-mod-part.dto';
import { Part } from '../models/part/part.model';

@Injectable({
  providedIn: 'root'
})
export class PartsService {
  
    private apiUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) {

    }

    getAllParts() {
        return this.http.get<Part[]>(`${this.apiUrl}/parts`);
    }

    getPartById(id: string) {
        const data = this.http.get<Part>(`${this.apiUrl}/parts/${id}`);
        return data;
    }

    addPart(partData: CreateModPartDto) {
        const body = {
            partData
        };

        return this.http.post<Part>(`${this.apiUrl}/parts/addPart`, body);
    }

    updatePart(partId: string, partData: CreateModPartDto) {
        const body = {
            partData
        };

        return this.http.put<Part>(`${this.apiUrl}/parts/changePart/${partId}`, body);
    }

    deletePart(partId: string) {
        return this.http.delete<any>(`${this.apiUrl}/parts/deletePart/${partId}`);
    }
}
