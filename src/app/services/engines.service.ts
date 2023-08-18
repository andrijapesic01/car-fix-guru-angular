import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Engine } from '../models/engine.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnginesService {
  
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getAllEngines() {
    return this.http.get<Engine[]>(`${this.apiUrl}/engines`);
    
  }

  getEngineById(id: string) {
    const data = this.http.get<Engine>(`${this.apiUrl}/engines/${id}`).subscribe(
      (engine: Engine) => {
        console.log(engine);
      }
    );
    return data;
  }

  addEngine() {
    const body = {
      code: "ABCDE",
      configuration: "V6",
      fuelType: "Diesel",
      displacement: 3,
      mark: "TDI",
      power: 180
    };
    
    this.http.post(`${this.apiUrl}/engines/addEngine`, body).subscribe(
      (response) => {
        console.log('POST request successful:', response);
      },
      (error) => {
        console.error('Error sending POST request:', error);
      }
    )
  }
}
