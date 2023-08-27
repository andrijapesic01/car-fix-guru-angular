import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Engine } from '../models/engine/engine.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateModEngineDto } from '../models/engine/create-mod-engine-dto';

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
    return this.http.get<Engine>(`${this.apiUrl}/engines/${id}`)
  }

  addEngine(engineData: CreateModEngineDto) {
    const body = engineData;
    return this.http.post<Engine>(`${this.apiUrl}/engines/addEngine`, body);
  }

  updateEngine(engineId: string, engineData: CreateModEngineDto) {
    const body = engineData;
    return this.http.put<Engine>(environment.api.apiUrl+ `/parts/changePart/${engineId}`, body);
  }

  deleteEngine(engineId: string) {
    return this.http.delete<any>(environment.api.apiUrl + '/engines/deleteEngine/' + engineId);
  }

  getAllFuelTypes() {
    return this.http.get(environment.api.apiUrl + '/engines/fuelTypes');
  }

}
