import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PartCategory } from '../models/part-category.model';

@Injectable({
  providedIn: 'root'
})
export class PartCategoryCardService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { 

  }

  getAllPartCategories()  {
    return this.http.get<PartCategory[]>(`${this.apiUrl}/part-category/partCategories`);
  }

}